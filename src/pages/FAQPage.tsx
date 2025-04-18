import React, { useState } from "react";
import { Layout } from "../components/layout/Layout";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        className="flex justify-between items-center w-full text-left font-medium text-gray-900 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5" />
        ) : (
          <ChevronDown className="w-5 h-5" />
        )}
      </button>

      {isOpen && (
        <div className="mt-2 text-gray-600">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export const FAQPage: React.FC = () => {
  const faqs = [
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping typically takes 3-5 business days. Express shipping is available for 1-2 business day delivery.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy on most items. Products must be returned in their original packaging and in unused condition.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Currently, we ship to India, USA, UK, Canada, and Australia. We're working on expanding our shipping options to more countries.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account.",
    },
    {
      question: "Are your products covered by warranty?",
      answer:
        "Yes, all our products come with a minimum 1-year warranty. Some products offer extended warranty options.",
    },
    {
      question: "Do you price match?",
      answer:
        "Yes! If you find a lower price on an identical item from a qualified retailer, we'll match it.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept credit/debit cards, UPI, net banking, and cash on delivery for orders within India.",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Frequently Asked Questions
        </h1>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-4">
              If you couldn't find the answer to your question, please contact
              our customer support team.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Email: </span>
              <a
                href="mailto:support@techelectronics.com"
                className="text-blue-900 hover:underline"
              >
                support@techelectronics.com
              </a>
            </div>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-gray-700">Phone: </span>
              <a
                href="tel:+919876543210"
                className="text-blue-900 hover:underline"
              >
                +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
