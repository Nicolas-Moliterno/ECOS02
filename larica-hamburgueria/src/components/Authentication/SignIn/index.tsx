import React, { useCallback, useEffect, useRef } from "react";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import * as Yup from "yup";
import { Container } from "./styles";
import getValidationErrors from "../../../utils/ValidationErros";
import Input from "../../Input";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";
import { useCookies } from "react-cookie";
import { Redirect } from "react-router";

interface IProps {
  setSignUpView: any;
  setSignInView: any;
  setForgotPasswordView: any;
}

const SignIn: React.FC<IProps> = ({
  setSignUpView,
  setSignInView,
  setForgotPasswordView,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { signin, currentUser }: any = useAuth();

  useEffect(() => {
    setSignUpView(false);
  }, setSignUpView);

  const handleSubmit = useCallback(async (data: any) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().email().required("E-mail válido obrigatório"),
        password: Yup.string().required("Senha obrigatório"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await signin(data.email, data.password);

      toast.success("Bem-vindo!");
      setSignInView(false);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      } else {
        toast.error("Verifique suas credenciais!");
      }
      return;
    }
  }, []);

  return (
    <Container>
      <h2>Fazer login</h2>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="email" placeholder="E-mail" />
        <Input name="password" type="password" placeholder="Senha" />

        <button type="submit">Entrar</button>
      </Form>
      <button>
        <p>
          Ainda não tem cadastro?{" "}
          <span
            onClick={() => {
              setSignUpView(true);
            }}
          >
            Criar conta
          </span>
        </p>
      </button>
      <button
        onClick={() => {
          setForgotPasswordView(true);
        }}
      >
        <span>Esqueci minha senha</span>
      </button>
    </Container>
  );
};

export default SignIn;
