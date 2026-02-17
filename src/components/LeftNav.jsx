import { useState } from "react";
import { useCanvas } from "../hooks/useCanvas";
import NavButton from "./left-nav/NavButton";
import pencilIcon from "../assets/pencil-icon.svg";
import eraserIcon from "../assets/eraser-icon.svg";
import deleteIcon from "../assets/delete-icon.svg";
import drawerIcon from "../assets/drawer-icon.svg";

export default function LeftNav() {
  const { socket, sliderRef, colorRef, setIsPen } = useCanvas();
  const [shownav, setShownav] = useState(true);

  return (
    <aside
      className={`absolute top-1/2 ${shownav ? "left-2" : `left-[calc(clamp(60px,10%,10%)*-0.8)]`} flex h-[80%] w-[clamp(60px,10%,10%)] translate-y-[-50%] min-[1043px]:left-[-90px]`}
    >
      <div
        className={`flex w-[90%] flex-col items-center justify-between rounded-[3em] border-3 px-[10%] py-[20%] transition-all ${shownav ? undefined : "max-[1043px]:-translate-x-[120%]"} bg-white`}
      >
        <input
          type="color"
          tabIndex={-1}
          ref={colorRef}
          className="transition-all hover:scale-110 active:scale-90"
        />
        <NavButton
          src={pencilIcon}
          alt={"pencil-button"}
          onClick={() => setIsPen(true)}
        />
        <NavButton
          src={eraserIcon}
          alt={"eraser-button"}
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
        <NavButton
          src={deleteIcon}
          alt={"delete-button"}
          onClick={() => socket.emit("clear", {})}
        />
      </div>
      <img
        className={`ml-[10%] w-[30%] transition-all select-none min-[1043px]:hidden ${
          shownav ? "rotate-180" : undefined
        }`}
        src={drawerIcon}
        alt="drawer-icon"
        onClick={() => setShownav((prev) => !prev)}
      />
    </aside>
  );
}
