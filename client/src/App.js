import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./pages/Layout";
import Home from "./components/Home";
import Profile from "./components/Profile";
import { useAuth } from "./contexts/AuthContext";

function App() {

  const {currentUser} = useAuth();

  const ProtectedRoute = ({children}) => {
    if ( !currentUser ) {
      return <Navigate to="/login" />
    }
    return children;
  }

  return (
    <div style={{height:'100%'}} className="w-full overflow-scroll scrollbar overflow-x-hidden">
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
