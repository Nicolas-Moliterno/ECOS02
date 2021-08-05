import React, { useCallback, useEffect, useRef } from "react";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import * as Yup from "yup";
import { Container } from "./styles";
import getValidationErrors from "../../../utils/ValidationErros";
import Input from "../../Input";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";

interface IProps {
  forgotPasswordView: any;
  setForgotPasswordView: any;
  setResetPasswordView: any;
  setSignInView: any;
}

const ForgotPassword: React.FC<IProps> = ({
  forgotPasswordView,
  setForgotPasswordView,
  setResetPasswordView,
  setSignInView,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { forgotPassword }: any = useAuth();

  useEffect(() => {
    setSignInView(false);
  }, setSignInView);

  const handleSubmit = useCallback(async (data: any) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().email().required("E-mail válido obrigatório"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await forgotPassword(data.email);

      toast.success("Email de recuperação enviado!");
      setForgotPasswordView(false);
      setSignInView(true);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      } else {
        toast.error("Email de recuperação enviado!");
      }
      return;
    }
  }, []);

  return (
    <Container className={forgotPasswordView ? "forgot-password-open" : ""}>
      <h2>Esqueci minha senha</h2>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="email" placeholder="E-mail" />

        <button type="submit">Redefinir senha</button>
      </Form>
      <button
        onClick={() => {
          setSignInView(true);
          setForgotPasswordView(false);
        }}
      >
        <span>Voltar</span>
      </button>
    </Container>
  );
};

export default ForgotPassword;
