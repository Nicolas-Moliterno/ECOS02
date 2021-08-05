import React, { useEffect, useState } from "react";
import MyOrders from "./MyOrders";
import UserSettings from "./UserSettings";
import ProfileMenu from "./ProfileMenu";

import { Container } from "./styles";
import { useAuth } from "../../context/AuthContext";

interface IProps {
  profileView: any;
  setProfileView: any;
  setChartReview?: any;
  setOrders?: any;
  setAddress?: any;
  setPaymentType?: any;
}

const Profile: React.FC<IProps> = ({
  profileView,
  setProfileView,
  setChartReview,
  setOrders,
  setAddress,
  setPaymentType,
}) => {
  const [userSettingsView, setUserSettingsView] = useState(false);
  const [myOrdersView, setMyOrdersView] = useState(false);

  const { currentUser }: any = useAuth();

  useEffect(() => {
    setUserSettingsView(false);
    setMyOrdersView(false);
  }, []);

  return (
    <Container className={profileView ? "profile-open" : ""}>
      <ProfileMenu
        setMyOrdersView={setMyOrdersView}
        setUserSettingsView={setUserSettingsView}
        setProfileView={setProfileView}
      />

      <UserSettings
        userSettingsView={userSettingsView}
        setUserSettingsView={setUserSettingsView}
        setProfileView={setProfileView}
      />

      {!currentUser?.admin ? (
        <MyOrders
          myOrdersView={myOrdersView}
          setMyOrdersView={setMyOrdersView}
          setProfileView={setProfileView}
          setChartReview={setChartReview}
          setOrders={setOrders}
          setAddress={setAddress}
          setPaymentType={setPaymentType}
        />
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Profile;
