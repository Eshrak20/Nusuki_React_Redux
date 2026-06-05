type ContactInfoFieldsProps = {
  contact: {
    email: string;
    phone: string;
  };
  setContact: React.Dispatch<
    React.SetStateAction<{
      email: string;
      phone: string;
    }>
  >;
};

const ContactInfoFields = ({ contact, setContact }: ContactInfoFieldsProps) => {
  return (
    <div className="rounded-sm border bg-card p-5 text-card-foreground shadow-sm sm:p-6">
      <h2 className="text-lg font-semibold">Contact Information</h2>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            required
            value={contact.email}
            onChange={(event) =>
              setContact((prev) => ({
                ...prev,
                email: event.target.value,
              }))
            }
            placeholder="Enter contact email"
            className="mt-2 h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-primary"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Phone</label>
          <input
            required
            value={contact.phone}
            onChange={(event) =>
              setContact((prev) => ({
                ...prev,
                phone: event.target.value,
              }))
            }
            placeholder="Enter contact phone"
            className="mt-2 h-11 w-full rounded-xl border bg-background px-3 text-sm outline-none transition focus:border-primary"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInfoFields;