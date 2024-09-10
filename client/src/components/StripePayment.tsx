import StripeCheckout, { Token } from "react-stripe-checkout";
import { toast } from "react-toastify";

const pubKey = import.meta.env.VITE_STRIPE_PUBKEY;

export default function StripePayment({ cartTotal }: { cartTotal: number }) {
  const tokenHandler = (token: Token) => {
    fetch("/save-stripe-token", {
      method: "POST",
      body: JSON.stringify(token),
    }).then((response) => {
      response.json().then((data) => {
        toast.success(`We are in business, ${data.email}`);
      });
    });
  };

  return (
    <StripeCheckout
      name="Dr MartensNS Webshop"
      ComponentClass="div"
      currency="GBP"
      stripeKey={pubKey}
      token={tokenHandler}
      amount={cartTotal * 100}
      shippingAddress
      billingAddress
    />
  );
}
