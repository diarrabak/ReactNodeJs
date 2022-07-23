import axios, {
    AxiosError,
    AxiosPromise,
    AxiosResponse,
    AxiosRequestConfig,
  } from "axios";
  import { Dispatch } from "redux";
  
  
  const apiRequest = function (options: any): any {
    return (dispatch: Dispatch, getState: any): AxiosPromise => {
      // TODO: dispatch reset validators
  
      // accessing the access token from the auth reducer
  
      const access_token = getState().auth.token;
  
      return axios({
        baseURL: process.env.REACT_APP_API_URL,
        ...options,
        headers: {
          Authorization: `Bearer ${access_token}`,
          // Accept: "application/json",
  
          Accept: "*/*",
          "Content-Type": "application/json",
          ...options.headers,
        },
      })
       
    };
  };
  
  export const api = function (options: any, onSuccess: any, onError: any): any {
    return (dispatch: Dispatch, getState: any): AxiosPromise => {
      const access_token = getState().auth.token;
  
      return axios({
        baseURL: process.env.REACT_APP_API_URL,
        ...options,
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "*/*",
          // Accept: "application/json",
          "Content-Type": "application/json",
          ...options.headers,
        },
      })
        .then((res) => dispatch(onSuccess(res)))
        .catch((err) => dispatch(onError(err)));
    };
  };
  
  
  export default apiRequest;
  