import React from "react";
import { useDrag } from "react-dnd";

const ItemTypes = {
  SPRITE: "sprite",
};

export default function Sprite({ id, image, x, y }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.SPRITE,
    item: { id, x, y },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [x, y]);

  return (
    <img
      ref={drag}
      src={image}
      alt="sprite"
      className="absolute w-20 h-20 object-contain"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        position: "absolute",
      }} 
    />
  );
}