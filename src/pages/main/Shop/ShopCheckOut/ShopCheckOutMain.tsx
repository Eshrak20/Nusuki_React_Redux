import { useState } from "react";
import Payment from "./Payment";
import { useParams } from "react-router-dom";
import ShippingAddress from "./ShippingAddress";

const ShopCheckOutMain = () => {
  const { cartId } = useParams();
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-3xl mt-44 mx-auto p-4">
      {step === 1 && (
        <ShippingAddress cartId={cartId} onNext={() => setStep(2)} />
      )}
      {step === 2 && <Payment cartId={cartId} />}
    </div>
  );
};

export default ShopCheckOutMain;
