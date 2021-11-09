import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/home';
import About from './components/about';
import SinglePost from './components/singlepost';
import Post from './components/Post';
import Project from './components/Project';
import SingleProject from './components/SingleProject';
import NavBar from './components/navbar';

function App() {
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route element={<Home/>} path='/' exact/>
        <Route element={<About/>} path='/about' />
        <Route element={<SinglePost/>} path='/post/:slug' />
        <Route element={<SingleProject/>} path='/project/:slug' />
        <Route element={<Post/>} path='/post' />
        <Route element={<Project/>} path='/project' />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
