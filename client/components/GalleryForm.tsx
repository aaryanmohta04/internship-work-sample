import { useState } from "react";
import ImageDrop from "./ImageDrop";

export default function GalleryForm({ images, setImages }: any) {
  return (
    <div className="m-2">
      <ImageDrop defaultImages={images} setDefaultImages={setImages} />
    </div>
  );
}
