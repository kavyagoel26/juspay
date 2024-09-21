import React from "react";
import { CatSprite } from "./CatSprite";
import Sprite from "./Sprite";
import { useDrop } from "react-dnd";

const ItemTypes = {
    SPRITE: "sprite",
  };

export const PreviewArea = ({ position = {x:0 , y:0}, rotation, onMove ,sprites,onUpdatePosition}) => {

    const[,drop] = useDrop(()=>({
        accept: ItemTypes.SPRITE,
        drop: (item, monitor) => {
          const delta = monitor.getDifferenceFromInitialOffset();
          const x = Math.round(item.x + delta.x);
          const y = Math.round(item.y + delta.y);
          onUpdatePosition(item.id, x, y); // Update position
        },
    }))
  return (
    <div ref={drop} className="flex flex-col items-center h-full w-full">
      <div className="relative w-full h-3/4 bg-gray-200 flex items-center justify-center">
        <CatSprite position={position} rotation={rotation} onMove={onMove} />
        {sprites.map((sprite) => (
            <Sprite
            key={sprite.id}
            id = {sprite.id}
            image={sprite.image}
            position={{x:sprite.x, y:sprite.y}}
            rotation={sprite.rotation}
            onMove={onUpdatePosition}
            />
        ))}
        
      </div>

      {/* Input Boxes for Coordinates */}
      <div className="flex flex-row space-x-4 mt-4">
        <div>
          <label>X:</label>
          <input
            type="number"
            value={position.x}
            readOnly
            className="border border-gray-400 p-1"
          />
        </div>
        <div>
          <label>Y:</label>
          <input
            type="number"
            value={position.y}
            readOnly
            className="border border-gray-400 p-1"
          />
        </div>
      </div>
    </div>
  );
};

