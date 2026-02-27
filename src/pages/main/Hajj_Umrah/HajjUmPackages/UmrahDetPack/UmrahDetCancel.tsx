import { Info, Mail, Globe, PhoneCall } from "lucide-react";
import {
  cancellationPolicies,
  contactInfo,
} from "../../../../../data/HajjUmDetCancelData";
import type { ReactNode } from "react";

interface ContactCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  subDescription?: string;
  linkText?: string;
  availability: string;
  responseTime?: string;
  buttonText: string;
}

const HajjUmDetCancel = () => {
  return (
    <div className="max-w-425 mx-auto space-y-8 mb-20 bg-background text-foreground">
      <h2 className="text-2xl font-bold text-hajj">Cancellation Policy</h2>

      {/* Blue Alert Banner */}
      <div className="relative flex items-center gap-3 p-4 border bg-hajj/5 dark:bg-hajj text-black text-sm">
        <Info className="w-5 h-5 shrink-0" />
        <p>
          <strong>Disclaimer: For visa applicants -</strong> If your visa has
          been issued, you will not be able to cancel the package, and no
          amounts will be refunded.
        </p>
      </div>

      {/* Pricing Table */}
      <div className="overflow-x-auto border rounded-lg border-border">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-hajj/5 text-muted-foreground font-medium">
            <tr>
              <th className="p-3 border-b border-r">
                Refund rate in case of cancellation
              </th>
              <th className="p-3 border-b border-r text-center">
                Within the first (24) hours.
              </th>
              <th className="p-3 border-b border-r text-center">
                Before the last (4) Day/Days of the package.
              </th>
              <th className="p-3 border-b border-r text-center">
                Within the last (4) Day/Days of the package
              </th>
              <th className="p-3 border-b text-center">In the last 72 hours</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="p-3 font-bold border-r">Package fees</td>
              <td className="p-3 border-r text-center">90%</td>
              <td className="p-3 border-r text-center">50%</td>
              <td className="p-3 border-r text-center">0%</td>
              <td
                rowSpan={2}
                className="p-3 text-center align-middle font-bold text-red-500"
              >
                0%
              </td>
            </tr>
            <tr>
              <td className="p-3 font-bold border-r">Visa</td>
              <td colSpan={3} className="p-0 border-r">
                <div className="flex flex-col h-full">
                  <div className="p-2 text-center border-b">
                    Within the first (72) hours.
                  </div>
                  <div className="p-2 text-center font-bold">100%</div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="p-3 font-bold border-r">
                Flight reservation value (customs flights)
              </td>
              <td colSpan={4} className="p-3 text-center text-muted-foreground">
                Based on the cancellation policy of flight reservation
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Policy Bullets */}
      <ul className="space-y-3 list-disc pl-5 text-sm text-muted-foreground">
        {cancellationPolicies.map((policy, index) => (
          <li key={index} className="leading-relaxed">
            {policy}
          </li>
        ))}
      </ul>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {/* Email Card */}
        <ContactCard
          icon={<Mail className="text-hajj" />}
          title="Support Email"
          description="for any concerns, complaints or even suggestions please email us on:"
          linkText={contactInfo.email}
          availability="All week"
          responseTime="Within 24 hours"
          buttonText="Contact Us"
        />

        {/* Website Card */}
        <ContactCard
          icon={<Globe className="text-hajj" />}
          title="Website"
          description="Explore our website for more information."
          availability="All week"
          buttonText="Visit our Website"
        />

        {/* Contact Card */}
        <ContactCard
          icon={<PhoneCall className="text-hajj" />}
          title="Contact Us"
          description={`Contact Number ${contactInfo.phone}`}
          subDescription={`Or send us a WhatsApp message and our team will get back to you within ${contactInfo.whatsappResponse}`}
          availability={contactInfo.workingHours}
          buttonText="Call Us"
        />
      </div>
    </div>
  );
};

// Reusable Contact Card Component
const ContactCard = ({
  icon,
  title,
  description,
  subDescription,
  linkText,
  availability,
  responseTime,
  buttonText,
}: ContactCardProps) => (
  <div className="p-6 border rounded-2xl bg-card hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
    <div className="space-y-3">
      <div className="w-10 h-10 rounded-full bg-hajj/10 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>

      {linkText && (
        <p className="text-sm font-semibold text-hajj truncate">{linkText}</p>
      )}

      {subDescription && (
        <p className="text-xs text-muted-foreground mt-2">{subDescription}</p>
      )}

      <div className="space-y-1 pt-2">
        <p className="text-xs">
          <span className="font-bold text-foreground">
            Service Availability{" "}
          </span>
          <span className="text-muted-foreground">{availability}</span>
        </p>
        {responseTime && (
          <p className="text-xs">
            <span className="font-bold text-foreground">Response Time </span>
            <span className="text-muted-foreground">{responseTime}</span>
          </p>
        )}
      </div>
    </div>

    <button className="w-full py-2 bg-hajj text-white rounded-md text-sm font-medium hover:opacity-90 transition-opacity mt-auto">
      {buttonText}
    </button>
  </div>
);

export default HajjUmDetCancel;
