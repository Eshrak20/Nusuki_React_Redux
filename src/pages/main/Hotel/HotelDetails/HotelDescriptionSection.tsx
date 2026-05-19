const HotelDescriptionSection = ({ descriptions }: { descriptions: any[] }) => {
  if (!descriptions?.length) return null;

  const shortDescription =
    descriptions.find((item) => item.type === "ShortDescription") ||
    descriptions[0];

  const otherDescriptions = descriptions.filter(
    (item) => item.type !== shortDescription.type,
  );

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-slate-950">About This Hotel</h2>

      <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
        {cleanText(shortDescription?.value)}
      </p>

      {otherDescriptions.length > 0 && (
        <div className="mt-5 space-y-3">
          {otherDescriptions.slice(0, 3).map((item) => (
            <details
              key={item.type}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
            >
              <summary className="cursor-pointer text-sm font-bold text-slate-900">
                {item.type}
              </summary>

              <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
                {cleanText(item.value)}
              </p>
            </details>
          ))}
        </div>
      )}
    </section>
  );
};

export default HotelDescriptionSection;

const cleanText = (value?: string) => {
  return String(value || "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
};