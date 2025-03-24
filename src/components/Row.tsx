import { useDrag, useDrop } from "react-dnd";
import { ItemType, RowModel, templateTypes } from "../models/item";
import Item from "./Item";
import { useProducts } from "../context/useProducts";

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
  const { addItem, deleteRow, changeTemplate } = useProducts();

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

  return (
    <div
      ref={(node) => {
        if (node) {
          drag(drop(node));
        }
      }}
      className="relative flex mb-4"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div
        className="w-full flex px-16 border-2 border-dashed border-[rgba(0,0,0,0.3)]"
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
      <div className="absolute top-1/3 right-0 -translate-y-1/2 translate-x-1/2">
        <button
          onClick={() => addItem(rowIndex)}
          className="bg-slate-500 px-4 py-2 rounded-full cursor-pointer text-white"
          disabled={row.items.length === 3}
          style={{ opacity: row.items.length === 3 ? 0.5 : 1 }}
        >
          + Añadir elemento
        </button>
      </div>

      {/* Botón para cambiar de plantilla */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2">
        <button
          onClick={() => changeTemplate(row)}
          className="bg-slate-500 px-4 py-2 rounded-full cursor-pointer text-white"
        >
          {`Plantilla nº${templateTypes[row.template].index + 1}`}
        </button>
      </div>

      {/* Botón para eliminar fila */}
      <div className="absolute top-2/3 right-0 -translate-y-1/2 translate-x-1/2">
        <button
          onClick={() => deleteRow(rowIndex)}
          className="bg-slate-500 px-4 py-2 rounded-full cursor-pointer text-white"
        >
          - Eliminar fila
        </button>
      </div>
    </div>
  );
};

export default Row;
