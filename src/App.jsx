import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizzesPage from "./pages/QuizzesPage.jsx";
import QuizPage from "./pages/QuizPage.jsx";


function App() {
  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<QuizzesPage />} />
            <Route path="/quizzies" element={<QuizzesPage />} />
            <Route path="/quiz/:id" element={<QuizPage />} />
          </Routes>
        </BrowserRouter>

  );
}

export default App;
