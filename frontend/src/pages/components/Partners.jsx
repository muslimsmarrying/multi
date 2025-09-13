import marqee1 from "../../assets/images/maquee1.svg";
import marqee2 from "../../assets/images/marqee2.svg";
import marqee3 from "../../assets/images/marqee3.png";
import marqee4 from "../../assets/images/marqee4.svg";
import marqee5 from "../../assets/images/marqee5.svg";
import marqee6 from "../../assets/images/marqee6.webp";
import marqee8 from "../../assets/images/marqee8.svg";

const Partners = () => {
  const partners = [
    {
      logo: marqee1,
    },
    {
      logo: marqee2,
    },
    {
      logo: marqee3,
    },
    {
      logo: marqee4,
    },
    {
      logo: marqee5,
    },
    {
      logo: marqee6,
    },
    {
      logo: marqee8,
    },
  ];

  return (
    <>
      <section className="bg-gray-800 py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Title */}
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              CureSleep Solutions is now{" "}
              <span className="text-green-500 bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent font-extrabold">
                in-network
              </span>
            </h2>
            <div className="w-24 h-1 bg-green-500 mx-auto rounded-full"></div>
          </div>

          {/* Marquee Container */}
          <div className="relative overflow-hidden bg-white/5 backdrop-blur-sm rounded-xl py-8 border border-white/10">
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-800 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-800 to-transparent z-10"></div>

            {/* Marquee */}
            <div className="marquee-container">
              <div className="marquee-content">
                {/* First set of logos */}
                {partners.map((partner, index) => (
                  <div key={`first-${index}`} className="marquee-item">
                    <div className="bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mx-4">
                      <img
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        className="h-12 w-auto object-contain mx-auto filter brightness-0 contrast-100"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    </div>
                  </div>
                ))}

                {/* Duplicate set for seamless loop */}
                {partners.map((partner, index) => (
                  <div key={`second-${index}`} className="marquee-item">
                    <div className="bg-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 mx-4">
                      <img
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        className="h-12 w-auto object-contain mx-auto filter brightness-0 contrast-100"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                      <div className="hidden items-center justify-center h-12 text-gray-800 font-bold text-sm">
                        {partner.name}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom text */}
          <p className="text-gray-300 mt-8 text-lg">
            Trusted by millions of patients nationwide
          </p>
        </div>
      </section>

      <style jsx>{`
        .marquee-container {
          width: 100%;
          overflow: hidden;
        }

        .marquee-content {
          display: flex;
          animation: marquee 30s linear infinite;
          width: calc(200% + 2rem);
        }

        .marquee-item {
          flex-shrink: 0;
          width: auto;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-content:hover {
          animation-play-state: paused;
        }

        @media (max-width: 768px) {
          .marquee-content {
            animation-duration: 20s;
          }
        }
      `}</style>
    </>
  );
};

export default Partners;
