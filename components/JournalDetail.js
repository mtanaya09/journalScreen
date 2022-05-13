import { StyleSheet, Text, View, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import colors from "../misc/colors";
import moment from "moment";
import RoundIconBtn from "./RoundIconBtn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useJournals } from "../context/JournalProvider";
import JournalInputModal from "../journal-screens/JournalInputModal";

// const formatDate = (ms) => {
//   const date = new Date(ms);
//   const day = date.getDate();
//   const month = date.getMonth() + 1;
//   const year = date.getFullYear();
//   const hrs = date.getHours();
//   const min = date.getMinutes();
//   const sec = date.getSeconds();

//   return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`;
// };

const formatDate = (ms) => {
  const myDate = moment(ms).format("MM/d/YYYY h:mm A");

  return myDate;
};

const JournalDetail = (props) => {
  const [journal, setJournal] = useState(props.route.params.journal);
  const { setJournals } = useJournals();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const deleteNote = async () => {
    const result = await AsyncStorage.getItem("journals");
    let journals = [];
    if (result !== null) journals = JSON.parse(result);

    const newJournals = journals.filter((j) => j.id !== journal.id);
    setJournals(newJournals);
    await AsyncStorage.setItem("journals", JSON.stringify(newJournals));
    props.navigation.goBack();
  };

  const displayDeleteAlert = () => {
    Alert.alert(
      "Are you sure?",
      "This action will delete your journal permanently!",
      [
        {
          text: "Delete",
          onPress: deleteNote,
        },
        {
          text: "No",
          onPress: () => console.log("nothing happens"),
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const handleUpdate = async (title, desc, time) => {
    const result = await AsyncStorage.getItem("journals");
    let journals = [];
    if (result !== null) journals = JSON.parse(result);

    const newJournals = journals.filter((j) => {
      if (j.id === journal.id) {
        j.title = title;
        j.desc = desc;
        j.isUpdated = true;
        j.time = time;

        setJournal(j);
      }
      return j;
    });

    setJournals(newJournals);
    await AsyncStorage.setItem("journals", JSON.stringify(newJournals));
  };
  const handleOnClose = () => setShowModal(false);

  const openEditModal = () => {
    setIsEdit(true);
    setShowModal(true);
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.time}>
          {journal.isUpdated
            ? `Updated at ${formatDate(journal.time)}`
            : `Created at ${formatDate(journal.time)}`}
        </Text>
        <Text style={styles.title}>{journal.title}</Text>
        <Text style={styles.desc}>{journal.desc}</Text>
      </ScrollView>
      <View style={styles.btnContainer}>
        <RoundIconBtn
          antIconName="delete"
          style={{ backgroundColor: colors.ERROR, marginBottom: 15 }}
          onPress={displayDeleteAlert}
        />
        <RoundIconBtn
          style={{ backgroundColor: colors.PINK }}
          antIconName="edit"
          onPress={openEditModal}
        />
      </View>
      <JournalInputModal
        isEdit={isEdit}
        journal={journal}
        onClose={handleOnClose}
        onSubmit={handleUpdate}
        visible={showModal}
      />
    </>
  );
};

export default JournalDetail;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 15,
  },

  title: {
    marginTop: 10,
    fontSize: 24,
    color: colors.VIOLET,
    fontWeight: "bold",
  },

  desc: {
    marginTop: 10,
    fontSize: 18,
    opacity: 0.6,
  },

  time: {
    textAlign: "right",
    fontSize: 12,
    opacity: 0.5,
  },

  btnContainer: {
    position: "absolute",
    right: 15,
    bottom: 30,
  },
});
