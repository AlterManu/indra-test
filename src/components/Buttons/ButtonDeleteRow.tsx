import { FiMinus } from "react-icons/fi";
import { motion } from "framer-motion";
import { useState } from "react";

export default function ButtonDeleteRow({
  deleteRow,
  rowIndex,
}: {
  deleteRow: (rowIndex: number) => void;
  rowIndex: number;
}) {
  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <div
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="absolute top-2/3 right-0 -translate-y-1/2 translate-x-1/2"
      >
        <motion.h1
          animate={{ opacity: isHover ? 1 : 0 }}
          className="absolute bg-gray-100 flex justify-center items-center py-2 w-[140px] top-6 left-1/2 translate-y-1/2 -translate-x-1/2 rounded-2xl text-xs"
        >
          Eliminar fila completa
        </motion.h1>
        <motion.button
          onClick={() => deleteRow(rowIndex)}
          whileHover={{ backgroundColor: "var(--color-blue-500)" }}
          className="flex items-center justify-center bg-blue-400 h-8 w-8 rounded-full cursor-pointer text-white"
        >
          <FiMinus size={18} />
        </motion.button>
      </div>
    </>
  );
}
