import { Image, ImageSourcePropType } from "react-native";

type Props = {
  imgSource: ImageSourcePropType;
  width?: number;
  height?: number;
  rounded?: boolean;
  shadow?: boolean;
};

export default function ImageViewer({
  imgSource,
  width = 192,
  height = 192,
  rounded = false,
  shadow = false,
}: Props) {
  return (
    <Image
      className={shadow ? "shadow-lg" : ""}
      source={imgSource}
      style={{
        width,
        height,

        borderRadius: rounded ? 16 : 0,
      }}
    />
  );
}
