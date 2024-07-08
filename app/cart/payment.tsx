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
        <h2 className="text-xl font-semibold">
          Select your preferred mode of payment.
        </h2>
        <div className="mt-2">
          {Object.keys(PaymentMethods).map((key) => (
            <WalletItem
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

interface WalletItemProps {
  name: string;
  value: string;
}
export const WalletItem = ({ name, value }: WalletItemProps) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg mb-2">
      <p className="text-lg capitalize">{value}</p>
      <input
        type="radio"
        name={name}
        value={value}
        className="form-radio h-5 w-5 text-indigo-600"
      />
    </div>
  );
};

export default PaymentPage;
