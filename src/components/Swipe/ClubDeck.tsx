import React, { useState } from "react";
import { useSprings } from "react-spring/hooks";
import { useGesture } from "react-with-gesture";
import { prependOnceListener } from "process";

import Card from "./ClubCard";
import data from "./testdata";
import { format } from "path";
import ClubCard from "./ClubCard";

// End position of the card
const to = i => ({
    x: 0,
    y: 0,
    scale: 1,
    delay: i * 100
});

// Starting position of the card
const from = i => ({scale: 1.5, y: -1000 });

// changes scale 
const trans = (r, s) =>
  `rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(${s})`;

function ClubDeck() {
    // like using this.gone but function doesn't have this.x
    // so we declaire a state variable
    // created a new set with gone
    const [gone] = useState(() => new Set());

    const [props, set] = useSprings(data.length, i => ({
        // data.length gets number of elements in array
        ...to(i),
        from: from(i)
    }));

    const bind = useGesture(
        // state
        ({
            args: [index],
            down,
            delta: [xDelta],
            distance,
            direction: [xDir],
            velocity
        }) => 
        // do something
        { 
            // trigger if velocity is greater than 0.2
            const trigger = velocity > 0.2;

            // if x direction is less than 0, return -1, else return 1
            const dir = xDir < 0? -1 : 1;

            // if "card picked up" and swiped right, add to gone set
            if (!down && trigger) {
                if ((xDir > 0)) {
                    //add to match
                }
                else {
                    // add to reject
                }
                gone.add(index);
            }

            set(i => {
                if (index !== i) return;

                // boolean checking if the card is gone or not
                const isGone = gone.has(index);

                const x = isGone ? (200 + window.innerWidth) * dir : xDelta: 0;

                const scale = down ? 1.1 : 1;

                return {
                    x,
                    scale,
                    delay: undefined,
                    config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500}
                    /* if down 
                        800
                        else {
                            if isGone
                                200
                            else
                                500*/
                    
                };
            });
            
            // Keep track of which way the person swipped
            if (!down && trigger) {
                console.log(xDir);
                console.log("Gone");
              }
        
            /*// if deck is all gone reset
            if (!down && gone.size == data.length) 
                setTimeout(() => gone.clear() || set(i => to(i)), 600)*/
        }
    );

    return props.map( ( { x, y, scale }, i) => (
        <ClubCard
            i={i}
            x={x}
            y={y}
            scale={scale}
            data={data}
            bind={bind}
        />
    ));
}

export default ClubDeck;