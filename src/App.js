import { BrowserRouter, Route, Routes } from "react-router-dom";
import Post from "./components/Post";
import SingleProject from "./components/SingleProject.jsx";
import About from "./components/about";
import Home from "./components/home";
import NavBar from "./components/navbar";
import SinglePost from "./components/singlepost";
import ProjectsMasonry from "./components/projectsMasonry";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route element={<Home />} path="/" exact />
        <Route element={<About />} path="/about" />
        <Route element={<SinglePost />} path="/post/:slug" />
        <Route element={<SingleProject />} path="/project/:slug" />
        <Route element={<Post />} path="/post" />
        <Route element={<ProjectsMasonry />} path="/project" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
