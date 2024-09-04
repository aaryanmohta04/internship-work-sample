import { uploadFile } from "@/lib/api/WebsiteBanner";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

interface BannerFormProps {
  onSubmit: (data: WebsiteBanner) => void;
  initialData?: WebsiteBanner;
}

const BannerForm: React.FC<BannerFormProps> = ({ onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<WebsiteBanner>({
    defaultValues: initialData,
  });
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  function addImageProcess(
    src: string
  ): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve({ height: img.height, width: img.width });
      img.onerror = reject;
    });
  }

  const onSubmitForm = async (data: WebsiteBanner) => {
    if (file) {
      const newFile = new File([file], "uploads/banner_image/" + file.name, {
        type: "application/octet-stream",
      });
      let fileData = new FormData();
      fileData.append("file", newFile);
      await uploadFile(fileData, "banner_image");
      data.imagePath = "uploads/banner_image/" + file.name;
      data.imageName = file.name;
      data.size = file.size;
      const imageDimensions = await addImageProcess(URL.createObjectURL(file));
      data.height = imageDimensions.height;
      data.width = imageDimensions.width;
    }
    onSubmit(data);
    reset();
  };

  useEffect(() => {
    if (initialData?.title) {
      setValue("title", initialData.title);
    }
    if (initialData?.url) {
      setValue("url", initialData.url);
    }
  }, [initialData, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Banner Title
        </label>
        <input
          type="text"
          {...register("title", { required: true })}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        {errors.title && (
          <span className="text-red-600">This field is required</span>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Banner Image
        </label>
        <input
          type="file"
          defaultValue={file?.name || ""}
          onChange={handleFileChange}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        {errors.imagePath && (
          <span className="text-red-600">This field is required</span>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Banner URL
        </label>
        <input
          type="text"
          {...register("url", { required: true })}
          defaultValue={initialData?.url || ""}
          className="mt-1 p-2 border border-gray-300 rounded-md w-full"
        />
        {errors.url && (
          <span className="text-red-600">This field is required</span>
        )}
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
      >
        SAVE
      </button>
      <button
        type="button"
        className="px-4 py-2 bg-gray-600 text-white font-medium rounded-md hover:bg-gray-700"
        onClick={() => setValue("title", "")}
      >
        CANCEL
      </button>
    </form>
  );
};

export default BannerForm;
