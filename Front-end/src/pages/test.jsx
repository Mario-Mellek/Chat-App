import React, { useRef, useEffect, useState } from "react";

function Test() {
    const trailRefs = useRef([]);
    const lastMousePosition = useRef({ x: 0, y: 0 });
    const rAFIndex = useRef(0);
    const [isMoving, setIsMoving] = useState(false);

    function registerMousePosition({ clientX, clientY }) {
        lastMousePosition.current.x = clientX;
        lastMousePosition.current.y = clientY;
    }

    function startMove() {
        setIsMoving(true);
    }

    function drawCircles() {
        const img = '😀';

        for (let i = 0; i < 20; i++) {
            trailRefs.current.push(React.createRef());
        }

        return [...Array(20)].map((item, index) => {
            const ease = index * 0.04;
            return (
                <div key={index}
                    style={{ position: "absolute", transition: `transform ${ease}s` }}
                    ref={trailRefs.current[index]}
                >
                    {img}
                </div>
            );
        });
    }

    function updateCollectedLettersPosition() {
        for (let i = 0; i < 20; i++) {
            const xpos = lastMousePosition.current.x;
            const ypos = lastMousePosition.current.y;
            trailRefs.current[i].current.style.transform = `translate(${xpos}px, ${ypos}px)`;
        }
    }

    useEffect(() => {
        function update() {
            if (isMoving) {
                rAFIndex.current = requestAnimationFrame(update);
            }
            updateCollectedLettersPosition();
        }

        // cancel the existing rAF
        cancelAnimationFrame(rAFIndex.current);

        document.addEventListener("mousemove", startMove);
        document.addEventListener("mousemove", registerMousePosition);
        rAFIndex.current = requestAnimationFrame(update);

        return () => {
            document.removeEventListener("mousemove", registerMousePosition);
            document.removeEventListener("mousemove", startMove);
        };
    }, [isMoving]);

    return (
        <>
            <div className="App">
                <div>Move the Mouse</div>
                <div>{drawCircles()}</div>

            </div>
        </>
    )
}

export default Test