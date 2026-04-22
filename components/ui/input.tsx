import { Search } from "lucide-react-native";
import { type ReactNode } from "react";
import { Text, TextInput, type TextInputProps, View } from "react-native";

type InputProps = TextInputProps & {
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
  showSearchIcon?: boolean;
  rightAdornment?: ReactNode;
  children?: ReactNode;
};

export default function Input({
  label,
  placeholder,
  secureTextEntry,
  showSearchIcon,
  rightAdornment,
  children,
  ...props
}: InputProps) {
  const rightSlot = rightAdornment ?? children;

  return (
    <View className="gap-2">
      {label && <Text className="text-xl">{label}</Text>}

      <View className="relative mb-6">
        {showSearchIcon ? (
          <View className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <Search size={24} color="#78716c" strokeWidth={2.2} />
          </View>
        ) : null}

        <TextInput
          placeholderTextColor="#9ca3af"
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          className={`w-full rounded-[18px] border border-gray-200 py-4 text-xl bg-white ${showSearchIcon ? "pl-14" : "px-4"} ${rightSlot ? "pr-20" : "pr-4"}`}
          {...props}
        />

        {rightSlot ? (
          <View className="absolute right-2 top-1/2 -translate-y-1/2 z-10">
            {rightSlot}
          </View>
        ) : null}
      </View>
    </View>
  );
}
