"use client"; // Required for Framer Motion with Next.js
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Lottie from "react-lottie";
import animationData from "@/data/bird-animation.json";
import { useWindowSize } from "react-use";
import { useRef, useState, useMemo, useEffect } from "react";

export default function Bird() {
    // Memoize the Lottie options to avoid recalculating on every render
    const defaultOptions = useMemo(
        () => ({
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: "xMidYMid slice",
            },
        }),
        [] // This will only run once when the component mounts
    );

    // Track scroll progress across the entire page
    const { scrollYProgress } = useScroll();

    // Track the window size to make the parallax responsive
    const { width } = useWindowSize();
    const maxXMovement = width * 0.8;

    // Horizontal movement: Bird moves from left to right in the second section and back in the third
    const birdX = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, maxXMovement, 0, maxXMovement]);

    // Vertical movement: Bird moves down as we scroll through the sections
    const birdY = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], [0, 500, 1000, 1500]);

    // Ref to store previous X position
    const prevXRef1 = useRef(0);
    const prevXRef2 = useRef(-1);

    // State to store the transformation style
    const [transformStyle, setTransformStyle] = useState('scaleX(1)');

    // Debounce or throttle the transformation change to prevent excessive updates
    useMotionValueEvent(birdX, "change", (x) => {
        if ((prevXRef2.current > prevXRef1.current && prevXRef1.current > x) || (prevXRef2.current < prevXRef1.current && prevXRef1.current < x)) {
            // Update previous X position
            prevXRef2.current = prevXRef1.current
            prevXRef1.current = x;
            return
        }
        const prevX = prevXRef1.current;

        if (x > prevX) {
            // Moving right
            setTransformStyle('scaleX(1)');
        } else if (x < prevX) {
            // Moving left
            setTransformStyle('scaleX(-1)');
        }

        // Update previous X position
        prevXRef2.current = prevXRef1.current
        prevXRef1.current = x;
    });

    return (

        < motion.div
            className="absolute z-40"
            style={{ x: birdX, y: birdY }
            } // Apply both horizontal and vertical scroll animation
        >
            <Lottie options={defaultOptions} style={{ scale: 1.5, transform: transformStyle }} height={100} width={100} />
        </motion.div >
    )
}
