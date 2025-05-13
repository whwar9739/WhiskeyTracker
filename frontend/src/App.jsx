import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import ProtectedRoute from './components/ProtectedRoute'

// Temporary Dashboard component - will be moved to its own file
function Dashboard() {
  return (
    <div className="dashboard-container">
      <h2>Your Whiskey Dashboard</h2>
      <p>This is a protected route that requires authentication.</p>
    </div>
  )
}

// Home component with navigation to auth pages
function Home() {
  return (
    <div className="home-container max-w-4xl mx-auto p-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Welcome to Whiskey Tracker</h2>
        <p className="text-xl mb-8">Track and manage your whiskey tasting experiences.</p>
        
        <div className="flex justify-center gap-4">
          <Link to="/login" className="px-6 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition">
            Sign In
          </Link>
          <Link to="/register" className="px-6 py-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition">
            Create Account
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Track Your Collection</h3>
          <p>Keep a detailed log of every whiskey in your collection, complete with tasting notes and ratings.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Discover New Favorites</h3>
          <p>Explore whiskeys based on flavor profiles, distilleries, and ratings from other enthusiasts.</p>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container min-h-screen bg-gray-50">
          <header className="app-header bg-amber-800 text-white p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold">Whiskey Tracker</Link>
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <Link to="/login" className="hover:text-amber-200 transition">Login</Link>
                  </li>
                  <li>
                    <Link to="/register" className="hover:text-amber-200 transition">Register</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          <main className="app-main container mx-auto p-4 flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              
              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                {/* Add more protected routes here */}
              </Route>
              
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <footer className="app-footer bg-gray-800 text-white p-4 mt-auto">
            <div className="container mx-auto text-center">
              <p>Whiskey Tracker &copy; {new Date().getFullYear()}</p>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App