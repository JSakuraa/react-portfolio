import { BrowserRouter, Route, Routes } from "react-router-dom";
import Post from "./components/Post";
import SingleProject from "./components/SingleProject.jsx";
import About from "./components/about";
import Home from "./components/home";
import NavBar from "./components/navbar";
import SinglePost from "./components/singlepost";
import ProjectsMasonry from "./components/projectsMasonry";
import StudioPage from "./components/Studio";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/studio/*" element={<StudioPage />} />
        <Route
          path="*"
          element={
            <>
              <NavBar />
              <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<About />} path="/about" />
                <Route element={<SinglePost />} path="/post/:slug" />
                <Route element={<SingleProject />} path="/project/:slug" />
                <Route element={<Post />} path="/post" />
                <Route element={<ProjectsMasonry />} path="/project" />
              </Routes>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
