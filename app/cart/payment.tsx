import WalletItem from "~/components/WalletItem";

const PaymentPage = () => {
  return (
    <div className="max-w-md mx-auto p-4">
      <header className="flex items-center justify-between py-4">
        <button className="text-xl">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1 className="text-2xl font-bold">Payment Method</h1>
      </header>

      <section className="mt-4">
        <h2 className="text-xl font-semibold">Wallet</h2>
        <div className="mt-2">
          <WalletItem name="PayPal" value="paypal" />
          <WalletItem name="Apple Pay" value="applepay" />
          <WalletItem name="Google Pay" value="googlepay" />
          <WalletItem name="Cash on Delivery" value="cashondelivery" />
        </div>
      </section>

      <div className="sticky bottom-0 left-0 right-0 bg-white p-4 border-t">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">Total price</span>
          <span className="text-lg font-bold">$324.00</span>
        </div>
        <button className="w-full bg-blue-600 text-white py-3 mt-4 rounded-lg">Pay Now</button>
      </div>
    </div>
  );
};


interface WalletItemProps {
  name: string;
  value: string;
}

const WalletItem: React.FC<WalletItemProps> = ({ name, value }) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg mb-2">
      <p className="text-lg">{name}</p>
      <input type="radio" name="wallet" value={value} className="form-radio h-5 w-5 text-indigo-600" />
    </div>
  );
};

export default PaymentPage;
export WalletItem;
