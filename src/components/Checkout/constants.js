import * as yup from "yup";

export const CHECKOUT_FORM_INITIAL_VALUES = {
  email: "",
  country: { code: "US", name: "United States" },
  firstName: "",
  lastName: "",
  address: "",
  apartment: "",
  city: "",
  state: null,
  zipCode: "",
};

export const CHECKOUT_FORM_VALIDATION_SCHEMA = yup.object().shape({
  email: yup
    .string()
    .email(" emailInvalid")
    .required(" emailRequired"),
  country: yup
    .object()
    .shape({
      name: yup.string().required(),
      code: yup.string().required(),
    })
    .nullable(),
  firstName: yup.string().required(" firstNameRequired"),
  lastName: yup.string().required(" lastNameRequired"),
  address: yup.string().required(" addressRequired"),
  apartment: yup.string().required(" apartmentRequired"),
  city: yup.string().required(" cityRequired"),
  state: yup
    .object()
    .shape({
      name: yup.string().required(),
      code: yup.string().required(),
    })
    .nullable()
    .required(" stateRequired"),
  zipCode: yup.number().required(" zipCodeRequired"),
});
