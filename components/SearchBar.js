import { StyleSheet, Text, TextInput, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import colors from "../misc/colors";

const SearchBar = ({ containerStyle, value, onChangeText, onClear }) => {
  return (
    <View style={[styles.container, { ...containerStyle }]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={styles.SearchBar}
        placeholder="Search journal"
        placeholderTextColor={"#a8a8a8"}
        color={colors.LIGHT}
        underlineColorAndroid="transparent"
      />
      {value ? (
        <AntDesign
          name="close"
          size={20}
          color={colors.VIOLET}
          onPress={onClear}
          style={styles.clearIcon}
        />
      ) : null}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    justifyContent: "center",
    zIndex: 1,
  },
  SearchBar: {
    borderWidth: 1.2,
    borderColor: colors.VIOLET,
    height: 40,
    borderRadius: 40,
    paddingLeft: 15,
    fontSize: 16,
  },

  clearIcon: {
    position: "absolute",
    right: 10,
  },
});
