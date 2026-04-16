import { Text, TextInput, type TextInputProps, View } from "react-native";

type InputProps = TextInputProps & {
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
};

export default function Input({
  label,
  placeholder,
  secureTextEntry,
  ...props
}: InputProps) {
  return (
    <View className="gap-2 ">
      {label && <Text className=" text-xl ">{label}</Text>}
      <TextInput
        placeholderTextColor="#9ca3af"
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        className="w-full rounded-[18px] border border-gray-200 px-4 py-4 text-xl bg-white mb-6"
        {...props}
      />
    </View>
  );
}
