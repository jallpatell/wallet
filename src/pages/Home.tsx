import React from 'react';

const Home = () => {
  return (
  <>
    <div style={{ minHeight: '100vh', background: '#262525' }}>
      {/* Navigation */}
      <nav style={{
        background: '	#0d1117',
        backdropFilter: 'blur(100px)',
        borderBottom: '3px solid #2b2a2a',
        padding: '1rem 0',
        borderRadius: "0px"
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 2rem'
        }}>
          
          {/* Logo */}
          <div style={{
            fontSize: "50px",
            alignItems: 'center',
            gap: '5rem',
            color: 'white',
          }}>
            CRYPTeX
          </div>

          {/* Navigation Items */}
          <ul style={{
            display: 'flex',
            listStyle: 'none',
            gap: '0.5rem',
            margin: 0,
            padding: 0
          }}>
            {['Dashboard', 'Portfolio', 'Trading', 'Staking', 'Settings'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  style={{
                    color: '#b0b0b0',
                    textDecoration: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease',
                    display: 'block'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = 'white';
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';

                    e.target.style.transform = 'translateY(2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#b0b0b0';
                    e.target.style.background = 'transparent';
                    e.target.style.boxShadow = 'none';
                    e.target.style.transform = 'translateY(0)';
                  }}
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
      <div style={{
        fontFamily: "monospace",
        color: "white"
      }}>
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