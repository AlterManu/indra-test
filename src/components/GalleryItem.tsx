import { ItemModel } from "../models/models";

export default function GalleryItem({ item }: { item: ItemModel }) {
  return (
    <div className="w-1/3 px-10">
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
}
