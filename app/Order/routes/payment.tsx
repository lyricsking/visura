import {
  json,
  NavigateFunction,
  useFetcher,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react";
import { useEffect, useRef } from "react";
import useScript from "~/hooks/use-script";
import { IOrder } from "../types/order.type";
import {
  FlutterWaveProps,
  FlutterWaveResponse,
} from "../types/flutterwave.type";
import useFlutterwavePayment from "../hooks/use-flutterwave";
import { CART_FETCHER_KEY } from "../types/cart.type";
import {} from "../models/order.model";
import { updatePaymentMethod } from "../server/cart.server";
import { ActionFunctionArgs } from "@remix-run/node";

const PaymentMethods = {
  Card: "card",
  "Bank Transfer": "banktransfer",
  Opay: "opay",
  "# USSD": "ussd",
  "Direct Debit": "account",
  //  "Google Pay": "googlepay",
  //  "Apple Pay": "applepay",
} as const;
type PaymentMethods = (typeof PaymentMethods)[keyof typeof PaymentMethods];

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const paymentMethod = formData.get("paymentMethod");
  const orderId = formData.get("orderId");
  if (orderId && paymentMethod)
    await updatePaymentMethod({
      orderId: orderId as string,
      paymentMethod: paymentMethod as string,
    });

  return json({ success: true });
};

export const loader = async () => {
  const flPublicKey = process.env.FLUTTERWAVE_PUBLIC_KEY;

  return json({ flPublicKey });
};

export const handle = {
  name: "Payment",
  buttonLabel: "Pay Now",
  onSubmit: (cart: IOrder, navigate: NavigateFunction) => {
    navigate("shipping");
  },
};

const PaymentPage = () => {
  const { flPublicKey } = useLoaderData<typeof loader>();
  const { cart, childMethodRef }: { cart: IOrder; childMethodRef: any } =
    useOutletContext();

  const fetcher = useFetcher({ key: CART_FETCHER_KEY });

  const handleSelect = (method: PaymentMethods) => {
    fetcher.submit(
      {
        orderId: cart._id.toString(),
        paymentMethod: method,
      },
      {
        method: "post",
      }
    );
  };

  const isScriptLoaded = useScript("https://checkout.flutterwave.com/v3.js");
  const { initiatePayment, isProcessing } = useFlutterwavePayment();

  const handlePayment = (isScriptLoaded: boolean, paymentOption: string) => {
    if (!isScriptLoaded) return;
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
        payment_options: paymentOption,
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
      childMethodRef.current = () =>
        handlePayment(isScriptLoaded, cart.paymentDetails?.method as string);
    }
  }, [childMethodRef, isScriptLoaded]);

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
              value={PaymentMethods[key as keyof typeof PaymentMethods]}
              onSelect={() =>
                handleSelect(PaymentMethods[key as keyof typeof PaymentMethods])
              }
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
  label: string;
  value: string;
  onSelect: () => void;
}

export const PaymentMethod = ({
  name,
  label,
  value,
  onSelect,
}: PaymentMethodProps) => {
  const id = `payment-method-${value}`;

  return (
    <label className="flex items-center justify-between p-4 text-lg border rounded-lg mb-2">
      <span id="payment-method-label">Pay with {label}</span>
      <input
        type="radio"
        name={name}
        value={value}
        onClick={onSelect}
        id={id}
        className="form-radio h-5 w-5 text-indigo-600"
        aria-labelledby="payment-method-label"
      />
    </label>
  );
};
