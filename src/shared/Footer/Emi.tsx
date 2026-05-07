
import { footerPagesData } from "@/data/footer/footerPagesData";
import FooterContentSections from "./FooterContentSections";
import FooterInfoPageLayout from "./FooterInfoPageLayout";

const Emi = () => {
  const data = footerPagesData.emi;

  return (
    <FooterInfoPageLayout title={data.title} description={data.description}>
      <div className="space-y-10">
        <FooterContentSections sections={data.intro} />

        <section className="space-y-5">
          <h2 className="text-lg font-bold text-foreground">
            Supported Bank for EMI
          </h2>

          <div className="overflow-hidden rounded-2xl border bg-card shadow-sm dark:bg-card/70">
            <div className="overflow-x-auto">
              <table className="w-full min-w-180 text-left text-sm">
                <thead className="bg-primary/10 text-foreground dark:bg-primary/20">
                  <tr>
                    <th className="px-4 py-4 font-bold">Bank Name</th>
                    <th className="px-4 py-4 font-bold">
                      Processing Fee - 6 Months EMI
                    </th>
                    <th className="px-4 py-4 font-bold">
                      Processing Fee - 12 Months EMI
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data.banks.map((bank) => (
                    <tr
                      key={bank.bankName}
                      className="border-t transition-colors odd:bg-background even:bg-primary/5 hover:bg-primary/10 dark:odd:bg-background dark:even:bg-primary/10 dark:hover:bg-primary/15"
                    >
                      <td className="px-4 py-3 font-medium text-foreground">
                        {bank.bankName}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {bank.sixMonthsFee}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {bank.twelveMonthsFee}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            EMI charges, tenure, and eligibility may vary depending on bank,
            card provider, payment gateway, and campaign availability.
          </p>
        </section>
      </div>
    </FooterInfoPageLayout>
  );
};

export default Emi;