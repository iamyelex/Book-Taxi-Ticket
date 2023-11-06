import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Make Payment",
  description: "Make payment for your ride.",
};

export default function PaymentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
