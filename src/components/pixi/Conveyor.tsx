import React, { useRef, useEffect, useState } from 'react';
import { Sprite, Container, useApp } from '@inlet/react-pixi';
import * as PIXI from 'pixi.js';
import { gsap, Linear } from 'gsap'

const boxImagePath = `${process.env.PUBLIC_URL}/images/map/conveyor-box.png`;

const Conveyor = (props: React.ComponentProps<typeof Container>) => {
  const boxContainerRef = useRef<PIXI.Container>(null);
  const [boxTexture, setBoxTexture] = useState<PIXI.Texture>();
  const app = useApp();

  useEffect(() => {
    if (!app.loader.resources[boxImagePath]) {
      app.loader.add(boxImagePath)
      .load((_, rss) => {
        setBoxTexture(rss[boxImagePath]!.texture);
      })
    } else {
      setBoxTexture(app.loader.resources[boxImagePath]!.texture);
    }
  }, [app]);

  useEffect(() => {
    if (!boxTexture) return;

    const spawnBox = (delay: number) => {
      const sprite = new PIXI.Sprite(boxTexture);
      boxContainerRef.current?.addChild(sprite);
      sprite.x = 568;
      sprite.y = 160;

      const tl = gsap.timeline({
        delay,
        repeat: -1, 
        repeatDelay: 1
      });
      tl.to(sprite, {
        ease: Linear.easeNone,
        pixi: { 
          x: 956,
          y: 256
        }, 
        duration: 5
      });
      tl.to(sprite, {
        ease: Linear.easeNone,
        pixi: { 
          x: 959,
          y: 278
        }, 
        duration: .5
      });
      tl.to(sprite, {
        ease: Linear.easeNone,
        pixi: { 
          x: 541,
          y: 473
        }, 
        duration: 6
      });
      tl.to(sprite, {
        delay: 1,
        ease: Linear.easeNone,
        pixi: { 
          alpha: 0
        }, 
        duration: 1
      });

      // const duration = 3;
      // gsap.to(sprite, { 
      //   duration,
      //   ease: Linear.easeNone,
      //   pixi: { 
      //     //visible: false,
      //     x: boxMovePath[1][0], 
      //     y: boxMovePath[1][1],
      //   }
      // });
    }

    spawnBox(0);
    spawnBox(3);
    spawnBox(5.5);
    spawnBox(7);
    spawnBox(9.5);
  }, [boxTexture]);

  return (
    <Container {...props}>
      <Sprite image={`${process.env.PUBLIC_URL}/images/map/rack-small.png`} />
      <Sprite image={`${process.env.PUBLIC_URL}/images/map/conveyor-right.png`} x={87} y={152} />
      <Sprite image={`${process.env.PUBLIC_URL}/images/map/rack-small.png`} x={160} y={39} />
      <Sprite image={`${process.env.PUBLIC_URL}/images/map/conveyor-right.png`} x={251} y={192} />
      
      <Sprite image={`${process.env.PUBLIC_URL}/images/map/conveyor-left.png`} x={520} y={234} />
      <Container ref={boxContainerRef}>

      </Container>
      {/* <Sprite image={`${process.env.PUBLIC_URL}/images/map/conveyor-box.png`} x={568} y={160} name="box1" />
      <Sprite image={`${process.env.PUBLIC_URL}/images/map/conveyor-box.png`} x={956} y={267} name="box2" /> */}
      
      <Sprite image={`${process.env.PUBLIC_URL}/images/map/rack-small.png`} x={320} y={78} />
      
      {/* 956,267 */}
    </Container>
  );
}

export default Conveyor;