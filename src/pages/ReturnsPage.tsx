import React from "react";
import { Layout } from "../components/layout/Layout";
import { RotateCcw, Package, CheckCircle, ArrowRight } from "lucide-react";

export const ReturnsPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Returns & Refunds
        </h1>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center mb-6">
            <RotateCcw className="w-8 h-8 text-blue-900 mr-4" />
            <h2 className="text-2xl font-semibold text-gray-900">
              Our 30-Day Return Policy
            </h2>
          </div>

          <p className="text-gray-700 mb-6">
            We want you to be completely satisfied with your purchase. If you're
            not happy for any reason, you can return most items within 30 days
            of delivery for a full refund or exchange.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="border border-gray-200 rounded-lg p-5 text-center">
              <div className="flex justify-center mb-4">
                <Package className="w-10 h-10 text-blue-900" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Step 1</h3>
              <p className="text-gray-600">
                Request a return through your account or contact our customer
                service
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-5 text-center">
              <div className="flex justify-center mb-4">
                <ArrowRight className="w-10 h-10 text-blue-900" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Step 2</h3>
              <p className="text-gray-600">
                Pack the item in its original packaging with all accessories
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-5 text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-10 h-10 text-blue-900" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Step 3</h3>
              <p className="text-gray-600">
                Ship it back to us or schedule a pickup, and we'll process your
                refund
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Return Conditions
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-6">
            <li>
              Items must be returned in their original condition and packaging
            </li>
            <li>All accessories, manuals, and free items must be included</li>
            <li>
              Products should be unused and without any signs of wear or damage
            </li>
            <li>Original proof of purchase is required</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Refund Process
          </h3>
          <p className="text-gray-700 mb-4">
            Once your return is received and inspected, we'll send you an email
            to notify you that we've received your returned item. We'll also
            notify you of the approval or rejection of your refund.
          </p>
          <p className="text-gray-700 mb-4">
            If approved, your refund will be processed, and a credit will
            automatically be applied to your original method of payment within
            5-7 business days.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-900 p-4 mt-6">
            <p className="text-sm text-gray-700">
              For any questions about returns or refunds, please contact our
              customer service team at{" "}
              <a
                href="mailto:support@techelectronics.com"
                className="text-blue-900 hover:underline"
              >
                support@techelectronics.com
              </a>{" "}
              or call{" "}
              <a
                href="tel:+919876543210"
                className="text-blue-900 hover:underline"
              >
                +91 98765 43210
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
