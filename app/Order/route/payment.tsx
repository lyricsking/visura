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
  onSubmit: (cart: IOrder, navigate: NavigateFunction) => {
    navigate("shipping");
  },
};

const PaymentPage = () => {
  const {childMethodRef} = useOutletContext()
  
  const formRef = useRef<HTMLFormElement>(null);

  const isScriptLoaded = useScript('https://checkout.flutterwave.com/v3.js');
    
  const handleSelect = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  const handlePayment = (e: any) => {
    e.preventDefault();
    
    const responseCallback = (response) => {};
    const details = {};
    
    initiatePayment(details, responseCallback);
  }
  
  useEffect(() => {
    if (childMethodRef) {
      childMethodRef.current = handleCallMethod;
    }
  }, [childMethodRef, handleCallMethod]);
  
  return (
    <div className="max-w-md mx-auto p-4">
    <Form method="post" onSubmit={handlePayment}>
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
      </Form>
    </div>
  );
};
export default PaymentPage;

interface PaymentMethodProps {
  name: string;
  value: string;
}

export const PaymentMethod = ({ name, value }: PaymentMethodProps) => {
  const labelRef = useRef<HTMLLabelElement>(null);

  const id = `payment-method-${value}`;

  const handleSelect = () => {
    if (labelRef.current) {
      const parentForm = labelRef.current.closest('form');
      if(parentForm) parentForm.submit()
    }
  }

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg mb-2">
      <label 
        ref={labelRef}
        htmlFor={id} 
        className="text-lg capitalize"
        onClick={handleSelect}
      >
        {value}
      </label>
      <input
        type="radio"
        name={name}
        value={value}
        id={id}
        className="form-radio h-5 w-5 text-indigo-600"
      />
    </div>
  );
};

