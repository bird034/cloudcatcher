import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Resources from './pages/Resources'
import GetHelp from './pages/GetHelp'
import Breathe from './pages/Breathe'
import Tools from './pages/Tools'
import './App.css'

function App() {
  return (
    <div className="app">
      <header>
        <div className="crisis-bar">
          📞 Crisis? Call or text <strong>988</strong> — free, confidential, 24/7
        </div>
        <nav className="nav">
          <h1>CloudCatcher</h1>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/resources">Resources</Link></li>
            <li><Link to="/get-help">Get Help</Link></li>
            <li><Link to="/breathe">Breathe</Link></li>
            <li><Link to="/tools">Tools</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/get-help" element={<GetHelp />} />
          <Route path="/breathe" element={<Breathe />} />
          <Route path="/tools" element={<Tools />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
