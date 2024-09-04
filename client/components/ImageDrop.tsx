import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { XCircleIcon } from "@heroicons/react/24/solid";

const fileTypes = ["JPG", "PNG"];

export default function ImageDrop({ defaultImages, setDefaultImages }: any) {
  const [images, setImages] = useState<any>(defaultImages || []);

  const handleImageRemove = (index: any) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    setDefaultImages(updatedImages);
  };

  const handleChange = (file: any) => {
    const newFiles = [
      ...images,
      {
        file: file,
        url: URL.createObjectURL(file),
      },
    ];
    setImages(newFiles);
    setDefaultImages(newFiles);
  };


  return (
    <div>
      {images.map((img: any, index: any) => (
        <div key={index} className="relative">
          <XCircleIcon
            className="absolute top-0 left-24 h-6 w-6 text-red-600 cursor-pointer"
            onClick={() => handleImageRemove(index)}
          />
          <img
            src={img.url}
            alt={img.name}
            className="h-24 w-24 object-cover rounded-md"
          />
        </div>
      ))}
      <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
    </div>
  );
}
