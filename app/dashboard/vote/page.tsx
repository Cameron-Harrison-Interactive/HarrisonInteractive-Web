import Image from 'next/image';
import Link from 'next/link';

export default function VotePage() {
  const voteSites = [
    { name: 'Minecraft Buzz', url: 'https://minecraft.buzz/server/21170' },
    { name: 'Minecraft-MP', url: 'https://minecraft-mp.com/server-s358424' },
    { name: 'Minecraft-Server-List', url: 'https://minecraft-server-list.com/server/520409/' },
    { name: 'MinecraftServers.org', url: 'https://minecraftservers.org/server/687860' },
    { name: 'PlanetMinecraft', url: 'https://www.planetminecraft.com/server/twin-flames-cobblemon/' },
  ];

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center p-6 text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/background3.jpg"
          alt="Background"
          fill
          className="object-cover opacity-30"
        />
      </div>

      {/* Main Content Card */}
      <div className="bg-[#0A192F]/80 border-2 border-[#00D2FF] p-8 md:p-12 rounded-lg max-w-2xl w-full backdrop-blur-sm shadow-[0_0_20px_rgba(0,210,255,0.3)]">
        
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-[#00D2FF] mb-4 uppercase tracking-widest">
            Support Twin Flames
          </h1>
          <p className="text-gray-300 text-lg">
            Vote daily to keep the fire burning and earn exclusive in-game keys!
          </p>
        </div>

        <div className="grid gap-4">
          {voteSites.map((site) => (
            <Link 
              key={site.name} 
              href={site.url} 
              target="_blank"
              className="group relative flex items-center justify-between p-4 bg-[#0A192F] border border-[#00D2FF] hover:bg-[#00D2FF] transition-all duration-300 rounded shadow-md hover:shadow-[0_0_15px_#00D2FF]"
            >
              <span className="text-xl font-semibold text-white group-hover:text-[#0A192F]">
                {site.name}
              </span>
              <span className="text-sm px-3 py-1 bg-[#00D2FF] text-[#0A192F] font-bold rounded group-hover:bg-white">
                VOTE
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center text-sm text-gray-400">
          <p>Links open in a new tab. Thank you for being part of the Twin Flames community!</p>
        </div>
      </div>
    </main>
  );
}