'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticProps {
    children: React.ReactElement;
    range?: number;
}

export default function Magnetic({ children, range = 20 }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;
        const boundingRect = ref.current?.getBoundingClientRect();
        if (boundingRect) {
            const { width, height, left, top } = boundingRect;
            const x = (clientX - (left + width / 2)) * (range / 100);
            const y = (clientY - (top + height / 2)) * (range / 100);
            setPosition({ x, y });
        }
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
            style={{ display: 'inline-flex', position: 'relative' }}
        >
            {children}
        </motion.div>
    );
}
