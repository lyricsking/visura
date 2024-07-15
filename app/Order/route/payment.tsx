import {
  NavigateFunction,
  useFetcher,
  useOutletContext,
} from "@remix-run/react";
import { useEffect, useRef } from "react";
import useScript from "~/hooks/use-script";
import { IOrder } from "../type/order.type";
import {
  FlutterWaveProps,
  FlutterWaveResponse,
} from "../type/flutterwave.type";
import useFlutterwavePayment from "../hooks/use-flutterwave";
import { CART_FETCHER_KEY } from "../type/cart.type";
import { IOrderModel } from "../model/order.model";

const PaymentMethods = {
  card: "card",
  deposit: "deposit",
  direct: "direct",
} as const;
type PaymentMethods = keyof typeof PaymentMethods;

export const action = async () => {
  return null;
};

export const handle = {
  name: "Payment",
  buttonLabel: "Pay Now",
  onSubmit: (cart: IOrder, navigate: NavigateFunction) => {
    navigate("shipping");
  },
};

const PaymentPage = () => {
  const { cart, childMethodRef }: { cart: IOrderModel; childMethodRef: any } =
    useOutletContext();

  const isScriptLoaded = useScript("https://checkout.flutterwave.com/v3.js");
  const { initiatePayment, isProcessing } = useFlutterwavePayment();

  const handlePayment = () => {
    //    if (!isScriptLoaded || isProcessing) return;
    const responseCallback = (response: FlutterWaveResponse) => {};

    const shouldProceed = window.confirm(
      "Press \"OK\" to proceed with the payment?"
    );
    if (shouldProceed) {
      const details: FlutterWaveProps = {
        tx_ref: 'unique-transaction-ref-123',
        amount: 5000,
        customer: {
          email: 'customer@example.com',
          phone_number: '08012345678',
          name: 'John Doe',
        },
        customizations: {
          title: 'Payment for Services',
          description: 'Payment for the services rendered',
          logo: 'https://yourcompany.com/logo.png',
        },
        payment_options: 'card, ussd, mobilemoney',
        callback: (data) => {
          console.log('Payment successful:', data);
        },
        onclose: () => {
          console.log('Payment modal closed');
        },
        public_key: '',
      };

      initiatePayment(details, responseCallback);
    }
  };

  useEffect(() => {
    if (childMethodRef) {
      childMethodRef.current = handlePayment;
    }
  }, [childMethodRef]);

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="mt-4">
        <h2 className="text-xl font-semibold" id="payment-method-heading">
          Select your preferred mode of payment.
        </h2>
        <div
          className="mt-2"
          role="radiogroup"
          aria-labelledby="payment-method-heading"
        >
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
export default PaymentPage;

interface PaymentMethodProps {
  name: string;
  value: string;
}

export const PaymentMethod = ({ name, value }: PaymentMethodProps) => {
  const fetcher = useFetcher();

  const handleSelect = (method: string) => {
    fetcher.submit({}, {});
  };

  const id = `payment-method-${value}`;

  return (
    <label className="flex items-center justify-between p-4 text-lg capitalize border rounded-lg mb-2">
      <span id="payment-method-label">{value}</span>
      <input
        type="radio"
        name={name}
        value={value}
        onClick={() => handleSelect(value)}
        id={id}
        className="form-radio h-5 w-5 text-indigo-600"
        aria-labelledby="payment-method-label"
      />
    </label>
  );
};
