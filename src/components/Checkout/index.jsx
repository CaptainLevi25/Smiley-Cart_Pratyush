import React from "react";
import { LeftArrow } from "neetoicons";
import { Button, Spinner, Typography } from "neetoui";

import { useHistory } from "react-router-dom";
import withTitle from "utils/withTitle";

import { useRef, useState } from "react";
import { Form as NeetoUIForm } from "neetoui/formik";

import {
  CHECKOUT_FORM_INITIAL_VALUES,
  CHECKOUT_FORM_VALIDATION_SCHEMA,
} from "./constants";
import Form from "./Form";
import {
  useFetchCountries,
  useCreateOrder,
} from "components/hooks/useCheckoutApi";
import routes from "routes";
import useCartItemsStore from "stores/useCartItemsStore";
import Items from "./Items";
const Checkout = () => {
  const timerRef = useRef(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const history = useHistory();
  const { mutate: createOrder } = useCreateOrder();
  const { isLoading } = useFetchCountries();
  const clearCart = useCartItemsStore.pickFrom();
  const handleSubmit = values => {
    setIsSubmitDisabled(true);

    createOrder(
      { payload: values },
      {
        onSuccess: () => {
          redirectToHome();
        },
        onError: () => setIsSubmitDisabled(false),
      }
    );
  };

  const redirectToHome = () => {
    timerRef.current = setTimeout(() => {
      history.push(routes.root);
      clearCart();
    }, 1500);
  };
  const handleRedirect = () => {
    if (timerRef.current) {
      history.push(routes.root);
      clearCart();
      clearTimeout(timerRef.current);
    } else {
      history.goBack();
    }
  };
  if (isLoading) return <Spinner />;
  return (
    <NeetoUIForm
      formProps={{ noValidate: true }}
      formikProps={{
        initialValues: CHECKOUT_FORM_INITIAL_VALUES,
        validationSchema: CHECKOUT_FORM_VALIDATION_SCHEMA,
        onSubmit: handleSubmit,
      }}
    >
      <div className="flex space-x-4">
        <div className="m-10 w-1/2">
          <div className="flex items-center">
            <LeftArrow
              className="hover:neeto-ui-bg-gray-400 neeto-ui-rounded-full mr-4"
              onClick={handleRedirect}
            />
            <Typography
              className="text-left"
              component="u"
              style="h3"
              textTransform="uppercase"
              weight="bold"
            >
              {"checkout"}
            </Typography>
          </div>
          <div className="mt-8 space-y-4">
            <Form />
          </div>
        </div>
        <div className="neeto-ui-bg-gray-300 h-screen w-1/2 pt-10">
          {/* Items added to cart will be displayed here */}
          <Items {...{ isSubmitDisabled }} />
        </div>
      </div>
    </NeetoUIForm>
  );
};

export default withTitle(Checkout, "checkout");
