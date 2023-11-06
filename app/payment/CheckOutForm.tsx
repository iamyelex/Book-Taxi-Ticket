import { FormEvent, useContext } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useCarAmount } from "@/store/useCarAmount";

export default function CheckOutForm() {
  const { carAmount } = useCarAmount();
  console.log(carAmount);

  const stripe: any = useStripe();
  const elements = useElements();

  const handleSubmit = async function (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (elements === null) return;

    const { error: submitError } = await elements.submit();
    if (submitError) return;

    // create the payment intent
    const res = await fetch("/api/create-intent", {
      method: "POST",
      body: JSON.stringify({ amount: carAmount }),
    });

    const secretKey = await res.json();
    console.log(secretKey);

    const { error } = await stripe?.confirmPayment({
      clientSecret: secretKey,
      elements,
      confirmParams: {
        // return_url: "http://localhost:3000/",
        return_url: "http://localhost:3000/Thank-you",
      },
    });
  };

  return (
    <div className="flex h-96 flex-col items-center justify-center">
      <form action="" onSubmit={handleSubmit} className="max-w-md">
        <PaymentElement />

        <button
          className="mt-4 w-full rounded-md bg-yellow-500 p-2 font-semibold"
          disabled={!stripe || !elements}
        >
          Pay ${carAmount}
        </button>
      </form>
    </div>
  );
}
