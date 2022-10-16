import axios from 'axios';
import _ from 'lodash';

/**
 * @param {string} url
 */
const _delete = (url, config) => {
  return axios.delete(url, config);
}

/**
 * @param {string} url
 */
const _get = (url, config) => {
  return axios.get(url, config);
}

/**
 * @param {string} url
 * @param {any} body
 */
const _patch = (url, body, config) => {
  return axios.patch(url, body, config);
}

/**
 * @param {string} url
 * @param {any} body
 */
const _post = (url, body, config) => {
  return axios.post(url, body, config);
}

/**
 * @param {string} url
 * @param {string} body
 * @param {{secured: boolean, token: string, headers: boolean}} options
 */
const _put = (url, body, config) => {
  return axios.put(url, body, config);
}

/**
 * @param {any} assetId
 * @param {{ name: string; type: any; }} image
 * @param {any} token
 * @param {any} filename
 * @param {undefined} [config]
 */
export const uploadFile = async (filename, image, config) => {
  const url = await _post(
      `${process.env.REACT_APP_BACKEND_ENDPOINT}/user/signedUrl`,
      {
        filename,
        contentType: image.type
      },
      config
  );
  await _put(
      url.data.signedRequest,
      image,
      config
  );
  return {
    filename: url.data.key,
    contentType: image.type,
  };
}
