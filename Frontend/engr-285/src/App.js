import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import BottomBar from "./components/BottomBar";
import Home from "./components/Home";
import LoginPage from "./components/LoginPage";
import Profile from "./components/Profile";
import SignupPage from "./components/SignupPage";
import YourPosts from "./components/YourPosts";

function App() {
  const location = useLocation();

  const showBottomBar = /^(\/home|\/profile|\/yourPosts(\/|$))$/.test(
    location.pathname
  );

  return (
    <>
      {showBottomBar && <BottomBar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/yourPosts/*" element={<YourPosts />} />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
