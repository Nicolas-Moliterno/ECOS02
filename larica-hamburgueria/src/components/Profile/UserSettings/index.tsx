import React, { useCallback, useEffect, useRef, useState } from "react";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import * as Yup from "yup";
import { Container, Separator } from "./styles";
import getValidationErrors from "../../../utils/ValidationErros";
import Input from "../../Input";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";

interface IProps {
  userSettingsView: any;
  setUserSettingsView: any;
  setProfileView: any;
}

const UserSettings: React.FC<IProps> = ({
  userSettingsView,
  setUserSettingsView,
  setProfileView,
}) => {
  const formRef = useRef<FormHandles>(null);

  const {
    logout,
    createOrUpdateCurrentUserInfo,
    updateEmail,
    updatePassword,
    currentUser,
  }: any = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Deslogado!");
      setProfileView(false);
    } catch {
      toast.error("Erro ao deslogar!");
    }
  };

  const handleSubmit = useCallback(async (data: any) => {
    try {
      formRef.current?.setErrors({});

      if (data.oldPassword) {
        const schema = Yup.object().shape({
          name: Yup.string().required("Nome obrigatório"),
          email: Yup.string()
            .required("E-mail obrigatório")
            .email("E-mail inválido"),
          oldPassword: Yup.string().required("Senha antiga obrigatório"),
          password: Yup.string()
            .required("Senha obrigatório")
            .min(6, "Minimo 6 caracteres"),
          confirmPassword: Yup.string().oneOf(
            [null, Yup.ref("password")],
            "Senhas não coincidem"
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (data.email !== currentUser.email) {
          await updateEmail(data.email);
        }

        await updatePassword(data.password);

        await createOrUpdateCurrentUserInfo({
          userId: currentUser.uid,
          name: data.name,
          email: data.email,
        });

        toast.success("Dados alterados com sucesso!");
        setProfileView(false);
      } else {
        const schema = Yup.object().shape({
          name: Yup.string().required("Nome obrigatório"),
          email: Yup.string().email().required("E-mail válido obrigatório"),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (data.email !== currentUser.email) {
          await updateEmail(data.email);
        }

        await createOrUpdateCurrentUserInfo({
          userId: currentUser.uid,
          name: data.name,
          email: data.email,
        });

        toast.success("Dados alterados com sucesso!");
        setProfileView(false);
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      } else {
        toast.error("Ocorreu um erro ao alterar os dados!");
      }
    }
  }, []);

  return (
    <Container className={userSettingsView ? "user-settings-open" : ""}>
      <h2>Perfil</h2>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="name"
          defaultValue={currentUser ? currentUser.name : ""}
          placeholder="Nome"
        />
        <Input
          name="email"
          defaultValue={currentUser ? currentUser.email : ""}
          placeholder="E-mail"
        />

        <Separator />

        <Input name="oldPassword" type="password" placeholder="Senha antiga" />
        <Input name="password" type="password" placeholder="Senha" />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirme sua senha"
        />

        <button type="submit">Salvar</button>
      </Form>
      <button
        onClick={() => {
          setUserSettingsView(false);
        }}
      >
        <span>Voltar</span>
      </button>
    </Container>
  );
};

export default UserSettings;
