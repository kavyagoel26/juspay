import React , {useState} from "react";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import {PreviewArea} from "./components/PreviewArea";
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend'
function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [sprites , setSprites] = useState([]);


  const handleBlockClick = (blockType) => {
    if (blockType === 'move') {
      setPosition((prevPosition) => ({
        x: prevPosition.x + 10,
        y: prevPosition.y,
      }));
    } else if (blockType === 'turnLeft') {
      setRotation((prevRotation) => prevRotation - 15);
    } else if (blockType === 'turnRight') {
      setRotation((prevRotation) => prevRotation + 15);
    }
  };

  const handleSpriteMove = (newPosition) => {
    setPosition(newPosition); // Update position from drag
  };

  const handleAddSprite = (image, name) =>{
    const newSprite = {
      id: Date.now(),
      type: name,
      image: image,
      x:50,
      y:50,
    };
    setSprites([...sprites, newSprite]);
  }

  const updateSpritePosition = (id , x, y) =>{
    setSprites(sprites.map(sprite => sprite.id === id ? {...sprite , x,y} : sprite));
  }
  return (
    <DndProvider backend={HTML5Backend}>
    <div className="bg-blue-100 pt-6 font-sans">
      <div className="h-screen overflow-hidden flex flex-row  ">
        <div className="flex-1 h-screen overflow-hidden flex flex-row bg-white border-t border-r border-gray-200 rounded-tr-xl mr-2">
        <Sidebar onBlockClick={handleBlockClick} onAddSprite={handleAddSprite}/> <MidArea onBlockAction = {handleBlockClick} />
        </div>
        <div className="w-1/3 h-screen overflow-hidden flex flex-row bg-white border-t border-l border-gray-200 rounded-tl-xl ml-2">
          <PreviewArea position={position} rotation={rotation} onUpdatePosition = {updateSpritePosition} onMove={handleSpriteMove} sprites={sprites} />
        </div>
        
      </div>
    </div>
    </DndProvider>
 
  );
}
export default App
