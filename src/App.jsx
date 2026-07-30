import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Home          from "./pages/Home";
import Login         from "./pages/Login";
import Register      from "./pages/Register";
import Dashboard     from "./pages/Dashboard";
import LodgeGrievance from "./pages/LodgeGrievance";
import TrackGrievance from "./pages/TrackGrievance";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public */}
        <Route path="/"         element={<Home />} />
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected — requires login */}
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/lodge-grievance" element={
          <ProtectedRoute><LodgeGrievance /></ProtectedRoute>
        } />
        <Route path="/track" element={
          <ProtectedRoute><TrackGrievance /></ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App;