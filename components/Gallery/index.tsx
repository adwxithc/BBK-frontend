import React from 'react'
import Container from '../Container'
import Image from 'next/image'
import { EVENT_CATEGORIES } from '@/data/EventCategories'

function Gallery() {

    return (
        <div className='bg-primary/10 h-[100vh]'>
            <Container className='py-5'>
                <h2 className='text-2xl text-center font-medium mb-5'>Our Days</h2>
                <p className='text-center font-light'>have a glimps of  funtastic events coordinated my out teachers</p>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-5'>
                    {
                        EVENT_CATEGORIES.map((item, index) => (
                            <div key={item.id} className='bg-white rounded-lg shadow-md overflow-hidden'>
                                <Image src={item.image} height={50} width={100} alt={`Gallery Image ${item.name}`} className='w-full h-48 object-cover' />
                                <div className='p-3'>
                                    <h3 className='text-lg font-semibold'>Event {item.name}</h3>
                                    <p className='text-sm text-gray-600'>Description of event {item.description}.</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </Container>
        </div>
    )
}

export default Gallery
