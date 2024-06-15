import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import Feedback from "./pages/Feedback.jsx"; // Import the Feedback page

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
      <Route path="/feedback" element={<Feedback />} /> {/* Add the feedback route */}
      </Routes>
    </Router>
  );
}

export default App;
