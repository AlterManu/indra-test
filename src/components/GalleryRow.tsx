import { ItemModel, RowModel, templateTypes } from "../models/models";
import GalleryItem from "./GalleryItem";

export default function GalleryRow({ row }: { row: RowModel }) {
  return (
    <div className="relative flex mb-4">
      <div
        className="w-full flex px-16"
        style={{ placeContent: templateTypes[row.template].place }}
      >
        {row.items.map((item: ItemModel) => (
          <GalleryItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
