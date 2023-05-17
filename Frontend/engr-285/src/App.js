import { Route, Routes } from "react-router-dom";
import BottomBar from "./components/BottomBar";
import Home from "./components/Home";
import Profile from "./components/Profile";
import YourPosts from "./components/YourPosts";

function App() {
  return (
    <>
      <BottomBar></BottomBar>
      <Routes>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/yourPosts" element={<YourPosts></YourPosts>}></Route>
      </Routes>
    </>
  );
}

export default App;
