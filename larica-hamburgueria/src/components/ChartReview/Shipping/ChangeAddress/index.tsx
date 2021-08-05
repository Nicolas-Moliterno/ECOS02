import React, { useCallback, useEffect, useRef, useState } from "react";
import { Container, Separator } from "./styles";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import * as Yup from "yup";

import getValidationErrors from "../../../../utils/ValidationErros";
import Input from "../../../Input";

interface IProps {
  editAddress: boolean;
  setEditAddress: any;
  address: any;
  setAddress: any;
}

const ChangeAddress: React.FC<IProps> = ({
  editAddress,
  setEditAddress,
  address,
  setAddress,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: any) => {
    try {
      formRef.current?.setErrors({});

      const phonePattern = /^(?:\(?([1-9])\)?[0-9]?[0-9]?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:[1-9])\d{8}))$/;

      const schema = Yup.object().shape({
        name: Yup.string().required("Nome obrigatório"),
        phone: Yup.string().matches(
          phonePattern,
          "Telefone/Celular obrigatório"
        ),
        district: Yup.string().required("Bairro obrigatório"),
        street: Yup.string().required("Rua/Av. obrigatório"),
        number: Yup.string().required("Número obrigatório"),
        city: Yup.string().required("Cidade obrigatório"),
        apartment: Yup.string(),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      localStorage.setItem('larica-my-address', JSON.stringify(data));

      setEditAddress(false);
      setAddress(data);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }
    }
  }, []);

  return (
    <Container>
      <div className={editAddress ? "editAddress" : ""}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Separator />
          <Input
            name="name"
            placeholder={"Nome"}
          />
          <Input
            name="phone"
            placeholder={"Celular"}
          />
          <Input
            name="district"
            placeholder={"Bairro"}
          />
          <Input
            name="street"
            placeholder={"Rua/Avenida"}
          />
          <Input
            name="number"
            placeholder={"Número"}
          />
          <Input
            name="city"
            placeholder={"Cidade"}
          />
          <Input
            name="apartment"
            placeholder={"Andar/Apartamento (Opcional)"}
          />

          <button type="submit">Salvar</button>
        </Form>
      </div>
    </Container>
  );
};

export default ChangeAddress;
