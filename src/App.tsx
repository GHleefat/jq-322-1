import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SetupPage from "@/pages/SetupPage";
import ResultPage from "@/pages/ResultPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SetupPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}
