import { useProducts } from "../../context/useProducts";
import { RowModel, templateTypes } from "../../models/models";

export default function ButtonChangeTemplate({ row }: { row: RowModel }) {
  // * Hooks
  const { changeTemplate } = useProducts();

  // * Methods
  const getTemplateName = (index: number) => {
    const letters = { 1: "A", 2: "B", 3: "C" };
    return `Plantilla ${letters[index as 1 | 2 | 3]}`;
  };

  return (
    <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2">
      <button
        onClick={() => changeTemplate(row)}
        className="bg-blue-400 px-4 py-2 rounded-full cursor-pointer text-white"
      >
        {getTemplateName(templateTypes[row.template].index + 1)}
      </button>
    </div>
  );
}
