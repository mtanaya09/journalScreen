import { View, Text } from "react-native";
import React from "react";

export default function FindPlans() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
      }}
    >
      <Text
        style={{
          fontSize: 20,
          color: "black",
          fontWeight: "800",
        }}
      >
        Find Plans
      </Text>

      <Text
        style={{
          fontSize: 15,
          color: "black",
          fontWeight: "800",
          marginTop: 10,
          padding: 10,
        }}
      >
        'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
        commodo ligula eget dolor. Aenean massa.'
      </Text>
    </View>
  );
}
