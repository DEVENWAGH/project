import React from "react";
import { Layout } from "../components/layout/Layout";

export const AboutPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">About Us</h1>

        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <p className="text-gray-700 mb-4">
            TechElectronics was founded in 2015 with a simple but powerful
            mission: to provide high-quality, innovative electronic products at
            competitive prices with exceptional customer service.
          </p>

          <p className="text-gray-700 mb-4">
            What began as a small online store has grown into one of India's
            most trusted destinations for electronics and tech accessories. Our
            carefully curated selection includes the latest smartphones,
            laptops, audio equipment, and smart home devices from leading global
            brands.
          </p>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Our Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-blue-900 mb-2">
                Quality First
              </h3>
              <p className="text-gray-600">
                We rigorously test and verify all products before they reach our
                customers.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-blue-900 mb-2">
                Customer Satisfaction
              </h3>
              <p className="text-gray-600">
                Your satisfaction is our top priority, backed by our hassle-free
                return policy.
              </p>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-blue-900 mb-2">
                Innovation
              </h3>
              <p className="text-gray-600">
                We're always on the lookout for the latest technology to bring
                to our customers.
              </p>
            </div>
          </div>

          <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Our Team
          </h2>
          <p className="text-gray-700 mb-4">
            Our team consists of tech enthusiasts, industry experts, and
            customer service professionals who are passionate about technology
            and committed to providing you with the best shopping experience
            possible.
          </p>
        </div>
      </div>
    </Layout>
  );
};
