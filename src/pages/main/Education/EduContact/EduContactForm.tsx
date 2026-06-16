import CouncellingForm from "@/pages/main/Education/EduContact/CouncellingComponents/CouncellingForm";

const EduContactForm = () => {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl rounded-sm border bg-background p-6 shadow-sm md:p-8">
        <h1 className="mb-6 text-center text-2xl font-semibold">
          Book Free Study Abroad Counselling
        </h1>

        <CouncellingForm />
      </div>
    </section>
  );
};

export default EduContactForm;