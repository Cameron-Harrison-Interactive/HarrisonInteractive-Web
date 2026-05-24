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
    <main className="min-h-screen relative flex flex-col items-center justify-center p-6 text-white overflow-hidden bg-[#0A192F]">
      {/* Background Layer */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/bgpicture1.png"
          alt="Twin Flames Background"
          fill
          priority
          className="object-cover opacity-20"
        />
      </div>

      {/* Main Container */}
      <div className="max-w-xl w-full flex flex-col items-center z-10">
        
        {/* Header/Logo Section (Using your Glow Pattern) */}
        <div className="relative w-48 h-48 mb-8 flex items-center justify-center group cursor-default">
           <div className="absolute inset-0 bg-[#00D2FF]/20 rounded-full blur-[40px] animate-pulse"></div>
           <Image 
             src="/background3.png" 
             alt="Twin Flames Logo" 
             width={150}
             height={150}
             className="relative z-10 drop-shadow-[0_0_20px_rgba(0,210,255,0.8)]"
           />
        </div>

        <h1 className="text-4xl font-bold text-white mb-8 tracking-tighter uppercase drop-shadow-md">
          Ignite the <span className="text-[#00D2FF]">Flame</span>
        </h1>

        {/* Voting Buttons */}
        <div className="w-full space-y-4">
          {voteSites.map((site) => (
            <Link 
              key={site.name} 
              href={site.url} 
              target="_blank"
              className="group relative flex items-center justify-center p-4 bg-[#0A192F]/60 border border-[#00D2FF]/50 rounded-lg backdrop-blur-md hover:bg-[#00D2FF]/10 transition-all duration-300 hover:border-[#00D2FF] shadow-lg"
            >
              {/* Button Glow Effect */}
              <div className="absolute inset-0 bg-[#00D2FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <span className="text-lg font-bold text-white group-hover:text-[#00D2FF] transition-colors duration-300">
                Vote on {site.name}
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-sm text-gray-500 font-mono">
          Twin Flames Network // Secured Node.
        </p>
      </div>
    </main>
  );
}