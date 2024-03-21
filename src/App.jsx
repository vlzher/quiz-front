import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Registration from "./pages/Registration.jsx";
import Login from "./pages/Login.jsx";
import PollsPage from "./pages/PollsPage.jsx";
import { TOKEN_CONST } from "./api/api.js";
import PollPage from "./pages/PollPage.jsx";
function App() {
  const token = localStorage.getItem(TOKEN_CONST);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <PollsPage /> : <Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/polls" element={<PollsPage />} />
        <Route path="/poll/:id" element={<PollPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
