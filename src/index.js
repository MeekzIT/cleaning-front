import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import i18nextBrowserLanguageDetector from "i18next-browser-languagedetector";
import i18nextHttpBackend from "i18next-http-backend";
import { Provider } from "react-redux";
import { store } from "./store";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

i18n
  .use(initReactI18next)
  .use(i18nextBrowserLanguageDetector)
  .use(i18nextHttpBackend)
  .init({
    supportedLngs: ["en", "am", "ru"],
    fallbackLng: "am",
    detection: {
      order: ["cookie"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/locales/{{lng}}/translation.json",
    },
  });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Provider>
  </BrowserRouter>
);
