import { useState } from "react";
import Login from "./pages/login";
import Register from "./pages/register";
import Music from "./pages/music";
import Album from "./pages/album";
import CreateAlbum from "./pages/createAlbum";
import UploadMusic from "./pages/uploadMusic";
import Logout from "./pages/logout";

const PAGES = {
  login: { label: "Login", component: Login },
  register: { label: "Register", component: Register },
  music: { label: "Music", component: Music },
  album: { label: "Album", component: Album },
  createAlbum: { label: "Create Album", component: CreateAlbum },
  uploadMusic: { label: "Upload Music", component: UploadMusic },
  logout: { label: "Logout", component: Logout },
};

export default function App() {
  const [activePage, setActivePage] = useState("login");
  const ActivePageComponent = PAGES[activePage].component;

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      <header style={{ padding: 16, borderBottom: "1px solid #ddd" }}>
        <nav style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {Object.entries(PAGES).map(([key, page]) => (
            <button
              key={key}
              type="button"
              onClick={() => setActivePage(key)}
              style={{
                padding: "8px 12px",
                border: "1px solid #ccc",
                borderRadius: 4,
                background: key === activePage ? "#007bff" : "white",
                color: key === activePage ? "white" : "black",
                cursor: "pointer",
              }}
            >
              {page.label}
            </button>
          ))}
        </nav>
      </header>

      <main style={{ padding: 24 }}>
        <ActivePageComponent />
      </main>
    </div>
  );
}
