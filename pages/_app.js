import React from "react";
import { createRoot } from "react-dom/client";

import App from "next/app";
import Head from "next/head";

import StoreProvider from "store/StoreProvider";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "styles/tailwind.css";

if (typeof window !== 'undefined') {
  const rootSelector = document.getElementById("page-transition");
  createRoot(rootSelector);
}

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }
  render() {
    const { Component, pageProps } = this.props;
    const Layout = Component.layout || (({ children }) => <>{children}</>);

    return (
      <>
        <StoreProvider>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <title>Config Driven Development Example</title>
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </StoreProvider>
      </>
    );
  }
}
