export default (amount) => {
  const toNumber = Number.parseFloat(amount, 10);
  const realNumber = toNumber / 10000000;
  const toStr = realNumber.toString();

  return toStr;
}
