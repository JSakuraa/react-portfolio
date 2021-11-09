import { BrowserRouter, Route, Switch } from "react-router-dom";
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
      <Switch>
        <Route component={Home} path='/' exact/>
        <Route component={About} path='/about' />
        <Route component={SinglePost} path='/post/:slug' />
        <Route component={SingleProject} path='/project/:slug' />
        <Route component={Post} path='/post' />
        <Route component={Project} path='/project' />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
