const paymentMethods = {
  card:"card",
  deposit:"deposit",
  direct:"direct"
};

const PaymentPage = () => {
  return (
    <div className="max-w-md mx-auto p-4">
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Wallet</h2>
        <div className="mt-2">
          { 
          Object.keys(paymentMethods).map((key, index)=> <WalletItem key={key} name="paymentMethod" value={paymentMethods[key]} />
          )}
        </div>
      </div>
    </div>
  );
};

interface WalletItemProps {
  name: string;
  value: string;
}
export const WalletItem: React.FC<WalletItemProps> = ({ name, value }) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg mb-2">
      <p className="text-lg">{name}</p>
      <input
        type="radio"
        name="wallet"
        value={value}
        className="form-radio h-5 w-5 text-indigo-600"
      />
    </div>
  );
};

export default PaymentPage;
