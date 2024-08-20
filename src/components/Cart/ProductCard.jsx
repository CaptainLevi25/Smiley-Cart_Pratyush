import React from "react";

import ProductQuantity from "components/commons/ProductQuantity";
import { Typography } from "neetoui";

const ProductCard = ({
  slug,
  imageUrl,
  offerPrice,
  mrp,
  name,
  availableQuantity,
}) => (
  <div className="neeto-ui-rounded neeto-ui-border-black border p-2">
    <div className="flex w-full items-center space-x-5">
      <img alt={name} height={80} src={imageUrl} width={80} />
      <div className="flex-grow space-y-1">
        <Typography className="mb-2" style="h4" weight="bold">
          {name}
        </Typography>
        <Typography style="body2">MRP: ${mrp}</Typography>
        <Typography style="body2">Offer price: ${offerPrice}</Typography>
      </div>
      <ProductQuantity {...{ availableQuantity, slug }} />
    </div>
  </div>
);

export default ProductCard;