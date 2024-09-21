import React, { useState } from "react";
import Icon from "./Icon";
import { useDrag } from "react-dnd";
import catSprite from "../assets/sprites/cat-sprite.png";
import girlSprite from "../assets/sprites/girl-spritee.png"; // Ensure this path is correct
import boySprite from "../assets/sprites/boy-sprite.png"; // Ensure this path is correct

const ItemTypes = {
  BLOCK: "block",
};

const spriteOptions = [
  { value: 'cat', label: 'Cat Sprite', image: catSprite },
  { value: 'girl', label: 'Girl Sprite', image: girlSprite },
  { value: 'boy', label: 'Boy Sprite', image: boySprite },
];

export default function Sidebar({ onBlockClick, onAddSprite }) {
  const [selectedSprite, setSelectedSprite] = useState(spriteOptions[0].value);
const [isOpen, setIsOpen] = useState(false);

  const Block = ({ children, type }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: ItemTypes.BLOCK,
      item: { type, content:children },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    return (
      <div
        ref={drag}
        onClick={() => onBlockClick(type)} // Trigger move on click
        className={`flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer ${
          isDragging ? "opacity-50" : ""
        }`}
      >
        {children}
      </div>
    );
  };
const handleSelectSprite = (option) => {
  setSelectedSprite(option);
  setIsOpen(false);
};
const handleAddSprite = () => {
  onAddSprite(selectedSprite.image, selectedSprite.value); 
};

  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold">{"Events"}</div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When "}
        <Icon name="flag" size={15} className="text-green-600 mx-2" />
        {"clicked"}
      </div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When this sprite clicked"}
      </div>

       <div className="font-bold">Add Sprites</div>
         <div className="relative w-full">
        <div 
          className="border p-2 bg-white cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <img src={selectedSprite.image} alt={selectedSprite.label} style={{ width: '20px', height: '20px', marginRight: '8px' }} />
          {selectedSprite.label}
        </div>
        {isOpen && (
          <div className="absolute z-10 bg-white border border-gray-400 mt-1 w-full">
            {spriteOptions.map(option => (
              <div 
                key={option.value} 
                className="flex items-center p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSelectSprite(option)}
              >
                <img src={option.image} alt={option.label} style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
      <button className="my-2 p-2 bg-blue-500 text-white" onClick={handleAddSprite}>
        Add Selected Sprite
      </button>

      <div className="font-bold">{"Motion"}</div>
      <Block type="move">{"Move 10 steps"}</Block>
      <Block type="turnLeft">
        {"Turn "}
        <Icon name="undo" size={15} className="text-white mx-2" />
        {"15 degrees"}
      </Block>
      <Block type="turnRight">
        {"Turn "}
        <Icon name="redo" size={15} className="text-white mx-2" />
        {"15 degrees"}
      </Block>
    </div>
  );
}

