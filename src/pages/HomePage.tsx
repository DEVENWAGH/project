import React, { useState, useEffect } from "react";
import { Layout } from "../components/layout/Layout";
import { ProductList } from "../components/product/ProductList";
import { getFeaturedProducts, getProducts } from "../data/products";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState(
    getFeaturedProducts()
  );
  const [newArrivals, setNewArrivals] = useState(getProducts().slice(0, 4));

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative text-white bg-blue-900">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Electronics Banner"
            className="object-cover w-full h-full opacity-20"
          />
        </div>
        <div className="container relative px-4 py-24 mx-auto md:py-32">
          <div className="max-w-xl">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              Next-Gen Electronics for Modern Living
            </h1>
            <p className="mb-8 text-lg">
              Discover the latest tech innovations with premium quality and
              unbeatable prices.
            </p>
            <div className="flex space-x-4">
              <Button size="lg">Shop Now</Button>
              <Button
                variant="outline"
                size="lg"
                className="text-white bg-transparent border-white hover:bg-white hover:text-blue-900"
              >
                Explore Deals
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Featured Products
              </h2>
              <p className="mt-2 text-gray-600">Handpicked for excellence</p>
            </div>
            <Link
              to="/featured"
              className="flex items-center font-medium text-blue-900 hover:text-blue-700"
            >
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <ProductList
            products={featuredProducts}
            featured={true}
            columns={2}
          />
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">New Arrivals</h2>
              <p className="mt-2 text-gray-600">The latest tech just for you</p>
            </div>
            <Link
              to="/new-arrivals"
              className="flex items-center font-medium text-blue-900 hover:text-blue-700"
            >
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <ProductList products={newArrivals} />
        </div>
      </section>

      {/* Promotion Banner */}
      <section className="py-12">
        <div className="container px-4 mx-auto">
          <div className="overflow-hidden bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl">
            <div className="flex flex-col items-center md:flex-row">
              <div className="p-8 md:p-12 md:w-1/2">
                <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                  Summer Sale Up To 50% Off
                </h2>
                <p className="text-blue-50">
                  Take advantage of our biggest sale of the season on premium
                  electronics
                </p>
              </div>
              <div className="md:w-1/2">
                <img
                  src="https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Sale"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="p-6 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-blue-900 bg-blue-100 rounded-full">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Fast Delivery
              </h3>
              <p className="text-gray-600">
                Get your products delivered within 24-48 hours
              </p>
            </div>

            <div className="p-6 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-blue-900 bg-blue-100 rounded-full">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                2 Year Warranty
              </h3>
              <p className="text-gray-600">
                All products come with a minimum 1-year warranty
              </p>
            </div>

            <div className="p-6 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-blue-900 bg-blue-100 rounded-full">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                Easy Returns
              </h3>
              <p className="text-gray-600">
                30-day hassle-free returns if you're not satisfied
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
