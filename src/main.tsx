import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import FirebaseWrapper from "./components/authentication/FirebaseAuthWrapper.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FirebaseWrapper>
      <App />
    </FirebaseWrapper>
  </StrictMode>
);
