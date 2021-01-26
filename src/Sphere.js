import React, { useState, useEffect, useRef } from 'react';
import { useSpring } from '@react-spring/core';
import { a } from "@react-spring/three";

const colors = [
    '#e45858',
    '#50c878',
    '#e5c900'
]


const Circle = ({ position }) => {
    const [colorIndex, setColor] = useState(0);
    const [active, setActive] = useState(0);
    const activeRef = useRef(active);
    const colorIndexRef = useRef(colorIndex);
    activeRef.current = active;
    colorIndexRef.current = colorIndex;

    useEffect(() => {
        let timeout
        const toggleActive = () => {
            timeout = setTimeout(() => {
                setActive(Number(!activeRef.current))
                toggleActive()
            }, Math.random() * 2000 + 1000)
        }
        toggleActive()
        return () => {
            clearTimeout(timeout)
        }
    }, [])

    useEffect( () => {
        let timeout;
        const toggleColor = () => {
            timeout = setTimeout(() => {
                const color = Number(colorIndexRef.current+1);
                setColor(color === colors.length ? 0 : color);
                toggleColor();
            }, Math.random() * 2000 + 1000);
        }
        toggleColor();
        return () => {
            clearTimeout(timeout);
        }
    }, [])

    const { spring } = useSpring({
        spring: active,
        config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 }
    })

    const scale = spring.to([0, 1], [1, 2])
    const rotation = spring.to([0, 1], [0, Math.PI])

    return (
        <a.mesh
            castShadow
            rotation-y={rotation}
            scale-x={scale}
            scale-y={scale}
            scale-z={scale}
            position={position}
        >
            <sphereGeometry attach="geometry" args={[1, 32, 32]} />
            <a.meshStandardMaterial roughness={0.5} attach="material" color={colors[colorIndex]} />
        </a.mesh>
    )
}

export default Circle;