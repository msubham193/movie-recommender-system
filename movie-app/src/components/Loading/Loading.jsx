import React from "react";

import LoadingAnim from "../../assets/loading.json";

import Lottie from "lottie-react";

const Loading = () => {
 

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Lottie animationData={LoadingAnim} height={50} width={50} />
    </div>
  );
};

export default Loading;
