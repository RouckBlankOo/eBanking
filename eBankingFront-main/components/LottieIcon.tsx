import React from "react";
import { ViewStyle } from "react-native";
import LottieView from "lottie-react-native";

export interface LottieIconProps {
  source: any;
  size: number;
  autoPlay?: boolean;
  loop?: boolean;
  style?: ViewStyle;
}

export const LottieIcon: React.FC<LottieIconProps> = ({
  source,
  size,
  autoPlay = true,
  loop = false,
  style,
}) => {
  return (
    <LottieView
      source={source}
      autoPlay={autoPlay}
      loop={loop}
      style={[
        {
          width: size,
          height: size,
        },
        style,
      ]}
    />
  );
};

// Pre-configured success icon for consistency
export const SuccessIcon: React.FC<{
  size: number;
  style?: ViewStyle;
}> = ({ size, style }) => {
  return (
    <LottieIcon
      source={require("../assets/Lottie/Done.json")}
      size={size}
      autoPlay={true}
      loop={false}
      style={style}
    />
  );
};

export default LottieIcon;
