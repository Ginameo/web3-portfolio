'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Loader2 } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    githubUsername: '',
    targetProject: '',
    skills: 'Solidity, TypeScript, React'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('portfolioData', JSON.stringify(data.data));
        router.push(`/portfolio/${form.githubUsername}`);
      } else {
        alert('Failed to generate portfolio');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to generate portfolio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black p-6 flex items-center justify-center">
      <div className="max-w-lg w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          <Sparkles className="inline w-8 h-8 mr-2 text-yellow-400" />
          Web3 Portfolio Generator
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="GitHub Username (e.g., Ginameo)"
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
            value={form.githubUsername}
            onChange={e => setForm({ ...form, githubUsername: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Target Project (e.g., Axelar)"
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
            value={form.targetProject}
            onChange={e => setForm({ ...form, targetProject: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Skills (e.g., Solidity, TypeScript)"
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
            value={form.skills}
            onChange={e => setForm({ ...form, skills: e.target.value })}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-3 rounded-lg hover:opacity-90 transition flex items-center justify-center disabled:opacity-50"
          >
            {loading ? <><Loader2 className="animate-spin mr-2" /> Generating...</> : <>Generate Portfolio</>}
          </button>
        </form>
        <p className="text-center text-gray-400 text-xs mt-4">Automated Web3 Portfolio Generator</p>
      </div>
    </main>
  );
}