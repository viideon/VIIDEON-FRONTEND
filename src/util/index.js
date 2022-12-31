// See https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
/**
 * @param {string | any[]} array
 * @param {(arg0: any, arg1: number, arg2: any) => any} callback
 */
export const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
