import axios from "axios";
import { useEffect, useState } from "react";

function Profile() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/profile", { withCredentials: true })
            .then(res => setMessage(res.data.message))
            .catch(() => setMessage("Unauthorized"));
    }, []);

    return <h2>{message}</h2>;
}

export default Profile;
