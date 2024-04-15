import React from "react";
import MultiImagePicker from "./_component/multi-image-picker";
import ComponentForm from "./component-form";

const page = () => {
  return (
    <div className="container my-10">
      <div className="text-2xl font-semibold">Image Picker</div>
      <div className="my-5">
        <ComponentForm />
      </div>
    </div>
  );
};

export default page;
