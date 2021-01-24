export default (str) => {
  let newStr = str.replace('\0', '');
  newStr = newStr.replace(/\0/g, '');

  return newStr;
}
