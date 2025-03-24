import { useDrag, useDrop } from "react-dnd";
import { ItemModel, ItemType } from "../../models/models";
import minusIcon from "../../assets/img/trash.png";
import { useProducts } from "../../context/useProducts";
import { useState } from "react";
import { motion } from "framer-motion";

const MAX_ITEMS = 3;

const Item = ({
  item,
  rowIndex,
  itemIndex,
  moveItem,
}: {
  item: ItemModel;
  rowIndex: number;
  itemIndex: number;
  moveItem: (
    draggedRowIndex: number,
    draggedItemIndex: number,
    rowIndex: number,
    itemIndex: number
  ) => void;
}) => {
  // * Hooks
  const { products, deleteItem, deleteRow } = useProducts();
  const [isHover, setIsHover] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.ITEM,
    item: { rowIndex, itemIndex },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const [, drop] = useDrop({
    accept: ItemType.ITEM,
    hover: (dragged: { rowIndex: number; itemIndex: number }) => {
      const isOtherRow = dragged.rowIndex !== rowIndex;
      const isOtherItem = dragged.itemIndex !== itemIndex;

      const destinyItemsLength = products[rowIndex].items.length;
      const otherRowIsFull = destinyItemsLength >= MAX_ITEMS;

      if ((isOtherRow && !otherRowIsFull) || (!isOtherRow && isOtherItem)) {
        moveItem(dragged.rowIndex, dragged.itemIndex, rowIndex, itemIndex);
        dragged.rowIndex = rowIndex;
        dragged.itemIndex = itemIndex;

        // TODO: ARREGLAR
        if (products[rowIndex].items.length === 0) {
          deleteRow(rowIndex);
        }
      }
    },
  });

  return (
    <div
      ref={(node) => {
        if (node) {
          drag(drop(node));
        }
      }}
      className="w-1/3 flex justify-center relative cursor-grab py-4"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div
        className="w-fit flex flex-col items-center"
        onMouseOver={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <motion.div
          className="w-full h-full bg-[rgba(0,0,0,0.2)] absolute top-0 left-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHover ? 1 : 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
        <div className="w-full h-[35vh]">
          {/* Quitar item */}
          <motion.img
            onClick={() => deleteItem(rowIndex, itemIndex)}
            src={minusIcon}
            alt="minus"
            className="w-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHover ? 1 : 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          />

          {/* Imagen */}
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-contain"
          />
          {/* Info */}
        </div>
        <div className="w-full h-[5vh]">
          <h3>{item.name}</h3>
          <h3>{item.price}</h3>
        </div>
      </div>
    </div>
  );
};

export default Item;
