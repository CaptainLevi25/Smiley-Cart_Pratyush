
import React from "react";
import { LeftArrow } from "neetoicons";
import { Typography } from "neetoui";

import { useHistory } from "react-router-dom";
import withTitle from "utils/withTitle";

const Checkout = () => {
  const history = useHistory();

  const handleRedirect = () => {
    history.goBack();
  };

  return (
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
          {/* Form will be displayed here */}
        </div>
      </div>
      <div className="neeto-ui-bg-gray-300 h-screen w-1/2 pt-10">
        {/* Items added to cart will be displayed here */}
      </div>
    </div>
  );
};

export default withTitle(Checkout, "checkout");
