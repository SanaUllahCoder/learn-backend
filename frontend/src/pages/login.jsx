import { useState } from "react";

// Use Vite env vars for API base URL.
// If VITE_API_BASE_URL is unset, we fall back to a relative path so Vite's proxy can work.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export default function Login() {
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setStatus(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: form.identifier,
          email: form.identifier,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Login failed");
      }

      setStatus(data?.message || "Logged in successfully");
      setForm({ identifier: "", password: "" });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page" style={{ maxWidth: 400, margin: "0 auto", padding: 24 }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            name="identifier"
            value={form.identifier}
            onChange={handleChange}
            required
            autoComplete="username"
            style={{ width: "100%", padding: 8, marginTop: 4, marginBottom: 12 }}
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
            style={{ width: "100%", padding: 8, marginTop: 4, marginBottom: 12 }}
          />
        </label>

        <button
          type="submit"
          disabled={submitting}
          style={{ width: "100%", padding: 10, marginTop: 8 }}
        >
          {submitting ? "Logging in..." : "Login"}
        </button>
      </form>

      {status && <p style={{ marginTop: 16, color: "green" }}>{status}</p>}
      {error && <p style={{ marginTop: 16, color: "red" }}>{error}</p>}
    </div>
  );
}
