import axios from "axios";
import myToken from "../secret"
// const myToken = "Qj2Wo7ws7guNjWJvubyS3P5OWXAg7j7K";

export const getCurr = (from, to, amount) => {
  return axios.get(
    `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`,
    { headers: myToken }
  );
};
