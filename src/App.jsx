import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PollsPage from "./pages/PollsPage.jsx";
import PollPage from "./pages/PollPage.jsx";


function App() {

  return (

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PollsPage />} />
            <Route path="/polls" element={<PollsPage />} />
            <Route path="/poll/:id" element={<PollPage />} />
          </Routes>
        </BrowserRouter>

  );
}

export default App;
