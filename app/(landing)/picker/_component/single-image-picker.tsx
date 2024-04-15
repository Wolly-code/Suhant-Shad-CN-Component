import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useFormContext } from "react-hook-form";
import React, { useEffect, useRef } from "react";
import { Camera, X } from "lucide-react";
import Image from "next/image";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  schemaName: string;
  name: string;
  variant?: "standard" | "imageBox" | "avatar";
  accept?: string;
};
const SCNSingleImagePicker = ({
  name,
  schemaName,
  variant = "standard",
  accept = "image/*",
}: Props) => {
  const [selectedImage, setSelectedImage] = React.useState<
    File | string | null
  >(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const { control, setValue, watch, resetField, getValues } = useFormContext();

  const watcher = watch(schemaName);

  useEffect(() => {
    const value = getValues(schemaName);
    if (typeof value === "string") {
      setSelectedImage(getValues(schemaName));
    } else if (value instanceof File) {
      setSelectedImage(value);
    }
  }, [watcher]);

  const handleDeleteButtonClicked = () => {
    try {
      setValue(schemaName, null);
      setSelectedImage(null);
      resetField(schemaName);
      if (inputFileRef.current) {
        inputFileRef.current.value = ""; // Clear the file input value
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
  if (variant === "standard") {
    return (
      <div className="flex flex-col gap-4">
        <Label htmlFor={schemaName}>{name}</Label>
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
                multiple={false}
                {...fieldProps}
                ref={inputFileRef}
                placeholder="Picture"
                type="file"
                accept={accept}
                onChange={(event) => {
                  onChange(event.target.files && event.target.files[0]);
                  setSelectedImage(event.target.files?.[0] || null);
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

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-32 h-32 rounded-lg"
            >
              <Image
                fill
                className="object-cover rounded-lg"
                src={
                  typeof selectedImage === "string"
                    ? selectedImage
                    : URL.createObjectURL(selectedImage)
                }
                alt="Selected"
              />
              <X
                onClick={handleDeleteButtonClicked}
                className="absolute top-0 right-0 bg-black rounded-full p-1  text-white"
              ></X>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  } else if (variant === "imageBox") {
    return (
      <div className="flex flex-col gap-2">
        <Label htmlFor={schemaName}>{name}</Label>
        {selectedImage == null ? (
          <>
            <div
              className="w-auto bg-slate-50 dark:bg-gray-700 border h-60 gap-4 rounded-lg flex flex-col justify-center items-center hover:bg-slate-100 duration-300"
              onClick={handleContainerClick}
            >
              <img className="w-auto h-32" src={"upload-image.svg"} alt="" />
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
                      className="hidden"
                      id={schemaName}
                      multiple={false}
                      {...fieldProps}
                      ref={inputFileRef}
                      placeholder="Picture"
                      type="file"
                      accept={accept}
                      onChange={(event) => {
                        onChange(event.target.files && event.target.files[0]);
                        setSelectedImage(event.target.files?.[0] || null);
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
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-auto h-60 rounded-lg"
            >
              <Image
                fill
                className="object-cover rounded-lg"
                src={
                  typeof selectedImage === "string"
                    ? selectedImage
                    : URL.createObjectURL(selectedImage)
                }
                alt="Selected"
              />
              <X
                onClick={handleDeleteButtonClicked}
                className="absolute top-0 right-0 bg-black rounded-full p-1  text-white"
              ></X>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    );
  } else if (variant === "avatar") {
    return (
      <div className="flex flex-col gap-2">
        <Label htmlFor={schemaName}>{name}</Label>
        <div className="w-auto bg-slate-50 dark:bg-gray-700 border h-60 gap-4 rounded-lg flex flex-col justify-center items-center hover:bg-slate-100 duration-300">
          {selectedImage ? (
            <AnimatePresence>
              <motion.div
                className="relative bg-primary/5 hover:bg-primary/10 duration-300 cursor-pointer border rounded-full h-40 w-40 flex flex-col items-center justify-center text-gray-400 gap-2"
                onClick={handleContainerClick}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {/* Selected image */}
                {selectedImage && (
                  <AnimatePresence>
                    <motion.div
                      onClick={handleContainerClick}
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -10, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="rounded-full overflow-hidden"
                      style={{ width: "100%", height: "100%" }}
                    >
                      <img
                        className="object-cover w-full h-full"
                        src={
                          typeof selectedImage === "string"
                            ? selectedImage
                            : URL.createObjectURL(selectedImage)
                        }
                        alt="Selected"
                      />
                    </motion.div>
                  </AnimatePresence>
                )}

                {/* Overlay */}
                <AnimatePresence>
                  <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black opacity-50 rounded-full" />

                    {/* Light content */}
                    <div className="relative z-10 flex flex-col items-center justify-center">
                      <Camera className="text-white" size={24} />
                      <p className="text-sm text-white mt-2">Upload photo</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div
              className="bg-primary/5 hover:bg-primary/10 duration-300 cursor-pointer  border rounded-full h-40 w-40 flex flex-col items-center justify-center text-gray-400 gap-2"
              onClick={handleContainerClick}
            >
              <Camera />
              <p className="text-sm ">Upload photo</p>
            </div>
          )}

          <Controller
            name={schemaName}
            control={control}
            render={({
              field: { value, onChange, ...fieldProps },
              fieldState: { error },
            }) => (
              <>
                <Input
                  className="hidden"
                  id={schemaName}
                  multiple={false}
                  {...fieldProps}
                  ref={inputFileRef}
                  placeholder="Picture"
                  type="file"
                  accept={accept}
                  onChange={(event) => {
                    onChange(event.target.files && event.target.files[0]);
                    setSelectedImage(event.target.files?.[0] || null);
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
      </div>
    );
  }
};

export default SCNSingleImagePicker;
