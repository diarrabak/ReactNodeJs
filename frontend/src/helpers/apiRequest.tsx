import axios, {
  AxiosError,
  AxiosPromise,
  AxiosResponse,
  AxiosRequestConfig,
} from "axios";
import { Dispatch } from "redux";

const apiRequest = function (options: any): any {
  return (dispatch: Dispatch): AxiosPromise => {
    return axios({
      baseURL: process.env.REACT_APP_HOST,
      ...options,
      headers: {
        // Authorization: `Bearer ${access_token}`,
        // Accept: "application/json",

        Accept: "*/*",
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  };
};

export default apiRequest;
