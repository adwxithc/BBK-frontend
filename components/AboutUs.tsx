import Image from "next/image"
import Container from "./Container"

function AboutUs() {
    return (
        <div className="bg-secondary relative  pt-16 rounded-t-3xl " >
            <div className="z-10 absolute -top-5 sm:-top-10 md:-top-16 lg:-top-20 w-full">

                <Image layout="responsive" width={1200} height={100} src="/cloud.webp" alt="cloud" />
            </div>
            <Container className="flex pt-10 pb-32">
                <div className="flex-1 p-3">
                    <Image layout="responsive" width={600} height={300} src="/Group 12.webp" alt="kids" />
                </div>
                <div className="flex-1 pl-3">
                    <h3 className="mb-1">About Us</h3>
                    <h1 className="text-3xl mb-3">Some Heading for the about section</h1>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum deserunt ad dolor illum recusandae assumenda id. Quidem, repellendus labore tempora voluptate architecto impedit, sequi doloremque, in tenetur ut ducimus hic!
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat nisi officiis corporis quibusdam aut reiciendis rerum similique, ea a hic, accusantium deserunt delectus veniam quos! Reprehenderit reiciendis facilis sint repudiandae.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias asperiores eos quasi vitae illum, consequatur natus veritatis fuga optio laudantium debitis nam quas illo. Sapiente aliquam nostrum ullam quis amet?
                    </p>
                </div>


            </Container>
        </div>
    )
}

export default AboutUs
