import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { MaskedTextInput, MaskedTextInputProps } from "react-native-mask-text";
import { IThemeColors } from "@/theme/color";
import { Screens, Spacing } from "@/shared/tokens";
import useThemeColor from "@/theme/useTheme";
import AppText from "../text";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const AppPhoneInput = ({
  label,
  ...props
}: MaskedTextInputProps & { label: string }) => {
  const Colors = useThemeColor();
  const [active, setAcitve] = useState(false);

  const prefixAnimatedStyle = useAnimatedStyle(() => {
    const translateY = withTiming(active ? 0 : 55, { duration: 300 });
    const opacity = withTiming(active ? 1 : 0, {
      duration: active ? 500 : 300,
    });
    return {
      transform: [{ translateY }],
      opacity,
    };
  });

  return (
    <View
      style={[
        styles(Colors).inputBox,
        { borderColor: active ? Colors.primary : Colors.borderColor },
      ]}
    >
      <Animated.View style={[styles(Colors).prefixBox, prefixAnimatedStyle]}>
        <View style={styles(Colors).prefix}>
          <AppText>+998</AppText>
        </View>
        <View
          style={{
            width: 1,
            backgroundColor: active ? Colors.primary : Colors.borderColor,
            marginVertical: 15,
          }}
        />
      </Animated.View>

      <MaskedTextInput
        style={styles(Colors).input}
        mask="99 999-99-99"
        placeholder="telefon raqam"
        placeholderTextColor={Colors.textSecondary}
        keyboardType="phone-pad"
        onFocus={() => setAcitve(true)}
        onBlur={() => setAcitve(false)}
        {...props}
      />
    </View>
  );
};

export default AppPhoneInput;

const styles = (Colors: IThemeColors) =>
  StyleSheet.create({
    inputBox: {
      height: 55,
      borderRadius: 20,
      borderWidth: 1,
      paddingLeft: Screens.width * 0.21,
      borderColor: Colors.borderColor,
      flexDirection: "row",
      gap: Spacing.horizontal,
      overflow: "hidden",
    },
    input: {
      flex: 1,
      color: Colors.textPrimary,
      // backgroundColor: "red",
    },
    prefixBox: {
      paddingLeft: Spacing.horizontal,
      justifyContent: "center",
      flexDirection: "row",
      gap: Spacing.horizontal,
      position: "absolute",
      // transform: [{ translateY: "-50%" }],
      bottom: 0,
      left: 0,
      // backgroundColor: "red",
      height: 55,
    },
    prefix: {
      justifyContent: "center",
      alignItems: "center",
    },
  });
