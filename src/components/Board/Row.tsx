import { useDrag, useDrop } from "react-dnd";
import { ItemType, RowModel, templateTypes } from "../../models/models";
import Item from "./Item";
import { useProducts } from "../../context/useProducts";
import { useRef } from "react";
import dragIcon from "../../assets/img/drag.png";
import ButtonAddElement from "../Buttons/ButtonAddElement";
import ButtonDeleteRow from "../Buttons/ButtonDeleteRow";
import ButtonChangeTemplate from "../Buttons/ButtonChangeTemplate";

const Row = ({
  row,
  rowIndex,
  moveRow,
  moveItem,
}: {
  row: RowModel;
  rowIndex: number;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
  moveItem: (
    dragRowIndex: number,
    dragItemIndex: number,
    hoverRowIndex: number,
    hoverItemIndex: number
  ) => void;
}) => {
  // * Hooks
  const { addItem, deleteRow } = useProducts();
  const rowRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef<HTMLSpanElement | null>(null);

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.ROW,
    item: { rowIndex },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  });

  const [, drop] = useDrop({
    accept: ItemType.ROW,
    hover: (dragged: { rowIndex: number }) => {
      if (dragged.rowIndex !== rowIndex) {
        moveRow(dragged.rowIndex, rowIndex);
        dragged.rowIndex = rowIndex;
      }
    },
  });

  drag(dragRef);
  drop(rowRef);

  return (
    <div
      ref={rowRef}
      className="relative flex mb-4"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <span
        ref={dragRef}
        className="absolute top-1/2 -left-10 -translate-y-1/2 cursor-grab "
      >
        <img className="w-8" src={dragIcon}></img>
      </span>
      <div
        className="w-full flex border-1 border-dashed border-[rgba(0,0,0,0.3)]"
        style={{ placeContent: templateTypes[row.template].place }}
      >
        {row.items.map((item, itemIndex) => (
          <Item
            key={item.id}
            item={item}
            rowIndex={rowIndex}
            itemIndex={itemIndex}
            moveItem={moveItem}
          />
        ))}
      </div>

      {/* Botón para añadir elemento random */}
      <ButtonAddElement addItem={addItem} row={row} rowIndex={rowIndex} />

      {/* Botón para cambiar de plantilla */}
      <ButtonChangeTemplate row={row} />

      {/* Botón para eliminar fila */}
      <ButtonDeleteRow deleteRow={deleteRow} rowIndex={rowIndex} />
    </div>
  );
};

export default Row;
