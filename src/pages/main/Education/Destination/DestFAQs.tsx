import type { FAQItem } from "@/types/education/type.country";

interface Props {
  faqs: FAQItem[];
}

const DestFAQs = ({ faqs }: Props) => {
  return (
    <section>
      {faqs.map((faq, i) => (
        <div key={i}>
          <h3>{faq.question}</h3>
          <p>{faq.answer}</p>
        </div>
      ))}
    </section>
  );
};

export default DestFAQs;