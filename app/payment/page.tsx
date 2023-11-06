"use client";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckOutForm from "./CheckOutForm";
import { useCarAmount } from "@/store/useCarAmount";

export default function PaymentPage() {
  const { carAmount } = useCarAmount();

  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string,
  );

  const options: any = {
    mode: "payment",
    amount: 547,
    currency: "usd",
  };

  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <CheckOutForm />
      </Elements>
    </div>
  );
}
