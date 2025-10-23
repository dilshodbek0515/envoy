import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import React, { useState } from "react";
import { IThemeColors } from "@/theme/color";
import { Spacing } from "@/shared/tokens";
import useThemeColor from "@/theme/useTheme";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AppInput = ({ label, ...props }: TextInputProps & { label: string }) => {
  const Colors = useThemeColor();
  const [active, setActive] = useState(false);

  const labelAnimatedStyle = useAnimatedStyle(() => {
    const translateY = withTiming(active ? "-240%" : "-50%", { duration: 180 });
    const fontSize = withTiming(active ? 12 : 16, { duration: 180 });
    const paddingHorizontal = withTiming(active ? 7 : 0, { duration: 180 });
    return {
      transform: [{ translateY }],
      fontSize,
      paddingHorizontal,
    };
  });

  return (
    <View
      style={[
        styles(Colors).inputBox,
        { borderColor: active ? Colors.primary : Colors.borderColor },
      ]}
    >
      <TextInput
        placeholderTextColor={Colors.textSecondary}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        style={styles(Colors).input}
        {...props}
      />

      <Animated.Text
        style={[
          {
            color: active ? Colors.primary : Colors.textSecondary,
            position: "absolute",
            top: "50%",
            transform: [{ translateY: "-50%" }],
            left: Spacing.horizontal,
            backgroundColor: Colors.pageBackground,
            fontSize: 16,
            borderRadius: 100,
          },
          labelAnimatedStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </View>
  );
};

export default AppInput;

const styles = (Colors: IThemeColors) =>
  StyleSheet.create({
    inputBox: {
      height: 55,
      borderRadius: 20,
      borderWidth: 1,
      paddingLeft: Spacing.horizontal,
      flexDirection: "row",
      gap: Spacing.horizontal,
    },
    input: {
      flex: 1,
      color: Colors.textPrimary,
    },
  });
