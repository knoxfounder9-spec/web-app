"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">

      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-black opacity-40 animate-pulse" />

      {/* Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="absolute top-6 left-6 z-50"
      >
        <Menu size={32} />
      </button>

      {/* Sidebar */}
      {open && (
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="absolute left-0 top-0 h-full w-64 bg-gray-900 p-6 z-40 shadow-xl"
        >
          <div className="flex flex-col gap-6 mt-20 text-lg">
            <Link href="/applications" className="hover:text-purple-400">
              Applications
            </Link>

            <Link href="/status" className="hover:text-purple-400">
              Data Category
            </Link>

            <Link href="/admin/login" className="hover:text-red-400">
              Admin Panel
            </Link>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center h-screen relative z-10 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold"
        >
          Grind Team Portal 🚀
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-gray-300 max-w-lg text-lg"
        >
          Apply to join teams. Track your application status.
          Admins manage approvals securely.
        </motion.p>
      </div>

    </div>
  );
}
