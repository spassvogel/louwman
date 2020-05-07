import React, { useRef, useEffect, useState } from 'react';
import { Sprite, Container } from '@inlet/react-pixi';
import Forklift, { Orientation } from './Forklift';
import { gsap, Linear } from 'gsap'

const BigRacks = (props: React.ComponentProps<typeof Container>) => {
  const forkliftRef = useRef<PIXI.Container>(null);
  const [forkliftOrientation, setForkliftOrientation] = useState<Orientation>(Orientation.southWest);
  const [forkliftLane, setForkliftLane] = useState<number>(1); // lane 1 is furthest away, lane 2 is closest by

  useEffect(() => {
    const tl = gsap.timeline({
      repeat: -1, 
      repeatDelay: 1
    });
    tl.to(forkliftRef.current, {
      onStart: () => { setForkliftOrientation(Orientation.southEast); setForkliftLane(1) },
      ease: Linear.easeNone,
      pixi: { 
        x: 1135,
        y: 148
      }, 
      duration: 5
    });
    tl.to(forkliftRef.current, {
      onStart: () => { setForkliftOrientation(Orientation.southWest); setForkliftLane(0)},
      ease: Linear.easeNone,
      pixi: { 
        x: 782,
        y: 330
      }, 
      duration: 3.5
    });
    tl.to(forkliftRef.current, {
      onStart: () => { setForkliftOrientation(Orientation.northWest); setForkliftLane(3)},
      ease: Linear.easeNone,
      pixi: { 
        x: 42,
        y: 130
      }, 
      duration: 5
    });
    tl.to(forkliftRef.current, {
      onStart: () => { setForkliftOrientation(Orientation.northEast); setForkliftLane(0)},
      ease: Linear.easeNone,
      pixi: { 
        x: 306,
        y: 58
      }, 
      duration: 2
    });
    tl.to(forkliftRef.current, {
      onStart: () => { setForkliftOrientation(Orientation.southEast); setForkliftLane(2)},
      ease: Linear.easeNone,
      pixi: { 
        x: 906,
        y: 241
      }, 
      duration: 4
    });
    tl.to(forkliftRef.current, {
      onStart: () => { setForkliftOrientation(Orientation.southWest); setForkliftLane(0)},
      ease: Linear.easeNone,
      pixi: { 
        x: 782,
        y: 330
      }, 
      duration: 2
    });
    tl.to(forkliftRef.current, {
      onStart: () => { setForkliftOrientation(Orientation.northWest); setForkliftLane(3)},
      ease: Linear.easeNone,
      pixi: { 
        x: 42,
        y: 130
      }, 
      duration: 5
    });
    console.log(forkliftRef.current?.zIndex);
  }, []);

  /** note, this z order stuff friggin blows */
  return (
    <Container {...props}>
      <Sprite image={`${process.env.PUBLIC_URL}/images/map/rack-big.png`} x={385} y={-172} />
      <Sprite image={`${process.env.PUBLIC_URL}/images/map/rack-big.png`} x={191} y={-84} />

      <Forklift orientation={forkliftOrientation} ref={forkliftRef} x={484} y={72} />
      { forkliftLane === 1 && <Sprite image={`${process.env.PUBLIC_URL}/images/map/rack-big.png`} x={385} y={-172} />}
      { forkliftLane > 0 && forkliftLane < 3 && <Sprite image={`${process.env.PUBLIC_URL}/images/map/rack-big.png`} x={191} y={-84} />}


      <Sprite image={`${process.env.PUBLIC_URL}/images/map/rack-big.png`} y={0} x={0} name="racks closest"/>
    </Container>
  );
}

export default BigRacks;