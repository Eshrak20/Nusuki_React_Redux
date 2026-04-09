// import { useState } from "react";
// import ShippingAddress from "./ShippingAddress";
// import Payment from "./Payment";
// import { useParams } from "react-router-dom";

// const ShopCheckOutMain = () => {
//   const { cartId  } = useParams(); // ✅ from URL
//   const [step, setStep] = useState(1);

//   return (
//     <div className="max-w-3xl mt-44 mx-auto p-4">
//       {step === 1 && (
//         <ShippingAddress cartId={cartId} onNext={() => setStep(2)} />
//       )}
//       {step === 2 && <Payment cartId={cartId} />}
//     </div>
//   );
// };

// export default ShopCheckOutMain;
