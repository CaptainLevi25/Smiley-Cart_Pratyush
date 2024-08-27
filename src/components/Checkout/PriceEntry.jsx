import React from "react";

import { Typography } from "neetoui";


const PriceEntry = ({ totalPrice, i18nKey, className = "" }) => {
    console.log(totalPrice)

    return (
  <Typography className="flex justify-between" style="h5">

{i18nKey === "subtotal"  && `Subtotal ${totalPrice}`}
{i18nKey === "deliveryCharges" && `Delivery charges FREE` }
{i18nKey === "totalPayablePrice" && `Total Payable ${totalPrice}` }

  </Typography>
);
}
export default PriceEntry;