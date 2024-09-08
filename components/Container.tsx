import { cn } from "@/utils/style-utils"
import React from "react";

const Container = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return <section className={cn("container  w-[85vw] mx-auto px-4 py-2", className)}>{children}</section>;
};

export default Container;