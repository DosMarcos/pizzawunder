// This pages renders the Admin Dialog
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../../styles/Login.module.css";

// Function grabs username + password from .env.local file
// compares with your typed values
// If valid you're the admin otherwise not!
const Login = () => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
      await axios.post("https://pizzawunder.vercel.app/api/login", {
        username,
        password,
      });
      router.push("https://pizzawunder.vercel.app/admin");
    } catch (err) {
      setError(true);
    }
  };

  return (    
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Administrator Bereich</h1>
        <input
          placeholder="Benutzername"
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Passwort"
          type="password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClick} className={styles.button}>
          Einloggen
        </button>
        {error && <span className={styles.error}>Die Zugangsdaten sind nicht korrekt!</span>}
      </div>
    </div>
  );
};

export default Login;