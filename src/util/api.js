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
  console.log('Calling _put', {url, body, config});
  return axios.put(url, body, config);
}

/**
 * @param {any} image
 * @param {any} filename
 * @param {any} [config]
 */
export const uploadFile = async (filename, image, config) => {
  console.log('Uploading file', {filename, config});
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
  console.log('Signed URL created', {url, image});
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
