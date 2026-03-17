import { useState } from "react";

// Use Vite env vars for API base URL.
// If VITE_API_BASE_URL is unset, we fall back to a relative path so Vite's proxy can work.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export default function Register({ onNavigate }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
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
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.message || "Registration failed");
      }
      setStatus(data?.message || "Registered successfully");
      localStorage.setItem("registeredRole", form.role);
      setForm({ username: "", email: "", password: "", role: "user" });
      if (onNavigate) {
        setTimeout(() => onNavigate("login"), 1200);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="register-page" style={{ maxWidth: 400, margin: "0 auto", padding: 24 }}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            autoComplete="username"
            style={{ width: "100%", padding: 8, marginTop: 4, marginBottom: 12 }}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="email"
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
            autoComplete="new-password"
            style={{ width: "100%", padding: 8, marginTop: 4, marginBottom: 12 }}
          />
        </label>
        <label>
          Role
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            style={{ width: "100%", padding: 8, marginTop: 4, marginBottom: 12 }}
          >
            <option value="user">User</option>
            <option value="artist">Artist</option>
          </select>
        </label>
        <button
          type="submit"
          disabled={submitting}
          style={{ width: "100%", padding: 10, marginTop: 8 }}
        >
          {submitting ? "Registering..." : "Register"}
        </button>
      </form>
      {status && <p style={{ marginTop: 16, color: "green" }}>{status}</p>}
      {error && <p style={{ marginTop: 16, color: "red" }}>{error}</p>}
    </div>
  );
}
