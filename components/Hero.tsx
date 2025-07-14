import Image from "next/image"
import Container from "./Container"



function Hero() {
    return (
        <main className="w-full">
            <main className="bg-primary pt-28 sm:pt-36 ">
                <Container className=" flex sm:flex-row flex-col">
                    <div className="flex-1  text-white/90 text-center sm:text-left relative">

                        <Image className="opacity-40 absolute -top-5 -left-5 sm:static" width={50} height={50} src="/hero4.webp" alt="" />

                        <h1 className="text-4xl sm:text-5xl mb-3 max-w-lg ">Welcome to Bunny Babies</h1>
                        <p className="text-sm sm:text-base font-light  text-white/90 max-w-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, atque, eaque est quae quisquam itaque fugiat delectus officiis, veritatis sit earum ut harum eius! Beatae iste dicta pariatur obcaecati voluptatum.</p>
                    </div>
                    <div className="flex-1 p-5 sm:hidden flex justify-center items-center">
                        <Image width={500} height={500} src="/hero3.webp" alt="kids" className="w-100% h-100%" />
                    </div>
                    <div className="flex-1 grid-cols-2 gap-5 p-5 hidden sm:grid">
                        <div className=" ">
                            <Image className="ml-auto" width={300} height={300} src="/hero2.webp" alt="" />
                        </div>
                        <div className="">
                            <Image width={200} height={200} src="/hero3.webp" alt="" />
                        </div>
                        <div className="">
                            <Image className="ml-auto" width={150} height={150} src="/hero4.webp" alt="" />
                        </div>
                        <div className="">
                            <Image width={300} height={300} src="/hero1.webp" alt="" />
                        </div>



                    </div>
                </Container>

            </main>
            <div className="custom-shape-divider-top-1725787380 z-40 ">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="shape-fill"></path>
                    <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="shape-fill"></path>
                    <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="shape-fill"></path>
                </svg>
            </div>
            <div className="h-16 w-full bg-background">
            </div>

        </main>
    )
}

export default Hero
