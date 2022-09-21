
import React from "react";
import { Sprite, Stage } from "@inlet/react-pixi";
import { useIteration } from "@hooks";

export const RollingCookie = () => {
  const i = useIteration(0.1);
  return (
    <Stage
      raf={false}
      renderOnComponentChange={true}
      options={{ antialias: true, backgroundAlpha: 0, resizeTo: window }}
    >
      <Sprite
        anchor={[-(2 + Math.sin(i / 5) * 2), 0.5]}
        position={250}
        rotation={(Math.PI / 180) * 90 + -i}
        image={"images/cookie1.png"}
        width={50}
        height={50}
      />
    </Stage>
  );
};