import React, { useCallback, useEffect, useRef, useState } from "react";
import { Container, Separator } from "./styles";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";

import * as Yup from "yup";

import getValidationErrors from "../../../../utils/ValidationErros";
import Input from "../../../Input";

interface IProps {
  editPayment: boolean;
  setEditPayment: any;
  paymentType: any;
  setPaymentType: any;
}

const ChangePayment: React.FC<IProps> = ({
  editPayment,
  setEditPayment,
  paymentType,
  setPaymentType,
}) => {
  const formRef = useRef<FormHandles>(null);
  const [savePayment, setSavePayment] = useState(false);
  const [payType, setPayType] = useState("money");
  const [changeValue, setChangeValue] = useState(false);

  useEffect(() => {
    if (savePayment) {
      if (payType !== "money") {
        setPaymentType({
          type: payType,
          change: 0,
        });
      } else {
        setPaymentType({
          type: payType,
          change: changeValue,
        });
      }

      localStorage.setItem(
        "larica-my-payment-type",
        JSON.stringify(paymentType)
      );
      setSavePayment(false);
    }
  }, [payType, changeValue, savePayment, setPaymentType]);

  const handleSubmit = useCallback(async (data: any) => {
    try {
      formRef.current?.setErrors({});

      if (data.change === "") {
        data.change = 0;
      }

      const schema = Yup.object().shape({
        change: Yup.number().max(9999, "Troco inválido"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      setChangeValue(data.change);

      setSavePayment(true);

      setEditPayment(false);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors({ change: "Troco inválido" });
        return;
      }
    }
  }, []);

  function selectPayment(changeEvent: any) {
    setPayType(changeEvent.currentTarget.value);
  }

  return (
    <Container>
      <div className={editPayment ? "editPayment" : ""}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Separator />
          <div className="radio">
            <label>
              <input
                type="radio"
                value="money"
                checked={payType === "money"}
                onChange={(e) => {
                  selectPayment(e);
                }}
              />
              Dinheiro
            </label>
            <label>
              <input
                type="radio"
                value="creditCard"
                checked={payType === "creditCard"}
                onChange={(e) => {
                  selectPayment(e);
                }}
              />
              Cartão de crédito
            </label>
            <label>
              <input
                type="radio"
                value="debitCard"
                checked={payType === "debitCard"}
                onChange={(e) => {
                  selectPayment(e);
                }}
              />
              Cartão de débito
            </label>
          </div>
          <div
            style={
              payType === "money"
                ? { opacity: 1 }
                : { opacity: 0, cursor: "default" }
            }
          >
            <Input name="change" placeholder={"Troco (Opcional)"} />
          </div>

          <button type="submit">Salvar</button>
        </Form>
      </div>
    </Container>
  );
};

export default ChangePayment;
