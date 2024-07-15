import { useState } from "react";
import { FlutterWaveProps } from "../type/flutterwave.type";

const useFlutterwavePayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);

  const initiatePayment = (
    paymentDetails: FlutterWaveProps,
    callback: (params: any) => void
  ) => {
    if (!window.FlutterwaveCheckout) {
      callback({
        status: "error",
        message: "Flutterwave script not loaded",
      });
      return;
    }

    setIsProcessing(true);

    const config: FlutterWaveProps = {
      ...paymentDetails,
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
