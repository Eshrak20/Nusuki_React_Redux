type PnrMissingParamsAlertProps = {
  flightId: string;
  searchId: string;
};

const PnrMissingParamsAlert = ({
  flightId,
  searchId,
}: PnrMissingParamsAlertProps) => {
  if (flightId && searchId) return null;

  return (
    <div className="rounded-sm border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
      Missing flight_id or search_id. Please come from flight details page.
    </div>
  );
};

export default PnrMissingParamsAlert;