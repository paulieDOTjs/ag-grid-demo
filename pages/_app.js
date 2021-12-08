import "../styles/globals.css";

import CoreDataProvider from "../lib/context/CoreDataProvider";

function MyApp({ Component, pageProps }) {
  return (
    <CoreDataProvider>
      <Component {...pageProps} />
    </CoreDataProvider>
  );
}

export default MyApp;
