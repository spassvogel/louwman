import React from "react";
import { PixiComponent, applyDefaultProps, Container, useApp, Sprite } from "@inlet/react-pixi";
import * as PIXI  from 'pixi.js';


export enum Orientation {
  northEast,
  southEast,
  southWest,
  northWest,
}

interface Props  {
    orientation: Orientation;
};

const Forklift = React.forwardRef<PIXI.Container, any>((props: Props & React.ComponentProps<typeof Container>, ref) => {
  return (
    <Container {...props} ref={ref}>
      { props.orientation === Orientation.northEast && <Sprite image={`${process.env.PUBLIC_URL}/images/map/forklift-up.png`}  anchor={[0.5, 0]}/>}
      { props.orientation === Orientation.southEast && <Sprite image={`${process.env.PUBLIC_URL}/images/map/forklift-down.png`} anchor={[0.5, 0]} />}
      { props.orientation === Orientation.southWest && <Sprite image={`${process.env.PUBLIC_URL}/images/map/forklift-down.png`} scale={[-1, 1]} anchor={[0.5, 0]}/>}
      { props.orientation === Orientation.northWest && <Sprite image={`${process.env.PUBLIC_URL}/images/map/forklift-up.png`} scale={[-1, 1]} anchor={[0.5, 0]}/>}
    </Container>
  )
});

export default Forklift;