import {
  json,
  NavigateFunction,
  useFetcher,
  useLoaderData,
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
  "Card": "card",
  "Bank Transfer": "banktransfer",
  "# USSD": "ussd",
  "Direct Bank": "account",
  "Google Pay": "googlepay",
  "Apple Pay": "applepay",
} as const;
type PaymentMethods = keyof typeof PaymentMethods;

export const action = async () => {
  return null;
};

export const loader = async () => {
  const flPublicKey = process.env.FLUTTERWAVE_PUBLIC_KEY;;
  return json({ flPublicKey });
}

export const handle = {
  name: "Payment",
  buttonLabel: "Pay Now",
  onSubmit: (cart: IOrder, navigate: NavigateFunction) => {
    navigate("shipping");
  },
};

const PaymentPage = () => {
  const { flPublicKey } = useLoaderData<typeof loader>();
  const { cart, childMethodRef }: { cart: IOrderModel; childMethodRef: any } =
    useOutletContext();

  const isScriptLoaded = useScript("https://checkout.flutterwave.com/v3.js");
  const { initiatePayment, isProcessing } = useFlutterwavePayment();

  const handlePayment = () => {

    //if (!isScriptLoaded) return;
    const responseCallback = (response: FlutterWaveResponse) => {};

    const shouldProceed = window.confirm(
      'Press "OK" to proceed with the payment?'
    );      
    
    if (shouldProceed) {
      const details: FlutterWaveProps = {
        public_key: flPublicKey || "",
        tx_ref: "dyfhurrghgfe37iojhffhhhhrfh",
        amount: 5000,
        currency: "NGN",
        customer: {
          email: "customer@example.com",
          phone_number: "08012345678",
          name: "John Doe",
        },
        customizations: {
          title: "Payment for Services",
          description: "Payment for the services rendered",
          logo: "https://yourcompany.com/logo.png",
        },
        payment_options: "googlepay",
        callback: (data: any) => {
          console.log("Payment successful:", data);
        },
        onclose: () => {
          console.log("Payment modal closed");
        },
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
              label={key}
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
  label: string,
  value: string;
}

export const PaymentMethod = ({ name,label, value }: PaymentMethodProps) => {
  const fetcher = useFetcher();

  const handleSelect = (method: string) => {
    fetcher.submit({}, {});
  };

  const id = `payment-method-${value}`;

  return (
    <label className="flex items-center justify-between p-4 text-lg border rounded-lg mb-2">
      <span id="payment-method-label">{label}</span>
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
