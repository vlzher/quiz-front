import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "react-oidc-context";
import PrivateRoute from "./components/PrivateRoute.jsx";

const oidcConfig = {
    authority: "http://localhost:9080/realms/my-realm",
    client_id: "quiz-client",
    redirect_uri: "http://localhost:5173",
    onSigninCallback: () => {
        window.history.replaceState(
            {},
            document.title,
            window.location.pathname
        )
    }
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider {...oidcConfig}>
        <PrivateRoute>
    <App />
        </PrivateRoute>
    </AuthProvider>
);
