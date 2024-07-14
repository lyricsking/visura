import { useState } from 'react';

const useFlutterwavePayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const initiatePayment = (paymentDetails: FlutterWaveProps) => {
    if (!window.FlutterwaveCheckout) {
      callback({ status: 'error', message: 'Flutterwave script not loaded' });
      return;
    }

    setIsProcessing(true);

    const config: FlutterWaveProps = {
      ...paymentDetails,
      public_key: "YOUR_FLUTTERWAVE_PUBLIC_KEY",
      callback: (response) => {
        setIsProcessing(false);
        paymentDetails.callback(response);
      },
      onclose: () => {
        setIsProcessing(false);
        paymentDetails.onclose();
      },
    };
    
    window.FlutterwaveCheckout(config);
  };

  return { initiatePayment, isProcessing };
};

export default useFlutterwavePayment;
