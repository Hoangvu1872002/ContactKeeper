import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./layouts/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AuthSate from "./contexts/AuthContext/AuthState";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import Modal from "./components/Modal/Modal";
import ProfileForm from "./components/ProfileForm/ProfileForm";


const App = () => {
  return (
    <AuthSate>
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<PrivateRoute Component = {HomePage} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Register" element={<RegisterPage />} />
          <Route path="/profileForm" element={<PrivateRoute Component = {ProfileForm} />} />
        </Routes>
        
      </div>
    </Router>
    </AuthSate>
  );
};

export default App;
