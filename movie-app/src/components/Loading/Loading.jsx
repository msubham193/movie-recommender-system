import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import LoadingAnim from "../../assets/loading.json";

import Lottie from "lottie-react";

const Loading = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnim,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Lottie animationData={LoadingAnim} height={50} width={50} />
    </div>
  );
};

export default Loading;
