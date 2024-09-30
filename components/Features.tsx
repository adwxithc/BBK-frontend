import Image from "next/image"
import Container from "./Container"
import {features} from "@/data/features"
import Card from "./Card"
function Features() {
    return (
        <div className="bg-background relative  pt-16 rounded-t-3xl">
            <div className="z-10 absolute -top-5 sm:-top-10 md:-top-16 lg:-top-20 w-full">

                <Image layout="responsive" width={1200} height={100} src="/cloud.webp" alt="cloud" />
            </div>
            <Container className="pt-10 pb-36">
                <h1 className="max-w-80 text-center text-primary text-xl mb-5 mx-auto ">Providing Good Qualities For Your Loving Kids</h1>
                <ul className="flex justify-center flex-wrap gap-3">
                    {
                        features.map(f=>(
                            <Card key={f.title} feature={f} />
                        ))
                    }
                </ul>
                <div className="h-96 w-full">
                    
                </div>
            </Container>
        </div>
    )
}

export default Features
