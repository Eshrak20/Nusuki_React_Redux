const ProductDeliveryInfo = () => {
  return (
    <div className="p-4 rounded-xl border border-border bg-muted/20 backdrop-blur-sm">
      <h3 className="text-sm font-bold mb-2 flex items-center gap-2">
        Shipping Details
      </h3>
      <div className="text-sm text-muted-foreground space-y-1">
        <p className="flex justify-between">
          <span>Inside Dhaka:</span>{" "}
          <span className="text-foreground">1000 BDT</span>
        </p>
        <p className="flex justify-between">
          <span>Outside Dhaka:</span>{" "}
          <span className="text-foreground">1500 BDT</span>
        </p>
      </div>
    </div>
  );
};

export default ProductDeliveryInfo;
