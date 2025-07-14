"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Container from "@/components/Container";
import { MoveLeft } from "lucide-react";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

export default function EventGalleryPage() {
    const onInit = () => {
        console.log("lightGallery has been initialized");
    };
    const { categoryName } = useParams();
    const router = useRouter();

    const images = [
        "/pics.jpg",
        "/pics.jpg",
        "/pics.jpg",
        "/pics.jpg",
        "/pics.jpg",
    ];

    return (
        <Container>
            {/* Header Section */}
            <div className="flex justify-between items-center pt-14">
                <div>
                    <h1 className="text-4xl font-semibold text-primary mb-4">
                        Independence Day
                    </h1>
                    <p className="font-light text-black/70">
                        Explore the vibrant celebrations of Independence Day with our
                        gallery showcasing the joy and patriotism of this special occasion.
                    </p>
                </div>
                <button
                    onClick={() => router.push('/')}
                    className="px-3 py-1.5 bg-primary rounded-full inline-flex gap-1 text-white"
                >
                    <MoveLeft /> <span>Back</span>
                </button>
            </div>

            {/* Gallery Section */}
            <div className="mt-8">
                <LightGallery
                    onInit={onInit}
                    speed={500}
                    plugins={[lgThumbnail, lgZoom]}
                    elementClassNames="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                >
                    {images.map((src, index) => (
                        <a href={src} key={index}>
                            <img
                                src={src}
                                alt={`Gallery Image ${index + 1}`}
                                className="w-full h-48 object-cover rounded-lg hover:scale-105 transition"
                            />
                        </a>
                    ))}
                </LightGallery>
            </div>
        </Container>
    );
}
