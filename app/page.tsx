"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#1a1a1a,#000)",
        color: "white",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          background: "none",
          border: "none",
          color: "white",
          cursor: "pointer",
          zIndex: 100,
        }}
      >
        <Menu size={32} />
      </button>

      {/* Sidebar */}
      {open && (
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "250px",
            height: "100%",
            background: "#111",
            padding: "40px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            zIndex: 50,
          }}
        >
          <Link href="/applications">Applications</Link>
          <Link href="/status">Data Category</Link>
          <Link href="/admin/login">Admin Panel</Link>
        </motion.div>
      )}

      {/* Main Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontSize: "40px", fontWeight: "bold" }}
        >
          Grind Team Portal 🚀
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ marginTop: "15px", color: "gray" }}
        >
          Apply. Track. Get Accepted.
        </motion.p>
      </div>
    </div>
  );
}
