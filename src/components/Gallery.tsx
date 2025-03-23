import { useProducts } from "../context/useProducts";
import GalleryRow from "./GalleryRow";

export default function Gallery() {
  const { products } = useProducts();

  return (
    <>
      {products.map((row) => (
        <GalleryRow key={row.id} row={row} />
      ))}
    </>
  );
}
