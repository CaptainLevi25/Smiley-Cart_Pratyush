import React from "react";
import { Helmet } from "react-helmet";

const withTitle = (Component, title) => {
  const PageTitle = props => {
    const pageTitle = title ? title : "Smile Cart";

    return (
      <>
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>
        <Component {...props} />
      </>
    );
  };

  return PageTitle;
};

export default withTitle;