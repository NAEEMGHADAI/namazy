import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ContextProvider } from "./context/ContextProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PersistLogin from "./components/PersistLogin";
import Footer from "./components/Footer";

if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <section className="bg-main-dark-bg min-h-screen overflow-hidden">
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route element={<PersistLogin />}>
            <Route path="/*" element={<App />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
        <Footer />
      </ContextProvider>
    </BrowserRouter>
  </section>
);
