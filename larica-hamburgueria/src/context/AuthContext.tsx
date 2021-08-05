import { endOfMonth, startOfMonth } from "date-fns";
import React, { useContext, useEffect, useState } from "react";

import { auth, firestore, storage } from "./firebase";

const AuthContext = React.createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>();
  const [status, setStatus] = useState<any>({});
  const [myOrders, setMyOrders] = useState<any>([]);
  const [orders, setOrders] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [firstLogin, setFirstLogin] = useState<any>(false);

  async function signup(name, email, password) {
    const user: any = await auth.createUserWithEmailAndPassword(
      email,
      password
    );
    const userId = user.user.uid;
    createOrUpdateCurrentUserInfo({ userId, name, email });
    return user;
  }

  async function signin(email, password) {
    setFirstLogin(true);
    return await auth.signInWithEmailAndPassword(email, password);
  }

  function logout(): any {
    return auth.signOut();
  }

  function forgotPassword(email): any {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  async function getMenuItems() {
    const unsubscribe = await firestore
      .collection("menu")
      .orderBy("order", "asc")
      .get();
    return unsubscribe;
  }

  async function getProducts() {
    const unsubscribe = await firestore
      .collection("products")
      .orderBy("name", "asc")
      .get();
    return unsubscribe;
  }

  function createOrUpdateCurrentUserInfo({
    userId,
    name,
    email,
    address = "",
  }) {
    userId = userId ? userId : currentUser.uid;

    setCurrentUser({ ...currentUser, name });

    return firestore.collection("users").doc(userId).set(
      {
        userId,
        name,
        email,
        address,
      },
      { merge: true }
    );
  }

  async function createOrUpdateProductAdditional(additionals, productId) {
    const productDoc = await firestore
      .collection("products")
      .doc(productId)
      .set(
        {
          additionals,
        },
        { merge: true }
      );
    return productDoc;
  }

  function getCurrentUserInfo(userId) {
    return firestore.collection("users").doc(userId).get();
  }

  function saveOrder(order) {
    const orderDoc = firestore.collection("orders").doc();
    const statusDoc = firestore.collection("ordersStatus").doc();
    let userId: any = null;
    if (currentUser) {
      userId = currentUser.uid;
    }

    orderDoc.set({
      userId,
      orderId: orderDoc.id,
      ...order,
      createdAt: new Date(),
      status: {
        statusId: statusDoc.id,
        status: "pending",
        canceledBy: "none",
      },
    });

    statusDoc.set({
      orderId: orderDoc.id,
      status: "pending",
      canceledBy: "none",
    });

    return {
      orderId: orderDoc.id,
      statusId: statusDoc.id,
    };
  }

  async function getStatusById(statusId) {
    try {
      const unsubscribe = await firestore
        .collection("ordersStatus")
        .doc(statusId)
        .onSnapshot((snapshotDoc): any => {
          setStatus(
            snapshotDoc?.data()
              ? snapshotDoc?.data()
              : { statusId: "none", status: "pending", canceledBy: "none" }
          );
        });
      return unsubscribe;
    } catch {
      throw new Error("Erro ao resgatar status");
    }
  }

  async function updateOrderStatus(
    status,
    statusId,
    orderId,
    canceledBy = "none"
  ) {
    try {
      await firestore.collection("orders").doc(orderId).set(
        {
          status: {
            status,
            canceledBy,
          },
        },
        { merge: true }
      );

      await firestore.collection("ordersStatus").doc(statusId).set(
        {
          status,
          canceledBy,
        },
        { merge: true }
      );
    } catch (err) {
      throw new Error();
    }
  }

  async function updateMenuOrder(menuItems) {
    try {
      const batch = firestore.batch();
      menuItems.map((menuItem) => {
        const menuRef = firestore.collection("menu").doc(menuItem.menuId);
        batch.set(
          menuRef,
          {
            ...menuItem,
          },
          { merge: true }
        );
      });
      await batch.commit();
    } catch (err) {
      throw new Error();
    }
  }

  async function getOrdersByUserId() {
    let start = new Date();
    start.setHours(0, 0, 0, 0);

    let end = new Date();
    end.setHours(23, 59, 59, 999);

    try {
      const unsubscribe = await firestore
        .collection("orders")
        .where("userId", "==", currentUser.uid)
        .where("createdAt", ">", start)
        .where("createdAt", "<", end)
        .orderBy("createdAt", "desc")
        .onSnapshot((querySnapshot) => {
          let ordersDoc: any = [];
          querySnapshot.forEach((doc): any => {
            ordersDoc.push(doc.data());
          });
          setMyOrders(ordersDoc);
        });
    } catch {
      throw new Error("Erro ao carregar pedidos");
    }
  }

  async function getTodaysOrders() {
    let start = new Date();
    start.setHours(0, 0, 0, 0);

    let end = new Date();
    end.setHours(23, 59, 59, 999);

    try {
      const unsubscribe = await firestore
        .collection("orders")
        .where("createdAt", ">", start)
        .where("createdAt", "<", end)
        .orderBy("createdAt", "desc")
        .onSnapshot((querySnapshot) => {
          let ordersDoc: any = [];
          querySnapshot.forEach((doc): any => {
            ordersDoc.push(doc.data());
          });
          setOrders(ordersDoc);
        });
    } catch {
      throw new Error("Erro ao carregar pedidos");
    }
  }

  async function getOrders() {
    console.log(startOfMonth(new Date()));

    console.log(endOfMonth(new Date()));
    try {
      const unsubscribe = await firestore
        .collection("orders")
        .where("createdAt", ">", startOfMonth(new Date()))
        .where("createdAt", "<", endOfMonth(new Date()))
        .get();
      return unsubscribe;
    } catch {
      throw new Error("Erro ao carregar pedidos");
    }
  }

  async function createOrUpdateProduct(product, creating) {
    try {
      if (creating) {
        const productsDoc = await firestore.collection("products").doc();
        const productData = {
          productId: productsDoc.id,
          ...product,
          additionals: [],
          active: true,
        };

        await productsDoc.set(productData);

        return productData;
      } else {
        const productsDoc = await firestore
          .collection("products")
          .doc(product.productId)
          .set(
            {
              ...product,
            },
            { merge: true }
          );

        return productsDoc;
      }
    } catch (err) {
      throw new Error("Erro");
    }
  }

  async function disableProduct(product) {
    const productsDoc = await firestore
      .collection("products")
      .doc(product.productId)
      .set(
        {
          ...product,
          active: product.active ? false : true,
        },
        { merge: true }
      );

    return productsDoc;
  }

  async function disableMenuItem(menuItem) {
    const productsDoc = await firestore
      .collection("menu")
      .doc(menuItem.productId)
      .set(
        {
          ...menuItem,
          active: menuItem.active ? false : true,
        },
        { merge: true }
      );

    return productsDoc;
  }

  async function createOrUpdateMenuItem(menuItem, editing) {
    try {
      if (!editing) {
        const response = await firestore
          .collection("menu")
          .orderBy("order", "desc")
          .get();

        let retrievedMenuItems: any = [];
        response.forEach((element): any => {
          retrievedMenuItems.push(element.data());
        });

        const order =
          retrievedMenuItems.length > 0 ? retrievedMenuItems[0].order + 1 : 1;

        const menuDoc = await firestore.collection("menu").doc();
        const menu = {
          menuId: menuDoc.id,
          type: menuItem.menuItemName,
          active: true,
          order,
        };
        menuDoc.set(
          {
            ...menu,
          },
          { merge: true }
        );

        return menu;
      } else {
        const menu = {
          menuId: menuItem.menuId,
          type: menuItem.menuItemName,
          active: menuItem.active,
          order: menuItem.order,
        };

        const menuDoc = await firestore
          .collection("menu")
          .doc(menuItem.menuId)
          .set(
            {
              ...menu,
            },
            { merge: true }
          );

        return menu;
      }
    } catch (err) {
      throw new Error("Erro");
    }
  }

  async function uploadProductimage(image, product) {
    try {
      const imageType = image.type.split("/")[1];
      const imageName = `${product.productId}.${imageType}`;

      await storage.ref(`products`).child(imageName).put(image);

      await storage
        .ref("products")
        .child(imageName)
        .getDownloadURL()
        .then(async (url) => {
          await firestore.collection("products").doc(product.productId).set(
            {
              productImageUrl: url,
            },
            { merge: true }
          );
        });
    } catch {
      throw new Error("Cannot upload this image");
    }
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userInfo = await getCurrentUserInfo(user?.uid);
        setCurrentUser({
          ...user,
          admin: userInfo.data().admin ? true : false,
          name: userInfo.data().name,
          address: userInfo.data().address,
        });

        if (firstLogin && userInfo.data().admin) {
          window.location.href = "/dashboard";
          setFirstLogin(false);
        }
      } else {
        setCurrentUser(user);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, [firstLogin]);

  const value: any = {
    currentUser,
    signup,
    signin,
    logout,
    forgotPassword,
    updateEmail,
    updatePassword,
    createOrUpdateCurrentUserInfo,
    saveOrder,
    createOrUpdateProduct,
    getProducts,
    getMenuItems,
    getTodaysOrders,
    getOrders,
    getOrdersByUserId,
    getStatusById,
    status,
    updateOrderStatus,
    orders,
    myOrders,
    updateMenuOrder,
    createOrUpdateProductAdditional,
    disableProduct,
    disableMenuItem,
    createOrUpdateMenuItem,
    uploadProductimage,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
