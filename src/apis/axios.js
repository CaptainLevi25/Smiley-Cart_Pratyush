import axios from "axios";
import { serializeKeysToSnakeCase } from "neetocist";
import { keysToCamelCase } from "neetocist";
import { evolve } from "ramda";

const setHttpHeaders = () => {
    axios.defaults.headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
  };

const transformResponseKeysToCamelCase = response => {
    if (response.data) response.data = keysToCamelCase(response.data);
  };

  const requestInterceptors = () => {
    axios.interceptors.request.use(request =>
      evolve(
        { data: serializeKeysToSnakeCase, params: serializeKeysToSnakeCase },
        request
      )
    );
  };
  const responseInterceptors = () => {

    axios.interceptors.response.use(response => {
      transformResponseKeysToCamelCase(response);

      return response.data;
    });
  };


  export default function initializeAxios() {
    axios.defaults.baseURL =
      "https://smile-cart-backend-staging.neetodeployapp.com/";
    setHttpHeaders();
    requestInterceptors();
    responseInterceptors();

  }
