"use client";
import React, { useEffect } from "react";
import SCNSingleImagePicker from "./_component/single-image-picker";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import SCNMultiImagePicker from "./_component/multi-image-picker";

const FormSchema = z.object({
  imageVal: z
    .any()
    .refine(
      (val) => typeof val === "string" || val instanceof File,
      "Please select an image"
    ),

  multiImage: z
    .any()
    .array()
    .nonempty({
      message: "Can't be empty!",
    })
    .max(4, "Cannot be more than 4 images"),
});
const ComponentForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    form.setValue(
      "imageVal",
      "https://images.unsplash.com/photo-1635373390303-cc78167278ee"
    );
    form.setValue("multiImage", [
      "https://images.unsplash.com/photo-1635373390303-cc78167278ee",
    ]);
  }, []);

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    if (typeof values.imageVal === "string") {
      console.log("type:string Dont Upload to cloud");
    } else {
      console.log("type: File Upload to cloud");
    }

    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 "
      >
        <SCNSingleImagePicker
          name="Image Picker 1"
          variant="type2"
          schemaName="imageVal"
        />

        <SCNMultiImagePicker
          name="Multi Image Picker"
          limit={3}
          schemaName="multiImage"
        ></SCNMultiImagePicker>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default ComponentForm;
