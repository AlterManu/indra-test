import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { LuZoomIn, LuZoomOut } from "react-icons/lu";
import { RxReset } from "react-icons/rx";

const ZoomContainer = ({ children }: { children: ReactNode }) => {
  // * Hooks
  const [scale, setScale] = useState(1);

  // * Methods
  const zoomIn = () => setScale((prev) => Math.min(prev + 0.2, 1)); // Máx 1 para no hacer más zoom que el inicial
  const zoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5)); // Mín 0.5 para no hacer zoom out infinito
  const reset = () => setScale(1);

  return (
    <>
      {/* Botones de control */}
      <div className="fixed top-4 left-4 z-10 flex gap-2">
        <button
          className="flex items-center justify-center bg-blue-400 w-8 h-8 rounded-full cursor-pointer text-white"
          onClick={zoomIn}
          disabled={scale === 1}
          style={{ opacity: scale === 1 ? 0.5 : 1 }}
        >
          <LuZoomIn size={20} />
        </button>
        <button
          className="flex items-center justify-center bg-blue-400 w-8 h-8 rounded-full cursor-pointer text-white"
          disabled={scale === 0.5}
          style={{ opacity: scale === 0.5 ? 0.5 : 1 }}
          onClick={zoomOut}
        >
          <LuZoomOut size={20} />
        </button>
        <button
          className="flex items-center justify-center bg-blue-400 w-8 h-8 rounded-full cursor-pointer text-white"
          onClick={reset}
          style={{ opacity: scale === 1 ? 0.5 : 1 }}
        >
          <RxReset size={20} />
        </button>
      </div>

      <motion.div
        animate={{ scale }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default ZoomContainer;
