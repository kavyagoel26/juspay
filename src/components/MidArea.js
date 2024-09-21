
import React, { useState } from "react";
import { useDrop } from "react-dnd";
import { CatSprite } from "./CatSprite"; // Assuming this component renders the sprite

const ItemTypes = {
  BLOCK: "block",
};

export default function MidArea({onBlockAction}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [droppedItems, setDroppedItems] = useState([]);


  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.BLOCK,
    drop: (item) => {
      setDroppedItems((prevItems) => [...prevItems, item.content]);
      onBlockAction(item.type); // Perform action based on block type
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));
  const handleBlockClick = (blockType) =>{
    onBlockAction(blockType);
  }

  return (
    <div
      ref={drop}
      className={`flex-1 h-full overflow-auto p-4 border ${isOver ? 'bg-green-100' : 'bg-white'}`}
    >
      <div className="font-bold">Mid Area</div>
      {droppedItems.map((item, index) => (
        <div key={index} className="flex flex-row w-5 flex-wrap bg-blue-500 text-white px-2 py-1 my-1 text-sm cursor-pointer"
        style={{minWidth:'150px', minHeight:'40px'}}
        onClick={() => handleBlockClick(item.type)
        }>
          {item}
        </div>
      ))}
    </div>
  );
}

