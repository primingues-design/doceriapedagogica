"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("doceria_cookie_consent");
    if (!consent) {
      setTimeout(() => setVisible(true), 1000);
    }
  }, []);

  function accept() {
    localStorage.setItem("doceria_cookie_consent", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("doceria_cookie_consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 2rem)",
        maxWidth: "680px",
        background: "#1C1917",
        color: "#FAFAF9",
        borderRadius: "14px",
        padding: "1.25rem 1.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1rem",
        zIndex: 9999,
        boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        flexWrap: "wrap",
      }}
    >
      <div style={{ flex: 1, minWidth: "200px" }}>
        <p style={{ fontSize: "14px", lineHeight: "1.6", margin: 0, color: "#E7E5E4" }}>
          🍪 Usamos cookies para melhorar sua experiência e analisar o uso da plataforma.{" "}
          <a
            href="/politica-de-privacidade"
            style={{ color: "#FB923C", textDecoration: "underline" }}
          >
            Saiba mais
          </a>
          .
        </p>
      </div>

      <div style={{ display: "flex", gap: "10px", flexShrink: 0 }}>
        <button
          onClick={decline}
          style={{
            background: "transparent",
            border: "1px solid #57534E",
            color: "#A8A29E",
            borderRadius: "8px",
            padding: "8px 16px",
            fontSize: "13px",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Recusar
        </button>
        <button
          onClick={accept}
          style={{
            background: "#F97316",
            border: "none",
            color: "white",
            borderRadius: "8px",
            padding: "8px 20px",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
