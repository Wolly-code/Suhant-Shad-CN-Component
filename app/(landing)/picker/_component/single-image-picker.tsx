"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  FieldValues,
  UseFormSetValue,
  useForm,
  useFormContext,
} from "react-hook-form";
import * as z from "zod";
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Circle, X } from "lucide-react";
import Image from "next/image";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  schemaName: string;
  variant?: "type1" | "type2";
};
const SCNSingleImagePicker = ({ schemaName, variant = "type1" }: Props) => {
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

  if (variant === "type1") {
    return (
      <div className="flex flex-col gap-4">
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
                accept="image/*, application/pdf"
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
  } else {
    return (
      <div className="flex flex-col gap-4">
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
                accept="image/*, application/pdf"
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
  }
};

export default SCNSingleImagePicker;
