
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ABeeZee } from "next/font/google";

const abeezee = ABeeZee({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <main className={abeezee.className}>
        <Component {...pageProps} />
      </main>
    </Provider>
  );
}
