import { IoAdd } from "react-icons/io5";
import { motion } from "framer-motion";
import { useState } from "react";
import { RowModel } from "../../models/models";

export default function ButtonAddElement({
  addItem,
  rowIndex,
  row,
}: {
  addItem: (rowIndex: number) => void;
  rowIndex: number;
  row: RowModel;
}) {
  const [isHover, setIsHover] = useState(false);
  const disabled = row.items.length === 3;

  return (
    <>
      <div
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="absolute top-1/3 right-0 -translate-y-1/2 translate-x-1/2"
      >
        <motion.h1
          animate={{ opacity: isHover ? 1 : 0 }}
          className="absolute bg-gray-100 flex justify-center items-center py-2 w-[140px] -top-6 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-2xl text-xs"
        >
          Añadir nuevo producto
        </motion.h1>
        <motion.button
          onClick={() => addItem(rowIndex)}
          whileHover={{
            backgroundColor: !disabled ? "var(--color-blue-500)" : "",
          }}
          className="flex items-center justify-center bg-blue-400 h-8 w-8 rounded-full cursor-pointer text-white"
          disabled={disabled}
          style={{ opacity: disabled ? 0.5 : 1 }}
        >
          <IoAdd size={20} />
        </motion.button>
      </div>
    </>
  );
}
