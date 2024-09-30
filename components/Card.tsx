import { IFeature } from "@/data/features"
import Image from "next/image"

function Card({feature}:{feature:IFeature}) {
  return (
    <div className="border-primary group border-2 rounded-md hover:bg-primary/80 aspect-square w-60 bg-secondary/30 p-3">
        <Image className="mx-auto mb-2" height={50} width={50}  src={feature.image} alt={feature.title} />
        <h2 className="text-primary text-center group-hover:text-background mb-2">{feature.title}</h2>
        <p className="text-primary text-sm text-center group-hover:text-background">{feature.body}</p>
    </div>
  )
}

export default Card
