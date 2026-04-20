const RefundPolicyTab = () => {
  return (
    <div className="rounded-xl border bg-card">
      {/* Header */}
      <div className="border-b bg-muted/30 px-4 py-3 text-center">
        <h3 className="text-sm md:text-base font-semibold text-primary">
          Refund & Cancellation Policy
        </h3>
      </div>

      {/* Content */}
      <div className="space-y-4 px-4 py-4 text-sm text-foreground">
        <ul className="space-y-3 list-disc pl-4">
          <li>
            Nusuki BD follows airline's cancellation and reissue policy.
          </li>

          <li>
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-md">
              Convenience fee is Non-refundable.
            </span>
          </li>

          <li className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
            To cancel/reissue, travelers are advised to confirm Nusuki BD 48
            hours prior to the travel date. Otherwise, no-show charge might be
            applicable depending on the airline's rule.
          </li>

          <li>
            To cancel/reissue, travelers need to call at{" "}
            <span className="font-medium text-primary">
              +8801714742454
            </span>{" "}
            or knock on Messenger{" "}
            <a
              href="https://m.me/NusukiBD"
              target="_blank"
              className="text-blue-600 hover:underline"
            >
              m.me/NusukiBD
            </a>
            . Our team will initiate an email and solve the issue upon
            confirmation from the customer.
          </li>

          <li>
            Cancellation fee/reissue fee and a Standard service charge may apply
            in case of any change as per airlines policy. Cancellation fee/reissue
            is shared by the airlines and may get changed at any time.
          </li>

          <li>
            Nusuki BD won't charge any additional service charge apart from the
            airline quoted fees. For the EMI method, the applicable EMI charge
            will be deducted from the payable amount.
          </li>

          <li className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
            Refunds will be initiated (if applicable) after a successful
            cancellation. The refund will be sent through the same channel that
            the traveler has used for payment. Depending on the channel type, the
            payment may take one to five working days to be reflected in the
            account.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RefundPolicyTab;