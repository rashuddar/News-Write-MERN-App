import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import "./App.css"
import News from "./components/news/News";
import TopHeadlines from "./components/leftnav/TopHeadlines"
import CountryNews from "./components/leftnav/CountryNews"


function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/top-headlines/:category" element={<TopHeadlines />} />
        <Route path="/country/:iso" element={<CountryNews />} />
        <Route path="/register" element={user ? <Home/> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/write" element={user ? <Write /> : <Register/>} />
        <Route path="/settings" element={user ? <Settings /> : <Register />} />
        <Route path="/post/:postId" element={<Single />} />
      </Routes>
    </Router>
  );
}

export default App;