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
  setResetPasswordView: any;
  setSignInView: any;
  setForgotPasswordView: any;
}

const ResetPassword: React.FC<IProps> = ({
  setResetPasswordView,
  setSignInView,
  setForgotPasswordView,
}) => {
  const formRef = useRef<FormHandles>(null);

  const { signup }: any = useAuth();

  useEffect(() => {
    setForgotPasswordView(false);
  }, setForgotPasswordView);

  const handleSubmit = useCallback(async (data: any) => {
    try {
      formRef.current?.setErrors({});

      if (data.password === data.confirmPassword) {
        const schema = Yup.object().shape({
          password: Yup.string()
            .required("Senha obrigatório")
            .min(6, "Minimo 6 caracteres"),
          confirmPassword: Yup.string().required("Confirmar senha obrigatório"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signup(data.email, data.password);

        toast.success("Senha alterada com sucesso!");
        setResetPasswordView(false);
        setSignInView(true);
      } else {
        toast.error("Senhas não coincidem!");
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      } else {
        toast.error("Ocorreu um erro ao alterar a senha!");
      }
    }
  }, []);

  return (
    <Container>
      <div></div>
      <h2>Recuperar senha</h2>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="password" type="password" placeholder="Senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirme sua senha"
        />

        <button type="submit">Redefinir</button>
      </Form>
      <button
        onClick={() => {
          setForgotPasswordView(true);
          setResetPasswordView(false);
        }}
      >
        <span>Não recebi o email</span>
      </button>
    </Container>
  );
};

export default ResetPassword;
