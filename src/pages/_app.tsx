import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import ErrorBoundary from "~/components/ErrorBoundary";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
};

export default api.withTRPC(MyApp);
