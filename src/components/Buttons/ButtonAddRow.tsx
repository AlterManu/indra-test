import { IoAdd } from "react-icons/io5";
import { motion } from "framer-motion";
import { useState } from "react";
import { useProducts } from "../../context/useProducts";

export default function ButtonAddRow() {
  // * Hooks
  const [isHover, setIsHover] = useState(false);
  const { addRow } = useProducts();

  return (
    <div className="w-full flex justify-center mt-5 relative">
      <div
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <motion.h1
          animate={{ opacity: isHover ? 1 : 0 }}
          className="absolute bg-gray-100 flex justify-center items-center py-2 w-[140px] -top-14 left-1/2 translate-y-1/2 -translate-x-1/2 rounded-2xl text-xs"
        >
          Añadir nueva fila
        </motion.h1>
        <motion.button
          onClick={addRow}
          whileHover={{
            backgroundColor: "var(--color-blue-500)",
          }}
          className="flex items-center justify-center bg-blue-400 h-10 w-10 rounded-full cursor-pointer text-white"
        >
          <IoAdd size={22} />
        </motion.button>
      </div>
    </div>
  );
}
