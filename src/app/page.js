import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="glass-card p-12 max-w-2xl border border-white/10 bg-white/5 backdrop-blur-xl rounded-3xl">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-6">
          GRIND TEAM PORTAL
        </h1>
        <p className="text-slate-400 text-lg mb-8">
          The official recruitment hub for the Jujutsu Kaisen MMORPG. 
          Apply for Cursed Technique specialties, Clans, and Staff positions.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/applications" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all transform hover:scale-105">
            View Applications
          </Link>
          <Link href="/status" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition-all">
            Check Status
          </Link>
        </div>
      </div>
    </main>
  );
    }
