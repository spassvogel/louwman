import React, { useState, useRef, useEffect, useMemo } from "react";
import { Viewport as PixiViewport } from "pixi-viewport";
import { AnyContent, IContent, TextContent, ContentType } from "../common/constants";
import sound from 'pixi-sound';
import Marker from "./pixi/Marker";
import { Stage, Sprite } from "@inlet/react-pixi";
import ContentModal from "./contentModal";
import Viewport from "./pixi/Viewport";
import * as PIXI from 'pixi.js';
import { PixiPlugin } from 'gsap/all';
import { gsap } from 'gsap'
import Conveyor from "./pixi/Conveyor";
import BigRacks from "./pixi/BigRacks";

PixiPlugin.registerPIXI(PIXI);
gsap.registerPlugin(PixiPlugin);

if (process.env.NODE_ENV === "development") {
  // @ts-ignore
  window.__PIXI_INSPECTOR_GLOBAL_HOOK__ && window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI });
}

interface Props {
  content: AnyContent[];
}

const items:{ [name:string]: IContent<TextContent> } = {
  forklift: {
    position: [2539, 868],
    type: ContentType.text,
    header: "Heftruck staat nog met de lepels omhoog",
    content: {
      image: "forklift-spoons-up.png",
      text: "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections",
    }
  },
  pool: {
    position: [1659, 1296],
    type: ContentType.text,
    header: "Plas met vloeistof op de vloer",
    content: {
      image: "pool.png",
      text: "The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. ",
    }
  }
}

const Main = (props: Props) => {
  const { content } = props;
  const viewportRef = useRef<PixiViewport>(null);
  const [selectedSituation, setSelectedSituation] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);

  const worldWidth = 5487;
  const worldHeight = 2707;
  //const scaleFactor = 1.86875; //scaled the original map up

  const [canvasWidth, setCanvasWidth] = useState(1200);
  const [canvasHeight, setCanvasHeight] = useState(600);

  useEffect(() => {
    // This will set the dimensions of the canvas to that of the window
    const resize = () => {
      const width = Math.min(window.innerWidth, window.outerWidth);
      const height = Math.min(window.innerHeight, window.outerHeight);
      setCanvasWidth(width);
      setCanvasHeight(height); 
    }
    resize();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    // Center the map
    if (viewportRef.current) {
      const viewport = viewportRef.current;
      viewport.moveCenter(worldWidth / 2, worldHeight / 2);  
      viewport.scale = new PIXI.Point(0.5, 0.5);
    }
  }, [canvasWidth, canvasHeight]);

  useEffect(() => {
    // Blur the map when situation is selected
    if (selectedSituation) {
      gsap.to(viewportRef.current, {duration: .5, pixi: {blur:20}});
    } else {
      gsap.to(viewportRef.current, {duration: .5, pixi: {blur:0}});
    }
  }, [selectedSituation]);

  // useEffect(() => {
  //   sound.add('plops', {
  //     url: `${process.env.PUBLIC_URL}/sound/plops.wav`,
  //     autoPlay: true,
  //   });    
  // }, []);

  const handleMarkerClick = (content: AnyContent, index: number) => {
    setSelectedSituation(index);
  }

  const handleClose = () => {
    setItem(null);
  }

  const handleCorrectAnswer = (answer: number) => {
    // gets called from within modal once the correct answer is selected
    const copy = [...answers];
    copy[selectedSituation!] = answer;

    setAnswers(copy);
  }

  const selectedContent = useMemo(() => {
    if (selectedSituation === null) {
      return null;
    }
    return content?.[selectedSituation];
  }, [content, selectedSituation]);
  
  const renderMarker = (contentItem: AnyContent, index: number) => {
    const delay = index * 0.5;
    const position = new PIXI.Point(contentItem.position[0], contentItem.position[1]);
    const bounce = !answers.hasOwnProperty(index);

    return (
      <Marker 
        position={position} 
        pointerdown={() => handleMarkerClick(contentItem, index)}
        delay={delay}
        bounce={bounce} 
      />
    ); 
  }

  const [item, setItem] = useState<string|null>(null);

  return (
    <>
      <Stage width={canvasWidth} height={canvasHeight} options={{transparent: true}} >
      <Viewport screenWidth={canvasWidth} screenHeight={canvasHeight} worldWidth={worldWidth} worldHeight={worldHeight} ref={viewportRef} >
        <Sprite image={`${process.env.PUBLIC_URL}/images/map/zalmweg.png`} >
          {Object.keys(items).map((i) => 
            <Sprite 
              image={`${process.env.PUBLIC_URL}/images/map/${items[i].content.image}`} 
              position={items[i].position} 
              key={i} 
              interactive 
              pointerdown={() => setItem(i)} 
            />
          )}
        </Sprite>
      </Viewport>
    </Stage>
    { item && (
      <ContentModal 
        content={items[item] as AnyContent} 
        onClose={handleClose} 
        setCorrectAnswer={handleCorrectAnswer}
        selectedAnswer={(answers[selectedSituation!])}
      /> 
    )}

    </>
  )
};

export default Main;