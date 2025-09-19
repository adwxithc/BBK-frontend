import Image from "next/image"
import Container from "./Container"

function Hero() {
    return (
        <main className="w-full relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 z-0">
                {/* Floating shapes */}
                <div className="absolute top-20 left-10 w-16 h-16 bg-yellow-300/30 rounded-full animate-bounce animation-delay-1000"></div>
                <div className="absolute top-40 right-20 w-12 h-12 bg-pink-300/30 rounded-full animate-bounce animation-delay-2000"></div>
                <div className="absolute bottom-40 left-20 w-20 h-20 bg-blue-300/30 rounded-full animate-bounce animation-delay-3000"></div>
                <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-purple-300/30 rounded-full animate-pulse"></div>
                
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-10 left-1/4 text-6xl">🎈</div>
                    <div className="absolute top-1/3 right-1/3 text-5xl">⭐</div>
                    <div className="absolute bottom-1/3 left-1/3 text-4xl">🌈</div>
                    <div className="absolute top-20 right-20 text-3xl">🎨</div>
                    <div className="absolute bottom-20 left-10 text-5xl">🧸</div>
                </div>
            </div>
            
            <main className="bg-gradient-to-br from-[#7CBD1E] via-[#8BC727] to-[#F1F864] pt-28 sm:pt-36 relative z-10">
                <Container className="flex sm:flex-row flex-col items-center min-h-[80vh]">
                    <div className="flex-1 text-white text-center sm:text-left relative z-20">
                        {/* Fun decorative element */}
                        <div className="inline-block mb-4 relative">
                            <div className="absolute -top-2 -left-2 w-8 h-8 bg-yellow-300 rounded-full animate-ping"></div>
                            <Image 
                                className="relative z-10 drop-shadow-lg" 
                                width={60} 
                                height={60} 
                                src="/hero4.webp" 
                                alt="Bunny mascot" 
                                priority
                                sizes="60px"
                            />
                        </div>

                        <h1 className="text-4xl sm:text-6xl lg:text-7xl mb-6 max-w-2xl font-bold leading-tight">
                            <span className="block text-white drop-shadow-md">Welcome to</span>
                            <span className="block bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent drop-shadow-lg">
                                Bunny Babies
                            </span>
                        </h1>
                        
                        <p className="text-lg sm:text-xl font-medium text-white/95 max-w-xl mb-8 leading-relaxed drop-shadow-sm">
                            Where little hearts learn, grow, and discover the magic of childhood in a safe, nurturing environment filled with joy and wonder.
                        </p>

                        {/* Call-to-action buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <button className="bg-white text-[#7CBD1E] px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-100 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                                🌟 Enroll Today
                            </button>
                            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-[#7CBD1E] transform hover:scale-105 transition-all duration-300">
                                📅 Schedule Tour
                            </button>
                        </div>

                        {/* Trust indicators */}
                        <div className="flex flex-wrap items-center gap-6 text-white/90">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">🏆</span>
                                <span className="text-sm font-medium">Licensed & Certified</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">❤️</span>
                                <span className="text-sm font-medium">10+ Years Experience</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">👨‍👩‍👧‍👦</span>
                                <span className="text-sm font-medium">Happy Families</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Mobile image */}
                    <div className="flex-1 p-5 sm:hidden flex justify-center items-center mt-8">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-white/20 rounded-full blur-xl"></div>
                            <Image 
                                width={350} 
                                height={350} 
                                src="/hero3.webp" 
                                alt="Happy children" 
                                className="relative z-10 rounded-full shadow-2xl border-4 border-white/30" 
                                priority
                                sizes="(max-width: 640px) 350px, 0px"
                            />
                        </div>
                    </div>
                    
                    {/* Desktop image grid */}
                    <div className="flex-1 grid-cols-2 gap-6 p-5 hidden sm:grid relative">
                        <div className="relative group">
                            <div className="absolute -inset-2 bg-gradient-to-r from-yellow-300/50 to-orange-300/50 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <Image 
                                className="relative z-10 ml-auto rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105" 
                                width={280} 
                                height={280} 
                                src="/hero2.webp" 
                                alt="Children learning" 
                                priority
                                sizes="(min-width: 640px) 280px, 0px"
                            />
                        </div>
                        <div className="relative group">
                            <div className="absolute -inset-2 bg-gradient-to-r from-pink-300/50 to-purple-300/50 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <Image 
                                className="relative z-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105" 
                                width={200} 
                                height={200} 
                                src="/hero3.webp" 
                                alt="Happy kids" 
                                loading="lazy"
                                sizes="(min-width: 640px) 200px, 0px"
                            />
                        </div>
                        <div className="relative group">
                            <div className="absolute -inset-2 bg-gradient-to-r from-blue-300/50 to-green-300/50 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <Image 
                                className="relative z-10 ml-auto rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105" 
                                width={150} 
                                height={150} 
                                src="/hero4.webp" 
                                alt="Bunny mascot" 
                                loading="lazy"
                                sizes="(min-width: 640px) 150px, 0px"
                            />
                        </div>
                        <div className="relative group">
                            <div className="absolute -inset-2 bg-gradient-to-r from-green-300/50 to-yellow-300/50 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <Image 
                                className="relative z-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105" 
                                width={280} 
                                height={280} 
                                src="/hero1.webp" 
                                alt="Playful activities" 
                                loading="lazy"
                                sizes="(min-width: 640px) 280px, 0px"
                            />
                        </div>
                    </div>
                </Container>
            </main>
            
            {/* Enhanced wave divider */}
            <div className="custom-shape-divider-top-1725787380 z-40 relative">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
                </svg>
            </div>
            
            <div className="h-16 w-full bg-gradient-to-r from-orange-50 to-yellow-50 relative">
                {/* Floating elements in the transition area */}
                <div className="absolute top-2 left-1/4 text-2xl animate-bounce animation-delay-1000">🎨</div>
                <div className="absolute top-4 right-1/3 text-xl animate-bounce animation-delay-2000">📚</div>
                <div className="absolute top-1 right-1/4 text-lg animate-bounce animation-delay-3000">🌟</div>
            </div>
        </main>
    )
}

export default Hero
