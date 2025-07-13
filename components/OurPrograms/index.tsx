import Image from 'next/image'
import React from 'react'
import Container from '../Container'
import { p } from 'framer-motion/client'

function OurPrograms() {
  return (
    <div className='bg-background relative  pt-16 rounded-t-3xl pb-96'>

      <div className="z-10 absolute -top-5 sm:-top-10 md:-top-14 xl:-top-20 w-full">

        <Image layout="responsive" width={1200} height={100} src="/cloud.webp" alt="cloud" />
      </div>
      <Container>
        <h2 className='mb-10 text-xl font-semibold'>Our Programs</h2>
        <div className='flex flex-col sm:flex-row gap-5 px-2'>
          {
            [1, 2, 3].map((program, index) => (
              <div className="flex flex-1 flex-col p-2" key={index + 1}>
                <div className='mb-2'>
                  <Image src="/icons/kindergarten-icon.svg" width={30} height={30} alt="kindergarten" />
                </div>
                <h3 className='font-medium mb-1'>
                  Kindergarten
                </h3>
                <p className='text-sm text-primary font-light'>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae odit dolorum possimus est quae? Aliquid blanditiis dolor autem ea error, fugiat nostrum assumenda, consectetur totam est earum. Consequatur, repellendus magni.
                </p>
              </div>
            ))
          }

        </div>

      </Container>


    </div>
  )
}

export default OurPrograms
