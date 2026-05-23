'use client';
import { useEffect, useState } from 'react';
import { Star, Code, ExternalLink } from 'lucide-react';

export default function PortfolioPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('portfolioData');
    if (saved) setData(JSON.parse(saved));
  }, []);

  if (!data) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black pb-12">
      <div className="max-w-4xl mx-auto px-6 pt-12">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
          <img src={data.avatar} alt={data.name} className="w-28 h-28 rounded-full border-4 border-purple-500" />
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-white">{data.name}</h1>
            <p className="text-purple-200 mt-2">{data.bio}</p>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 mb-8">
          <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
            <Code className="w-5 h-5 text-purple-400" /> Why I Want to Contribute
          </h2>
          <p className="text-gray-300 whitespace-pre-line leading-relaxed">{data.pitch}</p>
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">Featured Repos</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {data.repos.map((r: any, i: number) => (
            <a key={i} href="#" className="bg-white/5 p-4 rounded-lg border border-white/10 hover:bg-white/10 transition">
              <h3 className="text-white font-semibold flex items-center gap-2">
                {r.name} <ExternalLink className="w-4 h-4 text-gray-400" />
              </h3>
              <p className="text-gray-400 text-sm mt-1">{r.desc}</p>
              <div className="flex items-center gap-3 mt-3 text-xs text-gray-500">
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500"></div>{r.lang}</span>
                <span className="flex items-center gap-1"><Star className="w-3 h-3" />{r.stars}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}