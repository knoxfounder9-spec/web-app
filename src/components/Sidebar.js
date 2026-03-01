import Link from 'next/link';
import { Home, ClipboardList, CheckCircle, Search } from 'lucide-react';

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 flex-col bg-white/5 border-r border-white/10 backdrop-blur-xl h-screen sticky top-0">
      <div className="p-6">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent tracking-tighter">
          GRIND PORTAL
        </h2>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        <Link href="/" className="flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition">
          <Home size={20} /> Home
        </Link>
        <Link href="/applications" className="flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition">
          <ClipboardList size={20} /> Open Forms
        </Link>
        <Link href="/status" className="flex items-center gap-3 p-3 rounded-lg text-gray-400 hover:bg-white/10 hover:text-white transition">
          <Search size={20} /> Check Status
        </Link>
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-500/20 text-xs text-blue-400">
          Logged in as Candidate
        </div>
      </div>
    </aside>
  );
    }
