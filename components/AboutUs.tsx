import Image from "next/image"
import Container from "./Container"

function AboutUs() {
    return (
        <div className="bg-secondary relative  pt-14 rounded-t-3xl" >
            <div className="z-10 absolute -top-5 sm:-top-10 md:-top-16 lg:-top-20 w-full">

                <Image layout="responsive" width={1200} height={100} src="/cloud.webp" alt="cloud" />
            </div>
            <Container className="flex pt-10 pb-96">
                <div className="flex-1">
                    <h3 className="mb-1">About Us</h3>
                    <h1 className="text-3xl mb-3">Some Heading for the about section</h1>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum deserunt ad dolor illum recusandae assumenda id. Quidem, repellendus labore tempora voluptate architecto impedit, sequi doloremque, in tenetur ut ducimus hic!</p>
                </div>
                <div className="flex-1">

                </div>

            </Container>
        </div>
    )
}

export default AboutUs
