import LoginForm from "./LoginForm"

function page() {
    return (
        <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-green-50 to-yellow-50">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                {/* Floating orbs */}
                <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-[#7CBD1E]/20 to-[#F1F864]/20 rounded-full mix-blend-multiply filter blur-xl animate-bounce opacity-70"></div>
                <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-[#F1F864]/20 to-[#7CBD1E]/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse opacity-70 animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-40 w-80 h-80 bg-gradient-to-r from-[#7CBD1E]/15 to-blue-200/15 rounded-full mix-blend-multiply filter blur-xl animate-bounce opacity-60 animation-delay-4000"></div>
                
                {/* Grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(123,203,30,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(123,203,30,0.03)_1px,transparent_1px)] bg-[size:44px_44px]"></div>
            </div>

            <div className="relative z-10 flex justify-center items-center min-h-screen p-4">
                {/* Main login container */}
                <div className="w-full max-w-md">
                    {/* Glassmorphism card */}
                    <div className="backdrop-blur-xl bg-white/80 border border-white/20 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
                        {/* Card glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#7CBD1E]/10 via-transparent to-[#F1F864]/10 rounded-3xl"></div>
                        
                        {/* Logo/Icon area */}
                        <div className="relative z-10 text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#7CBD1E] to-[#F1F864] rounded-2xl mb-4 shadow-lg">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                                Welcome Back
                            </h1>
                            <p className="text-gray-600 text-sm">Sign in to your account to continue</p>
                        </div>

                        {/* Form container */}
                        <div className="relative z-10">
                            <LoginForm />
                        </div>

                        {/* Footer */}
                        <div className="relative z-10 mt-6 text-center">
                            <p className="text-xs text-gray-500">
                                Bunny Babies - Secure Admin Portal
                            </p>
                        </div>
                    </div>

                    {/* Additional decorative elements */}
                    <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-[#7CBD1E]/20 to-[#F1F864]/20 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-[#F1F864]/20 to-[#7CBD1E]/20 rounded-full blur-2xl"></div>
                </div>
            </div>
        </div>
    )
}

export default page
