import { useState } from "react";
import Navbar from "./components/navbar";
import Login from "./pages/login";
import Register from "./pages/register";
import Music from "./pages/music";
// import Album from "./pages/album";
// import CreateAlbum from "./pages/createAlbum";
import UploadMusic from "./pages/uploadMusic";
import Logout from "./pages/logout";

const PAGES = {
  login: { label: "Login", component: Login },
  register: { label: "Register", component: Register },
  music: { label: "Music", component: Music },
  // album: { label: "Album", component: Album },
  // createAlbum: { label: "Create Album", component: CreateAlbum },
  uploadMusic: { label: "Upload Music", component: UploadMusic },
  logout: { label: "Logout", component: Logout },
};

export default function App() {
  const [userRole, setUserRole] = useState(localStorage.getItem("userRole") || "user");
  const [activePage, setActivePage] = useState("login");
  const ActivePageComponent = PAGES[activePage].component;

  const handleNavigate = (page) => {
    if (page === "uploadMusic" && userRole !== "artist") {
      setActivePage("music");
      return;
    }

    if (page === "logout") {
      setUserRole("user");
      localStorage.removeItem("userRole");
    }

    setActivePage(page);
  };

  const handleLoginSuccess = (role) => {
    setUserRole(role || "user");
    localStorage.setItem("userRole", role || "user");
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      <Navbar activePage={activePage} onNavigate={handleNavigate} userRole={userRole} />

      <main style={{ padding: 24 }}>
        <ActivePageComponent
          onNavigate={handleNavigate}
          onLoginSuccess={handleLoginSuccess}
        />
      </main>
    </div>
  );
}
