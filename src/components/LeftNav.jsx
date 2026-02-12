import { useState } from "react";

import pencilIcon from "../assets/pencil-icon.svg";
import eraserIcon from "../assets/eraser-icon.svg";
import deleteIcon from "../assets/delete-icon.svg";
import drawerIcon from "../assets/drawer-icon.svg";

export default function LeftNav({ socket, sliderRef, colorRef, setIsPen }) {
  const [shownav, setShownav] = useState(true);

  return (
    <div className="absolute top-1/2 left-2 flex h-[80%] w-[clamp(60px,10%,10%)] translate-y-[-50%] min-[1043px]:left-[-90px]">
      <div
        className={`flex w-[90%] flex-col items-center justify-between rounded-[3em] border-3 bg-white px-[10%] py-[20%] transition-all ${
          shownav ? "" : "max-[1043px]: translate-x-[-30dvw]"
        } `}
      >
        <input
          type="color"
          tabIndex={-1}
          ref={colorRef}
          className="transition-all hover:scale-110 active:scale-90"
        />
        <img
          className="aspect-square w-full cursor-pointer transition-all select-none hover:scale-110 active:scale-90"
          src={pencilIcon}
          alt="pencil-icon"
          onClick={() => setIsPen(true)}
        />
        <img
          className="aspect-square w-full cursor-pointer transition-all select-none hover:scale-110 active:scale-90"
          src={eraserIcon}
          alt="eraser-icon"
          onClick={() => setIsPen(false)}
        />
        <input
          className="vertical-slider"
          type="range"
          tabIndex={-1}
          min={1}
          max={300}
          defaultValue={10}
          ref={sliderRef}
          step={1}
        />
        <img
          className="aspect-square w-full cursor-pointer transition-all select-none hover:scale-110 active:scale-90"
          src={deleteIcon}
          alt="delete-icon"
          onClick={() => {
            socket.emit("clear", {});
          }}
        />
      </div>
      <img
        className={`ml-[10%] w-[30%] transition-all select-none min-[1043px]:hidden ${
          shownav ? "rotate-180" : "translate-x-[clamp(-80px,-8dvw,-55px)]"
        }`}
        src={drawerIcon}
        alt="drawer-icon"
        onClick={() => setShownav((prev) => !prev)}
      />
    </div>
  );
}
