"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ background: "#111", color: "white", minHeight: "100vh" }}>
      
      <button
        onClick={() => setOpen(!open)}
        style={{ margin: 20, fontSize: 24 }}
      >
        ☰
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 250,
            height: "100%",
            background: "#222",
            padding: 20
          }}
        >
          <p><Link href="/applications">Applications</Link></p>
          <p><Link href="/status">Data Category</Link></p>
          <p><Link href="/admin/login">Admin Panel</Link></p>
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: 200 }}>
        <h1>TEST MODE WORKING ✅</h1>
      </div>

    </div>
  );
}
