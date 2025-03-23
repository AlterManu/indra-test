import { useDrag, useDrop } from "react-dnd";
import { ItemModel, ItemType } from "../models/item";
import minusIcon from "../assets/img/minus2.png";
import { useProducts } from "../context/useProducts";

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
  const { deleteItem } = useProducts();

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.ITEM,
    item: { rowIndex, itemIndex },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const [, drop] = useDrop({
    accept: ItemType.ITEM,
    hover: (dragged: { rowIndex: number; itemIndex: number }) => {
      if (dragged.rowIndex !== rowIndex || dragged.itemIndex !== itemIndex) {
        moveItem(dragged.rowIndex, dragged.itemIndex, rowIndex, itemIndex);
        dragged.rowIndex = rowIndex;
        dragged.itemIndex = itemIndex;
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
      className="w-1/3 px-10 cursor-grab relative"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {/* Quitar item */}
      <img
        onClick={() => deleteItem(rowIndex, itemIndex)}
        src={minusIcon}
        alt="minus"
        className="w-10 absolute top-2 right-12 cursor-pointer z-10"
      />

      <div className="w-full">
        {/* Imagen */}
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-contain"
        />
        {/* Info */}
      </div>
      <div className="h-[10%]">
        <h3>{item.name}</h3>
        <h3>{item.price}</h3>
      </div>
    </div>
  );
};

export default Item;
