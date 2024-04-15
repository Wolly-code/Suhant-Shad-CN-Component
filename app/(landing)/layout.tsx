import React from "react";
import Header from "./_component/landing/header/header";

type Props = {
  children: React.ReactNode;
};

const layout = (props: Props) => {
  return (
    <div className="flex w-full flex-col min-h-screen relative  ">
      {/* <ProgressIndicator /> */}

      <Header />
      <div className="flex-grow">{props.children}</div>
      {/* <Footer /> */}
    </div>
  );
};

export default layout;
