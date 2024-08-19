import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import { IMAGE_URLS } from "../constants.js";
import axios from "axios";
import { append } from "ramda";
import { isNotNil } from "ramda";
import { Spinner } from "@bigbinary/neetoui";
import productsApi from "apis/products";

import { LeftArrow } from "neetoicons";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";
import Header from "components/commons/Header";

const Product = () => {

  const history = useHistory();
  const [isError, setIsError] = useState(false);

  const [product, setProduct] = useState({});
  const { slug } = useParams();
  const fetchProduct = async () => {
    try {
      const response = await productsApi.show(slug);
      console.log(response);
    setProduct(response);


    } catch (error) {
      console.log("An error occurred:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };
  const {
    name,
    description,
    mrp,
    offerPrice,
    imageUrls,
    imageUrl,
  } = product;

  useEffect(() => {
    fetchProduct();
  }, []);

  console.log(product);
  const totalDiscounts = mrp - offerPrice;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);
  const [isLoading, setIsLoading] = useState(true);
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }
  if (isError) return <PageNotFound />;
  return (
    <>
    <Header title={name} />
    <div className="px-6 pb-6">
      <div className="mt-6 flex gap-4">
        <div className="w-2/5">
        {isNotNil(imageUrls) ? (
          <Carousel imageUrls={append(imageUrl,imageUrls)} title={name} />
        ) : (
          <img alt={name} className="w-48" src={imageUrl} />
        )}
        </div>
        <div className="w-3/5 space-y-4">
          <p>
           {description}
          </p>
          <p>MRP: {mrp}</p>
          <p className="font-semibold">Offer price: {offerPrice}</p>
          <p className="font-semibold text-green-600">{discountPercentage} off</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Product;
