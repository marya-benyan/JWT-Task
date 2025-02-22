import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:5000/signin", { username, password }, { withCredentials: true });

            if (response.data.success) {
                setMessage("Login successful! Redirecting...");
                setTimeout(() => navigate("/profile"), 2000);
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            setMessage("Login failed. Please check your credentials.");
        }
    };

    return (
        <div>
            <h2>Sign In</h2>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default SignIn;
