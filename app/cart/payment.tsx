import { NavigateFunction } from "@remix-run/react";

const PaymentMethods = {
  card: "card",
  deposit: "deposit",
  direct: "direct",
} as const;
type PaymentMethods = keyof typeof PaymentMethods;

export const handle = {
  name: "Payment",
  buttonLabel: "Pay Now",
  onSubmit: (navigate: NavigateFunction) => {
    navigate("shipping");
  },
};

const PaymentPage = () => {
  return (
    <div className="max-w-md mx-auto p-4">
      <div className="mt-4">
        <h2 className="text-xl font-semibold" id="payment-method-heading">
          Select your preferred mode of payment.
        </h2>
        <div className="mt-2" role="radiogroup" aria-labelledby="payment-method-heading">
          {Object.keys(PaymentMethods).map((key) => (
            <PaymentMethod
              key={key}
              name="paymentMethod"
              value={PaymentMethods[key as PaymentMethods]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface PaymentMethodProps {
  name: string;
  value: string;
}
export const PaymentMethod = ({ name, value }: PaymentMethodProps) => {
  const id = `payment-method-${value}`;

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg mb-2">
      <label htmlFor={id} className="text-lg capitalize">
        {value}
      </label>
      <input
        type="radio"
        name={name}
        value={value}
        id={id}
        className="form-radio h-5 w-5 text-indigo-600"
        aria-labelledby={`payment-method-${value}`}
      />
    </div>
  );
};

export default PaymentPage;
