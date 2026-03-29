import { HashRouter, Routes, Route } from 'react-router-dom';
import CrisisBar from './components/CrisisBar';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Resources from './pages/Resources';
import GetHelp from './pages/GetHelp';
import Breathe from './pages/Breathe';
import Tools from './pages/Tools';
import Fluffy from './pages/Fluffy';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col">
        <CrisisBar />
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/get-help" element={<GetHelp />} />
            <Route path="/breathe" element={<Breathe />} />
            <Route path="/tools" element={<Tools />} />
            <Route path="/fluffy" element={<Fluffy />} />
          </Routes>
        </main>
        <footer className="text-center py-6 text-sm text-gray-400 border-t border-purple-100 bg-white/50">
          <p>☁️ CloudCatcher — You're not alone.</p>
          <p className="mt-1">
            If you're in crisis, call or text{' '}
            <a href="tel:988" className="text-violet-600 font-semibold hover:underline">
              988
            </a>{' '}
            anytime.
          </p>
        </footer>
      </div>
    </HashRouter>
  );
}
