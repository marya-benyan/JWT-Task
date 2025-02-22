import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // التحقق مما إذا كان المستخدم مسجلاً الدخول عند تحميل الصفحة
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // تسجيل الخروج
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
      Cookies.remove("token");
      setIsAuthenticated(false);
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Authentication System</h1>

      {!isAuthenticated ? (
        <>
          <Link to="/signin">
            <button style={{ margin: "10px" }}>Sign In</button>
          </Link>
          <Link to="/signup">
            <button style={{ margin: "10px" }}>Sign Up</button>
          </Link>
        </>
      ) : (
        <>
          <Link to="/profile">
            <button style={{ margin: "10px" }}>Go to Profile</button>
          </Link>
          <button onClick={handleLogout} style={{ margin: "10px" }}>Logout</button>
        </>
      )}
    </div>
  );
}

export default App;
