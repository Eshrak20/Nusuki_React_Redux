export type FooterSection = {
  title?: string;
  paragraphs?: string[];
  list?: string[];
};

export type EmiBank = {
  bankName: string;
  sixMonthsFee: string;
  twelveMonthsFee: string;
};

export const footerPagesData = {
  support: {
    title: "Support Center",
    description:
      "Need help with booking, payment, refund, or travel related questions? NusukiBD support center is here to guide you.",
    sections: [
      {
        title: "How can we help?",
        paragraphs: [
          "You can contact our support team for flight booking issues, payment confirmation, cancellation requests, refund updates, or general travel assistance.",
        ],
      },
      {
        title: "Support Hours",
        paragraphs: [
          "Our support team will assist you as soon as possible during business hours.",
        ],
      },
      {
        title: "Common Support Topics",
        list: [
          "Flight booking confirmation",
          "Payment related issue",
          "Cancellation and refund update",
          "Ticketing support",
          "General travel assistance",
        ],
      },
    ],
  },

  payment: {
    title: "Payment",
    description:
      "Learn about available payment methods, payment confirmation, and secure transaction process at NusukiBD.",
    sections: [
      {
        title: "Payment Methods",
        paragraphs: [
          "Customers can complete payment using the available payment options shown during checkout. We may support card, mobile banking, bank transfer, and other available payment methods depending on service availability.",
        ],
      },
      {
        title: "Payment Confirmation",
        paragraphs: [
          "After successful payment, booking confirmation will be processed based on ticket availability, airline response, and supplier confirmation.",
        ],
      },
      {
        title: "Important Note",
        paragraphs: [
          "Payment does not always guarantee instant ticketing. Some bookings may require additional verification or supplier confirmation before final ticket issuance.",
        ],
      },
    ],
  },

  security: {
    title: "Payment Security",
    description:
      "All transactions that you conduct in NusukiBD are protected with secure payment processing.",
    sections: [
      {
        paragraphs: [
          "All transactions that you conduct in NusukiBD are secure. We use Secure Socket Layer (SSL), which is one of the trusted technologies in online security.",
          "Your card or payment information is processed through secured payment gateways. We do not store your credit or debit card details on our own server.",
          "All card related information is handled by the respective bank or payment gateway after the selection of the payment method.",
        ],
      },
      {
        title: "Account Safety",
        paragraphs: [
          "Always keep your login information private and avoid sharing OTP, password, card number, or payment details with anyone.",
        ],
      },
    ],
  },

  privacyPolicy: {
    title: "Privacy Policy",
    description:
      "This Privacy Policy explains how NusukiBD collects, uses, and protects user information while using our platform.",
    sections: [
      {
        paragraphs: [
          "This Privacy Policy is prepared by NusukiBD. We are committed to protecting and preserving the privacy of our users when visiting our website or communicating electronically with us.",
          "This policy explains how we process personal data that we collect from you or that you provide to us through our website, application, and social media platforms.",
        ],
      },
      {
        title: "Types of Information We May Collect From You",
        paragraphs: [
          "We may collect, store, and use personal information about individuals who visit and use our website, application, and social media sites.",
          "Information you supply to us may include your name, address, email address, phone number, traveller details, and payment related information required to provide our services.",
          "When you use our services, we may also collect device related information such as IP address, browser type, operating system, language settings, and usage statistics.",
        ],
      },
      {
        title: "How Does NusukiBD Make Use of Mobile Devices",
        paragraphs: [
          "Our mobile application may collect and process personal data in a similar manner to our website. Mobile applications may also use location services when required for service improvement.",
        ],
      },
      {
        title: "How Does NusukiBD Make Use of Social Media",
        paragraphs: [
          "NusukiBD services may involve integration with social media platforms, which may result in the collection of some personal data or receiving information from social media providers.",
        ],
      },
      {
        title: "What Log Data Does NusukiBD Collect",
        paragraphs: [
          "When you use our service, we may collect log data such as IP address, device name, operating system version, application configuration, time and date of service usage, and other statistics.",
        ],
      },
    ],
  },

  emi: {
    title: "Equated Monthly Installment from NusukiBD",
    description:
      "With NusukiBD, selected payments may be eligible for EMI facilities based on partner bank and card availability.",
    intro: [
      {
        title: "EMI",
        paragraphs: [
          "With NusukiBD, everything is affordable and easy. Along with multiple payment methods like cash, cheque, card, and mobile finance, we may also provide monthly installment options for selected services using credit cards.",
          "Paying through EMI is easy. You may be eligible for EMI with selected purchases depending on minimum transaction amount, bank policy, campaign, and payment gateway availability.",
        ],
      },
    ],
    banks: [
      {
        bankName: "Eastern Bank Ltd.",
        sixMonthsFee: "4.5%",
        twelveMonthsFee: "8.0%",
      },
      {
        bankName: "United Commercial Bank Ltd.",
        sixMonthsFee: "5.0%",
        twelveMonthsFee: "10.0%",
      },
      {
        bankName: "NCC Bank Ltd.",
        sixMonthsFee: "6.0%",
        twelveMonthsFee: "9.0%",
      },
      {
        bankName: "Lanka Bangla Finance Ltd.",
        sixMonthsFee: "6.0%",
        twelveMonthsFee: "9.0%",
      },
      {
        bankName: "Standard Chartered Bank",
        sixMonthsFee: "5.0%",
        twelveMonthsFee: "10.0%",
      },
      {
        bankName: "Mutual Trust Bank Ltd.",
        sixMonthsFee: "5.0%",
        twelveMonthsFee: "9.0%",
      },
      {
        bankName: "The City Bank Ltd.",
        sixMonthsFee: "5.0%",
        twelveMonthsFee: "10.0%",
      },
      {
        bankName: "BRAC Bank Ltd.",
        sixMonthsFee: "5.0%",
        twelveMonthsFee: "10.0%",
      },
      {
        bankName: "Prime Bank Ltd.",
        sixMonthsFee: "4.0%",
        twelveMonthsFee: "8.0%",
      },
      {
        bankName: "PREMIER Bank Ltd.",
        sixMonthsFee: "5.0%",
        twelveMonthsFee: "7.0%",
      },
      {
        bankName: "Dhaka Bank Ltd.",
        sixMonthsFee: "5.0%",
        twelveMonthsFee: "9.0%",
      },
      {
        bankName: "NRB Bank Ltd.",
        sixMonthsFee: "4.0%",
        twelveMonthsFee: "6.0%",
      },
    ] satisfies EmiBank[],
  },
};