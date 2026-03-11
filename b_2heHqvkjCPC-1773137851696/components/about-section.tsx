"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

const fallingObjects = [
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/E38CEA8D-FC2C-4D10-AF84-8EFB4F73ADAD-Photoroom-w9nzR3ZuMOE06PGhdrBYmrby1K4fIc.png", left: "5%", delay: 0, size: 180 },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/BA16B0A8-7EEA-4C9F-9CC7-AA9414FDAD54-Photoroom-EK0U9FXFBPM2J59RKPFVf1qsDHEWcp.png", left: "22%", delay: 0.4, size: 150 },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/D3A3ECFC-57B0-4671-908A-994625476304-Photoroom-UCoLaLAizfOweKG1NNcrj7dTfHf44p.png", left: "82%", delay: 0.8, size: 190 },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8003375B-4B5F-4171-8AC0-98ECFDAD849F-Photoroom-P6UCHfLUcl3oZoGYYTEgJoQ4KoARdf.png", left: "65%", delay: 1.2, size: 170 },
  { src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8258F740-097D-4B7A-845E-D1E1EE9E0D11-Photoroom-FhZgwwUTfsXvstGHzTivlhvafxTYSB.png", left: "42%", delay: 1.6, size: 160 },
]

// Small objects to display above each phrase (not reviews)
const phraseObjects = {
  subtitle: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/E38CEA8D-FC2C-4D10-AF84-8EFB4F73ADAD-Photoroom-w9nzR3ZuMOE06PGhdrBYmrby1K4fIc.png",
  phrase1: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8003375B-4B5F-4171-8AC0-98ECFDAD849F-Photoroom-P6UCHfLUcl3oZoGYYTEgJoQ4KoARdf.png",
  phrase2: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/D3A3ECFC-57B0-4671-908A-994625476304-Photoroom-UCoLaLAizfOweKG1NNcrj7dTfHf44p.png",
}

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      
      const rect = sectionRef.current.getBoundingClientRect()
      const sectionHeight = sectionRef.current.offsetHeight
      const windowHeight = window.innerHeight
      
      const scrolled = windowHeight - rect.top
      const totalScrollable = sectionHeight
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable))
      
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // 6 phases for 6 elements
  // Phase 1: 0-0.15 = Image
  // Phase 2: 0.15-0.3 = Title
  // Phase 3: 0.3-0.42 = Subtitle
  // Phase 4: 0.42-0.55 = First phrase
  // Phase 5: 0.55-0.68 = Second phrase
  // Phase 6: 0.68-1 = Reviews

  const getElementState = (startPhase: number, endPhase: number) => {
    if (scrollProgress < startPhase) {
      return { opacity: 0, y: 30 }
    } else if (scrollProgress < endPhase) {
      const phaseProgress = (scrollProgress - startPhase) / (endPhase - startPhase)
      return { 
        opacity: Math.min(1, phaseProgress * 2), 
        y: Math.max(0, 30 - phaseProgress * 30) 
      }
    } else {
      const fadeProgress = (scrollProgress - endPhase) / 0.12
      return { 
        opacity: Math.max(0, 1 - fadeProgress), 
        y: 0 
      }
    }
  }

  const image = getElementState(0, 0.15)
  const title = getElementState(0.15, 0.3)
  const subtitle = getElementState(0.3, 0.42)
  const phrase1 = getElementState(0.42, 0.55)
  const phrase2 = getElementState(0.55, 0.68)
  const reviews = getElementState(0.68, 1)

  // Calculate falling objects visibility (start when phrase1 appears - "viatgem per mercats")
  const showFallingObjects = scrollProgress >= 0.4

  const reviewsData = [
    { name: "Maria L.", text: "Un tresor amagat a Gracia. Cada visita es una sorpresa." },
    { name: "Jordi P.", text: "Peces uniques amb molta personalitat. Encantador." },
    { name: "Anna R.", text: "La millor botiga vintage de Barcelona, sens dubte." },
  ]

  return (
    <section 
      ref={sectionRef}
      className="relative bg-background"
      style={{ height: "400vh" }}
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Falling objects */}
        {showFallingObjects && fallingObjects.map((obj, index) => (
          <div
            key={index}
            className="absolute pointer-events-none z-10 fall-object"
            style={{
              left: obj.left,
              animationDelay: `${obj.delay}s`,
              top: "-200px",
            }}
          >
            <Image
              src={obj.src}
              alt="Vintage lamp"
              width={obj.size}
              height={obj.size}
              className="object-contain w-[100px] md:w-auto h-auto"
            />
          </div>
        ))}
        
        <style jsx>{`
          .fall-object {
            animation: fall 3s ease-in-out forwards;
          }
          @media (max-width: 768px) {
            .fall-object {
              animation: fall 4.5s ease-in-out forwards;
            }
          }
        `}</style>

        {/* CSS for falling animation - slower on mobile for more grace */}
        <style jsx global>{`
          @keyframes fall {
            0% {
              transform: translateY(0) rotate(-5deg);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            30% {
              transform: translateY(25vh) rotate(3deg);
              opacity: 1;
            }
            60% {
              transform: translateY(55vh) rotate(-3deg);
              opacity: 0.9;
            }
            85% {
              transform: translateY(90vh) rotate(8deg);
              opacity: 0.5;
            }
            100% {
              transform: translateY(120vh) rotate(12deg);
              opacity: 0;
            }
          }
          
          @media (max-width: 768px) {
            @keyframes fall {
              0% {
                transform: translateY(0) rotate(-3deg);
                opacity: 0;
              }
              8% {
                opacity: 1;
              }
              25% {
                transform: translateY(20vh) rotate(2deg);
                opacity: 1;
              }
              50% {
                transform: translateY(45vh) rotate(-2deg);
                opacity: 0.95;
              }
              75% {
                transform: translateY(75vh) rotate(4deg);
                opacity: 0.7;
              }
              100% {
                transform: translateY(120vh) rotate(8deg);
                opacity: 0;
              }
            }
          }
        `}</style>

        {/* Image - centered, not full screen */}
        <div 
          className="absolute inset-0 flex items-center justify-center px-8"
          style={{ 
            opacity: image.opacity,
            transform: `translateY(${image.y}px)`
          }}
        >
          <div className="relative w-full max-w-3xl h-[60vh] overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jIk23db8ZYVSJQDmutqrlPq0m5L2GJ.jpg"
              alt="Interior de Mignon"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 900px"
              priority
            />
          </div>
        </div>

        {/* Title */}
        <div 
          className="absolute inset-0 flex items-center justify-center px-6"
          style={{ 
            opacity: title.opacity,
            transform: `translateY(${title.y}px)`
          }}
        >
          <div className="text-center">
            <span className="text-[10px] font-medium uppercase tracking-[0.4em] text-foreground/40 block mb-4">
              El colmado
            </span>
            <h2 className="font-serif italic text-[clamp(2.2rem,6vw,4rem)] text-foreground tracking-[-0.02em] leading-[1.05]">
              On cada objecte<br />te historia
            </h2>
          </div>
        </div>

        {/* Subtitle */}
        <div 
          className="absolute inset-0 flex items-center justify-center px-6"
          style={{ 
            opacity: subtitle.opacity,
            transform: `translateY(${subtitle.y}px)`
          }}
        >
          <div className="flex flex-col items-center">
            <Image
              src={phraseObjects.subtitle}
              alt="Decorative lamp"
              width={50}
              height={50}
              className="object-contain mb-4 w-[40px] md:w-[50px] h-auto"
            />
            <p className="font-serif italic text-[clamp(1.2rem,3vw,1.8rem)] text-foreground/70 text-center max-w-2xl leading-[1.6]">
              Un petit colmado al cor de Gracia
            </p>
          </div>
        </div>

        {/* First phrase */}
        <div 
          className="absolute inset-0 flex items-center justify-center px-6"
          style={{ 
            opacity: phrase1.opacity,
            transform: `translateY(${phrase1.y}px)`
          }}
        >
          <div className="flex flex-col items-center">
            <Image
              src={phraseObjects.phrase1}
              alt="Decorative lamp"
              width={50}
              height={50}
              className="object-contain mb-4 w-[40px] md:w-[50px] h-auto"
            />
            <p className="font-serif italic text-[15px] md:text-[17px] text-foreground/60 text-center max-w-lg leading-[1.9]">
              Viatgem per mercats i antiquaris d&apos;Europa buscant peces amb anima que mereixen una nova vida.
            </p>
          </div>
        </div>

        {/* Second phrase */}
        <div 
          className="absolute inset-0 flex items-center justify-center px-6"
          style={{ 
            opacity: phrase2.opacity,
            transform: `translateY(${phrase2.y}px)`
          }}
        >
          <div className="flex flex-col items-center">
            <Image
              src={phraseObjects.phrase2}
              alt="Decorative lamp"
              width={50}
              height={50}
              className="object-contain mb-4 w-[40px] md:w-[50px] h-auto"
            />
            <p className="font-serif italic text-[15px] md:text-[17px] text-foreground/60 text-center max-w-lg leading-[1.9]">
              Creiem en la bellesa de l&apos;imperfecte i en donar una segona oportunitat als objectes que encara tenen molt per oferir.
            </p>
          </div>
        </div>

        {/* Reviews */}
        <div 
          className="absolute inset-0 flex items-center justify-center px-6"
          style={{ 
            opacity: reviews.opacity,
            transform: `translateY(${reviews.y}px)`
          }}
        >
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 max-w-4xl">
            {reviewsData.map((review, index) => (
              <div key={index} className="text-center flex-1">
                <div className="flex justify-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 text-[#b3dfe0]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="font-serif italic text-[14px] md:text-[15px] text-foreground/60 mb-3 leading-[1.7]">
                  &ldquo;{review.text}&rdquo;
                </p>
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/40">
                  {review.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
