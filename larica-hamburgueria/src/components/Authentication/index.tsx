import React from "react";

import { Container } from "./styles";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";

interface IProps {
  setSignUpView: any;
  setSignInView: any;
  signInView: any;
  signUpView: any;
  forgotPasswordView: any;
  setForgotPasswordView: any;
  resetPasswordView: any;
  setResetPasswordView: any;
}

const Authentication: React.FC<IProps> = ({
  setSignUpView,
  setSignInView,
  signInView,
  signUpView,
  forgotPasswordView,
  setForgotPasswordView,
  resetPasswordView,
  setResetPasswordView,
}) => {
  return (
    <Container className={signInView ? "auth-open" : ""}>
      <SignIn
        setSignUpView={setSignUpView}
        setSignInView={setSignInView}
        setForgotPasswordView={setForgotPasswordView}
      />

       <SignUp
        signUpView={signUpView}
        setSignUpView={setSignUpView}
        setSignInView={setSignInView}
      />
      
      <ForgotPassword
        forgotPasswordView={forgotPasswordView}
        setForgotPasswordView={setForgotPasswordView}
        setResetPasswordView={setResetPasswordView}
        setSignInView={setSignInView}
      />

      {/*
      <ResetPassword
        setSignInView={setSignInView}
        setResetPasswordView={setResetPasswordView}
        setForgotPasswordView={setForgotPasswordView}
      /> */}
    </Container>
  );
};

export default Authentication;
