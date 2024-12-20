import React from "react";

import Navbar from "components/Navbars/FormNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Default({ children }) {
  return (
    <>
      <Navbar transparent />
      <main className="results-page">
        <section className="relative block py-8">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
        </section>
        <section className="relative py-16 bg-opacity-50 bg-black">
          <div className="container mx-auto px-4 py-2">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg my-6">
              <div className="px-6">
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    Results Dashboard
                  </h3>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
