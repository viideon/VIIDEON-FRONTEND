import axios from 'axios';
import {API} from 'aws-amplify';

/**
 * @param {string} url
 * @param {any} [config]
 */
const _delete = (url, config) => {
  return axios.delete(url, config);
}

/**
 * @param {string} url
 * @param {any} [config]
 */
const _get = (url, config) => {
  return axios.get(url, config);
}

/**
 * @param {string} url
 * @param {any} body
 * @param {any} [config]
 */
const _patch = (url, body, config) => {
  return axios.patch(url, body, config);
}

/**
 * @param {string} url
 * @param {any} body
 * @param {any} [config]
 */
const _post = (url, body, config) => {
  return axios.post(url, body, config);
}

/**
 * @param {string} url
 * @param {string} body
 * @param {any} [config]
 */
const _put = (url, body, config) => {
  return axios.put(url, body, config);
}

/**
 * @param {any} image
 * @param {any} filename
 * @param {any} [config]
 */
export const uploadFile = async (filename, image, config) => {
  const url = await API.post(
    'Backend',
    '/user/signedUrl',
    {
      body: {
        filename,
        contentType: image.type
      },
    },
  );
  await _put(
      url.signedRequest,
      image,
      {
        ...config,
        headers: {
          'Content-Type': image.type,
        }
      }
  );
  return {
    filename: url.key,
    contentType: image.type,
  };
}

/**
 * @param {string} key
 * @param {{ [x: string]: any; onUploadProgress?: (progressEvent: { loaded: number; total: number; }) => void; }} config
 */
export const generateThumbnail = (key, config) => {
  return API.post(
    'Backend',
    '/video/thumbnail',
    {
      body: {
        video: key,
      },
      ...config
    }
  );
}
