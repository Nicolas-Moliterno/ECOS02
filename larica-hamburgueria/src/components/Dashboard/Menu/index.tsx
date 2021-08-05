import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
  Container,
  Separator,
  MenuContent,
  BodyMenu,
  ProductsType,
  TableProducts,
  TableProductsHeader,
  TableProductsContent,
  TableProductsRow,
  AdditionalsList,
  DetailsProducts,
  MenuItem,
  MenuItemList,
  ImageInput,
} from "./styles";

import "react-toastify/dist/ReactToastify.css";

import { useAuth } from "../../../context/AuthContext";
import Input from "../../../components/Input";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { toast } from "react-toastify";
import getValidationErrors from "../../../utils/ValidationErros";
import { IoCamera, IoPencilSharp } from "react-icons/io5";
import hamburguerDefault from "../../../assets/defaultBurguer.png";

export const Menu: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const textAreaRef = useRef<any>(null);
  const formRefMenu = useRef<FormHandles>(null);
  const formRefMenuItems = useRef<FormHandles>(null);
  const formAdditionalRef = useRef<FormHandles>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>({});
  const [menuItems, updateMenuItems] = useState<any>([]);
  const [products, setProducts] = useState([]);
  const [creatingProduct, setCreatingProduct] = useState(true);
  const [editingMenuItem, setEditingMenuItem] = useState(false);
  const [textAreaValue, changeTextAreaValue] = useState("");

  const {
    getProducts,
    getMenuItems,
    updateMenuOrder,
    createOrUpdateProduct,
    createOrUpdateProductAdditional,
    disableProduct,
    createOrUpdateMenuItem,
    uploadProductimage,
  }: any = useAuth();

  useEffect(() => {
    loadProducts();
    async function loadProducts() {
      try {
        const response = await getProducts();
        const responseProductsType = await getMenuItems();

        let retrievedProducts: any = [];
        response.forEach((element): any => {
          retrievedProducts.push(element.data());
        });

        let retrievedProductsType: any = [];
        responseProductsType.forEach((element): any => {
          retrievedProductsType.push(element.data());
        });

        setProducts(retrievedProducts);
        updateMenuItems(retrievedProductsType);
      } catch {
        toast.error("Erro ao carregar produtos!");
      }
    }
  }, []);

  function handleItemClicked(product: any) {
    setCreatingProduct(false);
    setEditingMenuItem(false);
    setSelectedProduct(product);
    changeTextAreaValue(product.description);
    formRef.current?.setData(product);
    textAreaRef.current.value = product.description;
    // console.log();
  }

  function handleEditMenuItem() {
    setEditingMenuItem(!editingMenuItem);
    setCreatingProduct(false);
  }

  function createProduct() {
    setEditingMenuItem(false);
    setCreatingProduct(true);
    setSelectedProduct({});
    formRef.current?.setData({ name: "", type: "", price: "", amountAble: "" });
    textAreaRef.current.value = "";
    cleanAllInput();
  }

  function cleanAllInput() {
    formRef.current?.setData({});
  }

  async function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(menuItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const backupMenuItems = menuItems;

    try {
      updateMenuItems(changeMenuOrders(items));
      await updateMenuOrder(changeMenuOrders(items));
      toast.success("Ordem do menu atualizada!");
    } catch {
      toast.error("Erro ao mudar ordem do menu!");
      updateMenuItems(backupMenuItems);
    }
  }

  function changeMenuOrders(items) {
    return items.map((menuItem, index) => {
      return { ...menuItem, order: index + 1 };
    });
  }

  async function handleDisableAdditional(item: any) {
    try {
      const additionals: any = [];
      selectedProduct.additionals.map((additional: any) => {
        if (additional.id === item.id) {
          additionals.push({
            ...additional,
            active: !additional.active,
          });
        } else {
          additionals.push(additional);
        }
      });

      await createOrUpdateProductAdditional(
        additionals,
        selectedProduct.productId
      );

      setSelectedProduct({ ...selectedProduct, additionals });

      !selectedProduct.additionals.find(
        (additional) => additional.id === item.id
      ).active
        ? toast.success("Produto ativado")
        : toast.error("Produto desativado");
    } catch {
      toast.error("Falha ao disativar produto");
    }
  }

  async function handleDisableProduct(item: any) {
    try {
      await disableProduct(item);

      updatingStaticStates({
        ...item,
        active: !item.active,
      });

      !item.active
        ? toast.success("Produto ativado")
        : toast.error("Produto desativado");
    } catch {
      toast.error("Falha ao disativar produto");
    }
  }

  async function handleDisableMenuItem(item: any) {
    try {
      const productData = {
        ...item,
        menuItemName: item.type,
        active: !item.active,
      };
      await createOrUpdateMenuItem(productData, true);
      updatingStaticMenuItemStates(productData);
      !item.active
        ? toast.success("Produto ativado")
        : toast.error("Produto desativado");
    } catch {
      toast.error("Falha ao disativar produto");
    }
  }

  function updatingStaticStates(item) {
    const updateStaticProducts: any = products.map((product: any) => {
      if (item.productId === product.productId) {
        return {
          ...item,
        };
      }
      return product;
    });

    setProducts(updateStaticProducts);
    setSelectedProduct({
      ...item,
    });
  }

  function updatingStaticMenuItemStates(item) {
    const updateStaticMenuItem: any = menuItems.map((menuItem: any) => {
      if (item.menuId === menuItem.menuId) {
        return item;
      }
      return menuItem;
    });

    updateMenuItems(updateStaticMenuItem);
  }

  async function handleSubmit(data: any) {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string()
          .required("Nome obrigatório")
          .min(1, "Nome obrigatório"),
        type: Yup.string()
          .required("Tipo obrigatório")
          .min(1, "Tipo obrigatório"),
        price: Yup.number()
          .required("Preço obrigatório")
          .min(1, "Preço obrigatório"),
        amountAble: Yup.number()
          .required("Quantidade obrigatória")
          .min(1, "Quantidade obrigatória"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const productData = selectedProduct?.productId
        ? {
            ...data,
            description: textAreaValue,
            active: true,
            productId: selectedProduct?.productId,
          }
        : { ...data, active: true, description: textAreaValue };

      const createdProduct = await createOrUpdateProduct(
        productData,
        creatingProduct
      );

      if (creatingProduct) {
        setSelectedProduct(createdProduct);
        setCreatingProduct(false);
        toast.success("Produto criado com sucesso!");
      } else {
        toast.success("Produto alterado com sucesso!");
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef?.current?.setErrors(errors);
        return;
      }
    }
  }

  async function handleSubmitMenuItem(data: any) {
    try {
      formRefMenu.current?.setErrors({});

      const schema = Yup.object().shape({
        menuItemName: Yup.string()
          .required("Nome obrigatório")
          .min(1, "Nome obrigatório"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const menuItemResponse: any = await createOrUpdateMenuItem(data, false);
      updatingStaticMenuItemStates(menuItemResponse);

      toast.success("Item do menu criado com sucesso!");
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRefMenu?.current?.setErrors(errors);
        return;
      }
    }
  }

  async function handleSubmitMenuItems(data: any) {
    try {
      formRefMenu.current?.setErrors({});

      const schema = Yup.object().shape({
        menuItemName: Yup.string()
          .required("Nome obrigatório")
          .min(1, "Nome obrigatório"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const menuItemResponse: any = await createOrUpdateMenuItem(data, true);
      updatingStaticMenuItemStates(menuItemResponse);

      toast.success("Item do menu alterado com sucesso!");
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRefMenu?.current?.setErrors(errors);
        return;
      }
    }
  }

  async function handleSubmitAdditional(data: any) {
    try {
      formAdditionalRef.current?.setErrors({});

      const schema = Yup.object().shape({
        additionalName: Yup.string()
          .required("Nome do adicional obrigatório")
          .min(1, "Nome do adicional obrigatório"),
        additionalPrice: Yup.number()
          .required("Preço do adicional obrigatório")
          .min(1, "Preço do adicional obrigatório"),
        additionalAmount: Yup.number()
          .required("Quantidade do adicional obrigatória")
          .min(1, "Quantidade do adicional obrigatória"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      let additionals: any = [];
      additionals =
        selectedProduct?.additionals?.length > 0
          ? selectedProduct.additionals
          : [];

      additionals.push({
        id: uuidv4(),
        price: data.additionalPrice,
        amountAble: data.additionalAmount,
        name: data.additionalName,
        active: true,
      });

      await createOrUpdateProductAdditional(
        additionals,
        selectedProduct.productId
      );

      toast.success("Adicional criado com sucesso!");
      updatingStaticStates({ ...selectedProduct, additionals });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        const arrErrors = Object.values(errors);
        arrErrors.map((error) => {
          toast.error(error);
        });
        return;
      }
      toast.error("Falha ao criar adicional");
    }
  }

  async function handleSubmitAdditionals(data: any) {
    try {
      formAdditionalRef.current?.setErrors({});

      const schema = Yup.object().shape({
        additionalsId: Yup.string().required("Falha ao alterar adicional"),
        additionalsName: Yup.string()
          .required("Nome do adicional obrigatório")
          .min(1, "Nome do adicional obrigatório"),
        additionalsPrice: Yup.number()
          .required("Preço do adicional obrigatório")
          .min(0, "Preço do adicional obrigatório"),
        additionalsAmount: Yup.number()
          .required("Quantidade do adicional obrigatória")
          .min(1, "Quantidade do adicional obrigatória"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const additionals: any = [];
      selectedProduct.additionals.map((additional: any) => {
        if (additional.id === data.additionalsId) {
          additionals.push({
            id: data.additionalsId,
            price: data.additionalsPrice,
            amountAble: data.additionalsAmount,
            name: data.additionalsName,
          });
        } else {
          additionals.push(additional);
        }
      });

      await createOrUpdateProductAdditional(
        additionals,
        selectedProduct.productId
      );

      selectedProduct.additionals = additionals;
      toast.success("Adicional alterado com sucesso!");
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        const arrErrors = Object.values(errors);
        let message = "";
        arrErrors.map((error) => {
          toast.error(error);
        });
        return;
      }
      toast.error("Falha ao alterar o adicional");
    }
  }

  async function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
    try {
      if (e.target.files) {
        await uploadProductimage(e.target.files[0], selectedProduct);
        toast.success("Imagem alterada com sucesso");
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            updatingStaticStates({
              ...selectedProduct,
              productImageUrl: reader.result,
            });
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      }
    } catch {
      toast.error("Não foi possível alterar a imagem do produto");
    }
  }

  return (
    <Container>
      <MenuContent>
        <BodyMenu>
          <section>
            <span>Menu</span>
            <section onClick={() => createProduct()}>
              <span>Novo produto</span>
            </section>
          </section>
          <ProductsType>
            <div>
              <span>Ordem do menu</span>
              <button type="button" onClick={() => handleEditMenuItem()}>
                <IoPencilSharp color="#27af9a" size="20" />
              </button>
            </div>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="productsType" direction="horizontal">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {menuItems.map(({ menuId, type, active }, index) => {
                      return (
                        <Draggable
                          key={menuId}
                          draggableId={String(menuId)}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <span style={{ opacity: !active ? 0.3 : 1 }}>
                                {type}
                              </span>
                            </div>
                          )}
                        </Draggable>
                      );
                    })}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </ProductsType>
          <TableProducts>
            <TableProductsHeader>
              <div>
                <span>Nome</span>
              </div>
              <div>
                <span>Descrição</span>
              </div>
              <div>
                <span>Tipo</span>
              </div>
              <div>
                <span>Preço</span>
              </div>
            </TableProductsHeader>
            <TableProductsContent>
              {products.map((product: any): any => (
                <TableProductsRow
                  key={product.productId}
                  onClick={() => {
                    handleItemClicked(product);
                  }}
                  className={
                    selectedProduct.productId === product.productId
                      ? "clickedItemStyle"
                      : ""
                  }
                >
                  {selectedProduct.productId === product.productId ? (
                    <></>
                  ) : (
                    <Separator />
                  )}
                  <div style={{ opacity: product?.active === false ? 0.2 : 1 }}>
                    <div>
                      <span>{product.name}</span>
                    </div>
                    <div>
                      <span>{product.description}</span>
                    </div>
                    <div>
                      <span>{product.type}</span>
                    </div>
                    <div>
                      <span>R${Number(product.price).toFixed(2)}</span>
                    </div>
                  </div>
                </TableProductsRow>
              ))}
            </TableProductsContent>
          </TableProducts>
        </BodyMenu>
        <DetailsProducts>
          {selectedProduct ? (
            <>
              <div>
                <span>Detalhes do produto</span>
                <Form ref={formRef} onSubmit={handleSubmit}>
                  <div>
                    <ImageInput>
                      <img
                        src={
                          selectedProduct?.productImageUrl
                            ? selectedProduct?.productImageUrl
                            : hamburguerDefault
                        }
                        alt={""}
                      />
                      <label htmlFor="avatar">
                        <IoCamera color="#fff" size="20" />
                        <input
                          type="file"
                          id="avatar"
                          onChange={handleAvatarChange}
                        />
                      </label>
                    </ImageInput>
                    <Input
                      name="name"
                      defaultValue={
                        selectedProduct?.name ? selectedProduct?.name : ""
                      }
                      placeholder={"Nome"}
                      containerStyle={{ background: "#fff" }}
                    />
                    <section>
                      <textarea
                        name="description"
                        defaultValue={
                          selectedProduct?.description
                            ? selectedProduct?.description
                            : ""
                        }
                        ref={textAreaRef}
                        onChange={(e) =>
                          changeTextAreaValue(e.currentTarget.value)
                        }
                        placeholder={"Descrição"}
                      />
                    </section>
                    <Input
                      name="type"
                      defaultValue={
                        selectedProduct?.type ? selectedProduct?.type : ""
                      }
                      placeholder={"Tipo"}
                      containerStyle={{ background: "#fff" }}
                    />
                    <Input
                      name="price"
                      defaultValue={
                        selectedProduct?.price
                          ? Number(selectedProduct?.price).toFixed(2)
                          : ""
                      }
                      placeholder={"Preço"}
                      containerStyle={{ background: "#fff" }}
                    />
                    <Input
                      name="amountAble"
                      defaultValue={
                        selectedProduct?.amountAble
                          ? selectedProduct?.amountAble
                          : ""
                      }
                      placeholder={"Quantidade disponível"}
                      containerStyle={{ background: "#fff" }}
                    />
                  </div>
                  <section>
                    <button type="submit">
                      <span>Salvar</span>
                    </button>
                    <button
                      key={"button"}
                      type="button"
                      onClick={() => handleDisableProduct(selectedProduct)}
                      disabled={creatingProduct}
                      style={{
                        opacity: !selectedProduct.active ? 0.3 : 1,
                        cursor: creatingProduct ? "default" : "pointer",
                      }}
                    >
                      {creatingProduct ? (
                        <span>Destivar</span>
                      ) : (
                        <span>
                          {!selectedProduct.active ? "Ativar" : "Destivar"}
                        </span>
                      )}
                    </button>
                  </section>
                </Form>
                <section>
                  {!selectedProduct.hasOwnProperty("productId") &&
                  creatingProduct ? (
                    <span>Crie o produto, para liberar os adicionais</span>
                  ) : (
                    <Form
                      ref={formAdditionalRef}
                      onSubmit={handleSubmitAdditional}
                    >
                      <div>
                        <span>Adicional</span>
                        <Input
                          name="additionalName"
                          placeholder={"Nome"}
                          containerStyle={{ background: "#fff" }}
                        />
                        <Input
                          name="additionalAmount"
                          placeholder={"Quantidade"}
                          containerStyle={{ background: "#fff" }}
                        />
                        <Input
                          name="additionalPrice"
                          placeholder={"Preço"}
                          containerStyle={{ background: "#fff" }}
                        />
                      </div>

                      <section>
                        <button type="submit">
                          <span>Adicionar</span>
                        </button>
                      </section>
                    </Form>
                  )}
                </section>
                <AdditionalsList>
                  {selectedProduct?.additionals?.length > 0 ? (
                    <div>
                      <span>Lista de adicionais</span>
                      {selectedProduct.additionals.map((additional) => (
                        <div key={additional.id}>
                          <span>{additional.name}</span>
                          <Form
                            ref={formAdditionalRef}
                            onSubmit={handleSubmitAdditionals}
                          >
                            <Input
                              name="additionalsId"
                              defaultValue={additional.id}
                              placeholder={"id"}
                              containerStyle={{
                                display: "none",
                                background: "#fff",
                              }}
                            />
                            <Input
                              name="additionalsName"
                              defaultValue={additional.name}
                              placeholder={"Nome"}
                              containerStyle={{ background: "#fff" }}
                            />
                            <Input
                              name="additionalsAmount"
                              defaultValue={additional.amountAble}
                              placeholder={"Quantidade"}
                              containerStyle={{ background: "#fff" }}
                            />
                            <Input
                              name="additionalsPrice"
                              defaultValue={Number(additional.price).toFixed(2)}
                              placeholder={"Preço"}
                              containerStyle={{ background: "#fff" }}
                            />
                            <section>
                              <button type="submit">
                                <span>Salvar</span>
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleDisableAdditional(additional)
                                }
                                style={{
                                  opacity: !additional.active ? 0.3 : 1,
                                  cursor: !additional.active
                                    ? "default"
                                    : "pointer",
                                }}
                              >
                                <span>
                                  {!additional.active ? "Ativar" : "Destivar"}
                                </span>
                              </button>
                            </section>
                          </Form>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <></>
                  )}
                </AdditionalsList>
              </div>
            </>
          ) : (
            <></>
          )}
        </DetailsProducts>
        <MenuItem className={editingMenuItem ? "editingMenuItem" : ""}>
          <div>
            <span>Detalhes do menu</span>
            <Form ref={formRefMenu} onSubmit={handleSubmitMenuItem}>
              <span>Novo item do menu</span>
              <div>
                <Input
                  name="menuItemName"
                  placeholder={"Nome"}
                  containerStyle={{ background: "#fff" }}
                />
              </div>
              <section>
                <button type="submit">
                  <span>Adicionar</span>
                </button>
              </section>
            </Form>
            <MenuItemList>
              <span>Lista de items do menu</span>
              {menuItems.map((menuItem: any) => (
                <Form ref={formRefMenuItems} onSubmit={handleSubmitMenuItems}>
                  <span>{menuItem.type}</span>
                  <Input
                    name="menuItemName"
                    defaultValue={menuItem.type}
                    placeholder={"Nome"}
                    containerStyle={{ background: "#fff" }}
                  />
                  <Input
                    name="menuId"
                    defaultValue={menuItem.menuId}
                    placeholder={"Id"}
                    containerStyle={{ display: "none", background: "#fff" }}
                  />
                  <Input
                    name="order"
                    defaultValue={menuItem.order}
                    placeholder={"Order"}
                    containerStyle={{ display: "none", background: "#fff" }}
                  />
                  <Input
                    name="active"
                    defaultValue={menuItem.active}
                    placeholder={"Active"}
                    containerStyle={{ display: "none", background: "#fff" }}
                  />
                  <section>
                    <button type="submit">
                      <span>Salvar</span>
                    </button>
                    <button
                      type="button"
                      style={{
                        opacity: !menuItem.active ? 0.3 : 1,
                        cursor: !menuItem.active ? "default" : "pointer",
                      }}
                      onClick={() => handleDisableMenuItem(menuItem)}
                    >
                      <span>{!menuItem.active ? "Ativar" : "Destivar"}</span>
                    </button>
                  </section>
                </Form>
              ))}
            </MenuItemList>
          </div>
        </MenuItem>
      </MenuContent>
    </Container>
  );
};

export default Menu;
