import axios from "axios";
import { mergeAll } from "ramda";
import { camelizeKeys } from "humps";
import { API_URL as baseURL } from "./constants";

const defaultHeaders = {
  Accept: "application/json"
};

function camelizeResponse(response) {
  return camelizeKeys(response);
}

function request(method, url, optionalHeaders, axiosConfig = {}) {
  const { transformResponse = [], ...rest } = axiosConfig;
  const options = mergeAll([
    {
      method,
      url,
      baseURL,
      transformResponse: [camelizeResponse, ...transformResponse],
      headers: { ...defaultHeaders, ...optionalHeaders },
      responseType: "json"
    },
    rest
  ]);
  return axios(options);
}

export function post(
  url,
  { data = {}, params = {}, optionalHeaders = {}, transformResponse = [] }
) {
  return request("post", url, optionalHeaders, {
    data,
    params,
    transformResponse
  });
}

export function patch(
  url,
  { data = {}, params = {}, optionalHeaders = {}, transformResponse = [] }
) {
  return request("patch", url, optionalHeaders, {
    data,
    params,
    transformResponse
  });
}

export function put(
  url,
  { data = {}, params = {}, optionalHeaders = {}, transformResponse = [] }
) {
  return request("put", url, optionalHeaders, {
    data,
    params,
    transformResponse
  });
}

export function get(
  url,
  { params = {}, optionalHeaders = {}, transformResponse = [] }
) {
  return request("get", url, optionalHeaders, { transformResponse, params });
}

export function destroy(url) {
  return request("delete", url);
}
