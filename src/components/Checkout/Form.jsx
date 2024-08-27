import React from "react";
import { Typography } from "neetoui";
import { Input , Select } from "neetoui/formik";
import { useFormikContext } from "formik";
import { useFetchCountries, useFetchStates } from "components/hooks/useCheckoutApi";


const Form = () => {
  //   const { t } = useTranslation();
  const {
    setFieldValue,
    values: { country },
  } = useFormikContext();

  const { data: countries = [] } = useFetchCountries();
  const { data: states = [] } = useFetchStates({
    countryCode: country.code,
  });

  const handleChangeCountry = country => {
    setFieldValue("country", country);
    setFieldValue("state", null);
  };
  return (
    <>
      <Typography style="h3" weight="semibold">
        {"contact"}
      </Typography>
      <Input
        required
        label={"email"}
        name="email"
        placeholder={"enterYourEmail"}
        size="large"
      />
      <Typography className="pt-5" style="h3" weight="semibold">
        {"shippingAddress"}
      </Typography>
      <Select
        required
        label={"country"}
        name="country"
        optionRemapping={{ label: "name", value: "code" }}
        options={countries}
        placeholder={"selectCountry"}
        size="large"
        value={country}
        onChange={handleChangeCountry}
      />
      <div className="flex space-x-2">
        <Input
          required
          label={"firstName"}
          name="firstName"
          placeholder={"enterFirstName"}
          size="large"
        />
        <Input
          required
          label={"lastName"}
          name="lastName"
          placeholder={"enterLastName"}
          size="large"
        />
      </div>
      <Input
        required
        label={"address"}
        name="address"
        placeholder={"enterAddress"}
        size="large"
      />
      <Input
        required
        label={"apartment"}
        name="apartment"
        placeholder={"enterApartmentNumber"}
        size="large"
      />
      <div className="flex space-x-2">
        <Input
          required
          label={"city"}
          name="city"
          placeholder={"enterCity"}
          size="large"
        />
        <Select
          required
          label={"state"}
          name="state"
          optionRemapping={{ label: "name", value: "code" }}
          options={states}
          placeholder={"selectState"}
          size="large"
        />
        <Input
          required
          label={"zipCode"}
          name="zipCode"
          placeholder={"enterZipCode"}
          size="large"
          type="number"
        />
      </div>
    </>
  );
};

export default Form;
