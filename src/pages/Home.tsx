import React from 'react';

const Home = () => {
  return (
  <>
    <div style={{ minHeight: '100vh', background: '#262525' }}>
      {/* Navigation */}
      <nav className="bg-[#0d1117] backdrop-blur-[100px] border-b-[3px] border-[#2b2a2a] py-4 rounded-none">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center px-8">
          
          {/* Logo */}
          <div className="text-[50px] items-center gap-20 text-white">
            CRYPTeX
          </div>

          {/* Navigation Items */}
          <ul className="flex list-none gap-2 m-0 p-0">
            {['Home Page', 'Portfolio', 'Trading', 'Contribute', 'Settings'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
className="text-[#b0b0b0] no-underline py-3 px-6 rounded-lg transition-all duration-300 ease-in-out block hover:text-white hover:bg-white/10 hover:translate-y-0.5 focus:text-white focus:bg-white/10 focus:translate-y-0.5"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      </div>

      {/* Home Page */}
      <div className=''> 
            <h1>Meet Lumen — Your Gateway to the Decentralized Web</h1>
            <p>Effortlessly manage your Ethereum and Solana assets, NFTs
              and dApps — all in one sleek wallet. Fast. Secure. Non-custodial.</p>
            <button>Download Extension</button>
            <button>Get Mobile App</button>

      </div>
  </>         
  );
};

export default Home;