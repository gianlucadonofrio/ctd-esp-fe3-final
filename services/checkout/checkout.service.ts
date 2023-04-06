import { ICheckout } from "types/ICheckout.type";

export const checkoutForm = async (data: ICheckout) => {
  const dataCkeckout = JSON.stringify(data);
  const response = await fetch(`/api/checkout`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: dataCkeckout,
  });

  return await response.json();
};
