import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

// Pages
import Landing from './pages/Landing'
import CreateCommunity from './pages/CreateCommunity'
import JoinCommunity from './pages/JoinCommunity'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/create-community" element={<CreateCommunity />} />
          <Route path="/join-community" element={<JoinCommunity />} />
          <Route path="/community/:communityId/*" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
