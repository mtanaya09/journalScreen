import {
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Keyboard,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import colors from "../misc/colors";
import RoundIconBtn from "../components/RoundIconBtn";

const JournalInputModal = ({ visible, onClose, onSubmit, journal, isEdit }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const handleModalClose = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isEdit) {
      setTitle(journal.title);
      setDesc(journal.desc);
    }
  }, [isEdit]);

  const handleOnChangeText = (text, valueFor) => {
    if (valueFor === "title") setTitle(text);
    if (valueFor === "desc") setDesc(text);
  };

  const handleSubmit = () => {
    if (!title.trim() && !desc.trim()) return onClose();

    if (isEdit) {
      //logic for edit
      onSubmit(title, desc, Date.now());
    } else {
      onSubmit(title, desc);
      setTitle("");
      setDesc("");
    }
    onClose();
  };

  const closeModal = () => {
    if (!isEdit) {
      setTitle("");
      setDesc("");
    }

    onClose();
  };

  return (
    <>
      <StatusBar hidden />
      <Modal visible={visible} animationType="fade">
        <View style={styles.container}>
          <Image
            style={{
              flex: 1,
              position: "absolute",
              width: 180,
              height: 180,
              right: -20,
              top: 2,
              resizeMode: "contain",
            }}
            source={require("../assets/yourOne.png")}
          />
          <Text
            style={{
              alignSelf: "flex-start",
              fontSize: 23,
              fontWeight: "bold",
              color: colors.VIOLET,
              marginBottom: 20,
            }}
          >
            Create Journal
          </Text>
          <TextInput
            value={title}
            onChangeText={(text) => handleOnChangeText(text, "title")}
            placeholder="Title"
            style={[styles.input, styles.title]}
          />
          <TextInput
            value={desc}
            placeholder="Description"
            multiline
            style={[styles.input, styles.desc]}
            onChangeText={(text) => handleOnChangeText(text, "desc")}
          />
          <View style={styles.btnContainer}>
            <RoundIconBtn
              size={15}
              antIconName="check"
              onPress={handleSubmit}
            />
            {title.trim() || desc.trim() ? (
              <RoundIconBtn
                size={15}
                style={{ marginLeft: 15 }}
                antIconName="close"
                onPress={closeModal}
              />
            ) : null}
          </View>
        </View>
        <TouchableWithoutFeedback onPress={handleModalClose}>
          <View style={[styles.modalBG, StyleSheet.absoluteFillObject]} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default JournalInputModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
  },

  input: {
    borderBottomWidth: 2,
    borderBottomColor: colors.VIOLET,
    fontSize: 18,
    color: colors.DARK,
  },

  title: {
    height: 40,
    marginBottom: 15,
    fontWeight: "bold",
  },

  desc: {
    height: 120,
  },

  modalBG: {
    flex: 1,
    zIndex: -1,
  },

  btnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 15,
  },
});
