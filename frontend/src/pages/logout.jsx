import { useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export default function Logout({ onNavigate }) {
  const [status, setStatus] = useState("Logging out...");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function doLogout() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/music/logout`, {
          method: "GET",
          credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Logout failed");
        }

        setStatus(data?.message || "Logged out successfully");
        localStorage.removeItem("userRole");

        setTimeout(() => {
          if (typeof onNavigate === "function") {
            onNavigate("login");
          }
        }, 800);
      } catch (err) {
        setStatus(null);
        setError(err.message || "Failed to logout");
      }
    }

    doLogout();
  }, [onNavigate]);

  return (
    <div style={{ maxWidth: 640, margin: "0 auto", padding: 24 }}>
      <h1>Logout</h1>
      {status && <p style={{ color: "green" }}>{status}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>{status ? "Redirecting to login..." : "Please try again."}</p>
    </div>
  );
}
