import React from "react";

// components

import Navbar from "components/Navbars/FormNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Form({ children }) {
  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
          ></div>
          <div className="container mx-auto px-4 h-full">
            {children}
          </div>
          <Footer />
        </section>
      </main>
    </>
  );
}
