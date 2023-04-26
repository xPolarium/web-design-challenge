import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ErrorBoundary } from "react-error-boundary";

const ErrorFallback = ({ error }: { error: { message: string } }) => {
  return (
    <div className="absolute top-0 h-full w-full bg-red-200">
      {error.message}
    </div>
  );
};

const MyApp: AppType = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default api.withTRPC(MyApp);
