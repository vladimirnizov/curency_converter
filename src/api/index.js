const apiKey = "09e7fc5c2aa1145ea0b8";
const convertData = (from, to, amount) => {
  return fetch(
    `https://free.currconv.com/api/v7/convert?q=${from}${to}&compact=ultra&apiKey=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => Object.values(data)[0] * amount);
};

const listData = (to) => {
  return fetch(
    `https://free.currconv.com/api/v7/convert?q=USD_${to},EUR_${to}&compact=ultra&apiKey=${apiKey}`
  )
    .then((response) => response.json())
    .then((data) => data);
};
const allCurrencies = () => {
  return fetch(`https://free.currconv.com/api/v7/currencies?apiKey=${apiKey}`)
    .then((response) => response.json())
    .then((data) => data);
};
export const userService = {
  convertData,
  listData,
  allCurrencies,
};
