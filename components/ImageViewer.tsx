import { Image, ImageSourcePropType } from "react-native";

type Props = {
  imgSource: ImageSourcePropType;
  width?: number;
  height?: number;
  rounded?: boolean;
  shadow?: boolean;
  color?: string;
};

export default function ImageViewer({
  imgSource,
  width = 192,
  height = 192,
  rounded = false,
  shadow = false,
  color,
}: Props) {
  return (
    <Image
      className={shadow ? `shadow-lg ${color ? `bg-${color}` : ""}` : ""}
      source={imgSource}
      style={{
        width,
        height,
        backgroundColor: color,
        borderRadius: rounded ? 16 : 0,
      }}
    />
  );
}
