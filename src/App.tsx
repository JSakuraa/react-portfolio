import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home, About, Blog, BlogPost, Projects, Project, Studio } from './pages'
import { NavBar } from './components'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/studio/*" element={<Studio />} />
        <Route
          path="*"
          element={
            <>
              <NavBar />
              <Routes>
                <Route element={<Home />} path="/" />
                <Route element={<About />} path="/about" />
                <Route element={<BlogPost />} path="/post/:slug" />
                <Route element={<Project />} path="/project/:slug" />
                <Route element={<Blog />} path="/post" />
                <Route element={<Projects />} path="/project" />
              </Routes>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
