import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

export enum POSITION {
  top = "top",
  bottom = "bottom",
  left = "left",
  right = "right",
}

type TooltipProps = {
  text: string;
  position?: POSITION;
  children: React.ReactNode;
};

export default function Tooltip({
                                  text,
                                  position = POSITION.top,
                                  children,
                                }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible && targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      let top = 0;
      let left = 0;

      switch (position) {
        case POSITION.top:
          top = rect.top - 70; // sedikit di atas
          left = rect.left + rect.width / 2;
          break;
        case POSITION.bottom:
          top = rect.bottom + 10;
          left = rect.left + rect.width / 2;
          break;
        case POSITION.left:
          top = rect.top + rect.height / 2;
          left = rect.left - 100;
          break;
        case POSITION.right:
          top = rect.top + rect.height / 2;
          left = rect.right + 10;
          break;
      }

      setCoords({ top, left });
    }
  }, [visible, position]);

  return (
    <>
      <div
        ref={targetRef}
        className="inline-block"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </div>

      {visible &&
        createPortal(
          <div
            className="fixed z-50 animate-fadeIn pointer-events-none"
            style={{
              top: coords.top,
              left: coords.left,
              transform:
                position === POSITION.top || position === POSITION.bottom
                  ? "translateX(-50%)"
                  : "translateY(-50%)",
            }}
          >
            {/* Tooltip Box */}
            <div
              className={`
                relative bg-gray-800 text-white
                dark:bg-gray-200 dark:text-gray-900
                text-xs rounded px-3 py-2 shadow-lg
                min-w-[150px] max-w-xs whitespace-normal break-words
              `}
            >
              {text}
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
