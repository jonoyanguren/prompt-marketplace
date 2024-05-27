import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51PL6McEvXCofx7SDcMPelH6Xgfk2e8S98mPomKxN5id1c2TIrMLfmvZ13bmzMsGrwQ6gjWOp3MJDZGwzeXHEZS9P00WjMXgZai"
);

export const CheckoutScreen = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};
