import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  schemaName: string;
  multiple?: boolean;
  limit?: number;
  name: string;
};
const SCNMultiImagePicker = ({
  name,
  schemaName,
  multiple = true,
  limit,
}: Props) => {
  const [selectedImages, setSelectedImages] = React.useState<
    (string | File)[] | null
  >(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { control, setValue, getValues, setError } = useFormContext();

  useEffect(() => {
    const value = getValues(schemaName);
    if (Array.isArray(value)) {
      setSelectedImages(value);
    }
  }, []);

  const handleDeleteButtonClicked = (index: number) => {
    try {
      const updatedImages = selectedImages!.filter((_, i) => i !== index);
      setValue(schemaName, updatedImages);
      setSelectedImages(updatedImages);
      if (inputFileRef.current && index === selectedImages!.length - 1) {
        // Check if the index being deleted is the last index
        inputFileRef.current.value = "sdfdsf"; // Clear the file input value
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleContainerClick = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      const newImages = Array.from(files);
      if (limit && newImages.length + (selectedImages?.length ?? 0) > limit) {
        setError(schemaName, {
          type: "custom",
          message: `Image cannot be more than ${limit}`,
        });
        return;
      }
      if (multiple) {
        const updatedImages = [...(selectedImages || []), ...newImages];
        setSelectedImages(updatedImages);
        setValue(schemaName, updatedImages);
      } else {
        setSelectedImages(newImages);
        setValue(schemaName, newImages);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Label htmlFor={schemaName}>{name}</Label>
      <>
        <div
          className="w-auto bg-slate-50 dark:bg-gray-700 border h-96 gap-4 rounded-lg flex flex-col justify-center items-center hover:bg-slate-100 duration-300"
          onClick={handleContainerClick}
        >
          <img className="w-48 h-48" src={"upload-image.svg"} alt="" />
          <p>Select File</p>
          <p className="text-sm text-gray-400">
            Click browse through your machine
          </p>
          <Controller
            name={schemaName}
            control={control}
            render={({
              field: { value, onChange, ...fieldProps },
              fieldState: { error },
            }) => (
              <>
                <Input
                  id={schemaName}
                  className="hidden"
                  multiple={multiple}
                  {...fieldProps}
                  ref={inputFileRef}
                  placeholder="Picture"
                  type="file"
                  accept="image/*, application/pdf"
                  onChange={(event) => {
                    const files = event.target.files;
                    if (files) {
                      const newImages = Array.from(files);
                      if (
                        limit &&
                        newImages.length + (selectedImages?.length ?? 0) > limit
                      ) {
                        setError(schemaName, {
                          type: "custom",
                          message: `Image cannot be more than ${limit}`,
                        });
                        return;
                      }
                      if (multiple) {
                        const updatedImages = [...(value || []), ...newImages]; // Append new images to existing ones
                        setSelectedImages(updatedImages);
                        onChange(updatedImages);
                      } else {
                        setSelectedImages(newImages);
                        onChange(newImages);
                      }
                    }
                  }}
                />
                {!!error && (
                  <Label
                    className={cn(
                      error && "text-red-500 dark:text-red-900 px-3  ",
                      ""
                    )}
                    htmlFor={schemaName}
                  >
                    {error.message}
                  </Label>
                )}
              </>
            )}
          />
        </div>
      </>

      <div className="flex gap-4 flex-wrap">
        <AnimatePresence>
          {selectedImages &&
            selectedImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative w-32 h-32 rounded-lg "
              >
                <Image
                  fill
                  className="object-cover rounded-lg"
                  src={
                    typeof image === "string"
                      ? image
                      : URL.createObjectURL(image)
                  }
                  alt="Selected"
                />
                <X
                  onClick={() => handleDeleteButtonClicked(index)}
                  className="absolute cursor-pointer top-0 right-0 bg-black rounded-full p-1  text-white hover:text-gray-200 duration-300"
                ></X>
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SCNMultiImagePicker;
