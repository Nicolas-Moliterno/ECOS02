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
  signUpView: any
  setSignUpView: any;
  setSignInView: any;
}

const SignUp: React.FC<IProps> = ({ signUpView, setSignUpView, setSignInView }) => {
  const formRef = useRef<FormHandles>(null);

  const { signup }: any = useAuth();

  useEffect(() => {
    setSignInView(false);
  }, setSignInView);

  const handleSubmit = useCallback(async (data: any) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required("Nome obrigatório"),
        email: Yup.string().email().required("E-mail válido obrigatório"),
        password: Yup.string()
          .required("Senha obrigatório")
          .min(6, "Minimo 6 caracteres"),
        confirmPassword: Yup.string().oneOf([null, Yup.ref("password")], "Senhas não coincidem"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await signup(data.name, data.email, data.password);

      toast.success("Cadastro realizado com sucesso!");
      setSignUpView(false);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      } else {
        toast.error("Ocorreu um erro ao cadastrar!");
      }
    }
  }, []);

  return (
    <Container className={signUpView ? "signup-open" : ""}>
      <h2>Criar conta</h2>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome" />
        <Input name="email" placeholder="E-mail" />
        <Input name="password" type="password" placeholder="Senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirme sua senha"
        />

        <button type="submit">Cadastrar</button>
      </Form>
      <button
        onClick={() => {
          setSignUpView(false);
        }}
      >
        <span>Já tenho uma conta</span>
      </button>
    </Container>
  );
};

export default SignUp;
