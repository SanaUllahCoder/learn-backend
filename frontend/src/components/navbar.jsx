import React from "react";

const BASE_PAGES = [
  { key: "login", label: "Login" },
  { key: "register", label: "Register" },
  { key: "music", label: "Music" },
  { key: "logout", label: "Logout" },
];

const ARTIST_PAGES = [{ key: "uploadMusic", label: "Upload Music" }];

export default function Navbar({ activePage, onNavigate, userRole }) {
  const pages = userRole === "artist" ? [...BASE_PAGES.slice(0, 3), ...ARTIST_PAGES, BASE_PAGES[3]] : BASE_PAGES;

  return (
    <nav
      style={{
        display: "flex",
        gap: 12,
        padding: 12,
        borderBottom: "1px solid #ccc",
        background: "#fafafa",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {pages.map((item) => (
        <button
          key={item.key}
          type="button"
          onClick={() => onNavigate && onNavigate(item.key)}
          style={{
            cursor: "pointer",
            padding: "8px 12px",
            borderRadius: 5,
            border: "1px solid #888",
            background: item.key === activePage ? "#0366d6" : "#fff",
            color: item.key === activePage ? "#fff" : "#000",
            fontWeight: item.key === activePage ? 700 : 500,
          }}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}
