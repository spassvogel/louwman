import React, { useRef, useEffect, useState } from 'react';
import * as PIXI from 'pixi.js';
import { Stage, Sprite } from '@inlet/react-pixi';
import Viewport from './components/pixi/Viewport';
import { Viewport as PixiViewport } from "pixi-viewport";
import Marker from './components/pixi/Marker';
import { PixiPlugin } from 'gsap/all';
import { gsap } from 'gsap'
import './App.css';
import ParticleEmitter from './components/pixi/ParticleEmitter';
import smoke from './smoke.json';
import content from './content/parseContent';
import { AnyContent } from './common/constants';
import ContentModal from './components/contentModal';
import Main from './components/Main';
import IntroModal from './components/introModal/introModal';



function App() {


  // const handleChooseOption = (option: number) => {
  //   setsituationOrder([
  //     ...situationOrder,
  //     selectedSituation!
  //   ])
  // }

  /*useEffect(() => {
    // The forklift drives a square
    const forklift = forkliftRef!.current!;
    var tl = gsap.timeline({repeat: -1, repeatDelay: 1});
    tl.to(forklift, {
      pixi: { 
        x: 1143 * scaleFactor,
        y: 667 * scaleFactor
      }, 
      duration: 5
    });
    tl.to(forklift, {
      pixi: { 
        x: 1423 * scaleFactor,
        y: 545 * scaleFactor
      }, 
      duration: 2
    });
    tl.to(forklift, {
      pixi: { 
        x: 750 * scaleFactor,
        y: 347 * scaleFactor,
      }, 
      duration: 2
    });
    tl.to(forklift, {
      onStart: () => { forklift.scale = new PIXI.Point(-1, 1) },
      onComplete: () => { forklift.scale = new PIXI.Point(1, 1) },
      pixi: { 
        x: 477 * scaleFactor,
        y: 510 * scaleFactor
      }, 
      duration: 2
    });
  }, []);*/

  // const renderMarker = (situation: string, position: PIXI.Point, delay: number) => {
  //   if (situationOrder.some(s => s === situation)) {
  //     return null;
  //   }
  //   return <Marker position={position} pointerdown={() => handleMarkerClick(situation)} delay={delay} />
  // }

  const [intro, setIntro] = useState(true);

  return (
    <>
      { intro && (<IntroModal onClose={() => {setIntro(false)}} />)}
      { !intro && <Main content={content}/> }
    </>  
  )
};

export default App;

