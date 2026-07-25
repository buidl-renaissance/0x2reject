import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { StyleSheetManager } from "styled-components";
import { UserProvider } from "@/contexts/UserContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StyleSheetManager shouldForwardProp={(prop) => !prop.startsWith("$")}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </StyleSheetManager>
  );
}
