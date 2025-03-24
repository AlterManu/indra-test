import { useEffect, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import dragIcon from "../../assets/img/drag.png";
import { useProducts } from "../../context/useProducts";
import { ItemType, RowModel, templateTypes } from "../../models/models";
import ButtonAddElement from "../Buttons/ButtonAddElement";
import ButtonChangeTemplate from "../Buttons/ButtonChangeTemplate";
import ButtonDeleteRow from "../Buttons/ButtonDeleteRow";
import Item from "./Item";

interface RowProps {
  row: RowModel;
  rowIndex: number;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
  moveItem: (
    dragRowIndex: number,
    dragItemIndex: number,
    hoverRowIndex: number,
    hoverItemIndex: number
  ) => void;
}

export default function Row({ row, rowIndex, moveRow, moveItem }: RowProps) {
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

  // * Life Cycle
  useEffect(() => {
    if (row.items.length === 0) {
      deleteRow(rowIndex); // Elimina autom. la fila si se queda vacía
    }
  }, [row.items.length]);

  return (
    <div
      ref={rowRef}
      className="relative flex mb-4"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <span
        ref={dragRef}
        className="absolute top-1/2 -left-12 -translate-y-1/2 cursor-grab p-2 rounded-xl transition-all hover:bg-gray-200 duration-600 ease"
      >
        <img className="w-6" src={dragIcon}></img>
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
}
