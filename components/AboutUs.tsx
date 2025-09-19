import Image from "next/image"
import Container from "./Container"

function AboutUs() {
    return (
        <div className="bg-gradient-to-br from-[#F1F864] via-yellow-100 to-orange-100 relative sm:pt-16 rounded-t-3xl overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute inset-0 z-0">
                {/* Floating shapes */}
                <div className="absolute top-20 left-20 w-16 h-16 bg-white/30 rounded-full animate-pulse"></div>
                <div className="absolute top-60 right-40 w-12 h-12 bg-[#7CBD1E]/20 rounded-full animate-bounce animation-delay-1000"></div>
                <div className="absolute bottom-40 left-40 w-20 h-20 bg-pink-200/40 rounded-full animate-pulse animation-delay-2000"></div>
                
                {/* Fun emoji patterns */}
                <div className="absolute top-32 right-20 text-4xl opacity-20 animate-bounce animation-delay-3000">🎈</div>
                <div className="absolute bottom-32 left-10 text-3xl opacity-20 animate-pulse">⭐</div>
                <div className="absolute top-1/2 left-1/4 text-2xl opacity-20 animate-bounce animation-delay-4000">🌈</div>
            </div>

            {/* Cloud decoration at top */}
            <div className="z-10 absolute -top-5 sm:-top-10 md:-top-16 lg:-top-20 w-full h-full overflow-hidden">
                <Image 
                    className="scale-150 sm:scale-100 opacity-80" 
                    layout="responsive" 
                    width={1200} 
                    height={100} 
                    src="/cloud.webp" 
                    alt="decorative clouds" 
                />
            </div>

            <Container className="sm:flex pt-16 pb-32 relative z-20">
                {/* Image section with enhanced styling */}
                <div className="flex-1 p-3 relative">
                    <div className="relative group">
                        {/* Glow effect */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-[#7CBD1E]/20 to-[#F1F864]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Image container */}
                        <div className="relative z-10 bg-white/60 backdrop-blur-sm rounded-3xl p-4 shadow-2xl border border-white/40 transform group-hover:scale-105 transition-all duration-500">
                            <Image 
                                layout="responsive" 
                                width={600} 
                                height={300} 
                                src="/Group 12.webp" 
                                alt="Happy children learning and playing" 
                                className="rounded-2xl"
                            />
                        </div>

                        {/* Decorative elements around image */}
                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] rounded-full flex items-center justify-center text-white text-xl animate-bounce">
                            🎨
                        </div>
                        <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg shadow-lg animate-pulse">
                            ❤️
                        </div>
                    </div>
                </div>

                {/* Content section */}
                <div className="flex-1 pl-3 text-center sm:text-left relative z-20">
                    {/* Section badge */}
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-[#7CBD1E] font-bold text-sm mb-6 shadow-md border border-white/50">
                        <span className="text-lg">🌟</span>
                        {" "}About Bunny Babies
                    </div>

                    {/* Main heading */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6 font-bold leading-tight">
                        <span className="block text-gray-800">Where Every</span>
                        <span className="block bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] bg-clip-text text-transparent">
                            Child Thrives
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="text-lg text-gray-700 mb-8 leading-relaxed font-medium">
                        At Bunny Babies, we create a magical world where children aged 6 months to 6 years discover, 
                        learn, and grow through play-based education. Our nurturing environment combines academic 
                        readiness with social-emotional development in a safe, loving atmosphere.
                    </p>

                    {/* Feature highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                        <div className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl shadow-md border border-white/50 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] rounded-xl flex items-center justify-center text-white text-lg">
                                    🎓
                                </div>
                                <h3 className="font-bold text-gray-800">Expert Care</h3>
                            </div>
                            <p className="text-sm text-gray-600">Licensed educators with years of early childhood experience</p>
                        </div>

                        <div className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl shadow-md border border-white/50 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-xl flex items-center justify-center text-white text-lg">
                                    🛡️
                                </div>
                                <h3 className="font-bold text-gray-800">Safe Environment</h3>
                            </div>
                            <p className="text-sm text-gray-600">Secure facilities with comprehensive safety protocols</p>
                        </div>

                        <div className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl shadow-md border border-white/50 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center text-white text-lg">
                                    🎨
                                </div>
                                <h3 className="font-bold text-gray-800">Creative Learning</h3>
                            </div>
                            <p className="text-sm text-gray-600">Art, music, and imaginative play integrated into daily activities</p>
                        </div>

                        <div className="bg-white/70 backdrop-blur-sm p-4 rounded-2xl shadow-md border border-white/50 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-xl flex items-center justify-center text-white text-lg">
                                    👨‍👩‍👧‍👦
                                </div>
                                <h3 className="font-bold text-gray-800">Family Partnership</h3>
                            </div>
                            <p className="text-sm text-gray-600">Regular communication and involvement in your child&apos;s journey</p>
                        </div>
                    </div>

                    {/* Call to action */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                            <span>📅</span>
                            {" "}Schedule a Visit
                        </button>
                        <button className="border-2 border-[#7CBD1E] text-[#7CBD1E] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#7CBD1E] hover:text-white transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
                            <span>📞</span>
                            {" "}Call Us Today
                        </button>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default AboutUs
