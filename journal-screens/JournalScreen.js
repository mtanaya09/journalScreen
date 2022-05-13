import {
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import RoundIconBtn from "../components/RoundIconBtn";
import JournalInputModal from "./JournalInputModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { set } from "react-native-reanimated";
import Journal from "./Journal";
import { useJournals } from "../context/JournalProvider";
import NotFound from "../components/NotFound";
import colors from "../misc/colors";

//to display journal arrange by date created

const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width;

const reverseData = (data) => {
  return data.sort((a, b) => {
    const aInt = parseInt(a.time);
    const bInt = parseInt(b.time);
    if (aInt < bInt) return 1;
    if (aInt == bInt) return 0;
    if (aInt > bInt) return -1;
  });
};

const JournalScreen = ({ user, navigation }) => {
  const [greet, setGreet] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [resultNotFound, setResultNotFound] = useState(false);

  const { journals, setJournals, findJournals } = useJournals();

  const findGreet = () => {
    const hrs = new Date().getHours();
    if (hrs === 0 || hrs < 12) return setGreet("Morning");
    if (hrs === 1 || hrs < 17) return setGreet("Afternoon");
    setGreet("Afternoon");
  };

  useEffect(() => {
    findGreet();
  }, []);

  const reverseJournals = reverseData(journals);

  const handleOnSubmit = async (title, desc) => {
    const journal = { id: Date.now(), title, desc, time: Date.now() };
    const updatedJournals = [...journals, journal];
    setJournals(updatedJournals);
    await AsyncStorage.setItem("journals", JSON.stringify(updatedJournals));
  };

  const openJournal = (journal) => {
    navigation.navigate("JournalDetail", { journal });
  };

  const handleOnSearchInput = async (text) => {
    setSearchQuery(text);
    if (!text.trim()) {
      setSearchQuery("");
      setResultNotFound(false);
      return await findJournals();
    }
    const filteredJournals = journals.filter((journal) => {
      if (journal.title.toLowerCase().includes(text.toLowerCase())) {
        return journal;
      }
    });

    if (filteredJournals.length) {
      setJournals([...filteredJournals]);
    } else {
      setResultNotFound(true);
    }
  };

  const handleOnClear = async () => {
    setSearchQuery("");
    setResultNotFound(false);
    await findJournals();
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.journalBG}></View>
          <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
          {journals.length ? (
            <SearchBar
              value={searchQuery}
              onChangeText={handleOnSearchInput}
              containerStyle={{ marginVertical: 15 }}
              onClear={handleOnClear}
            />
          ) : null}

          {resultNotFound ? (
            <NotFound />
          ) : (
            <FlatList
              style={{
                paddingHorizontal: 25,
                marginTop: 35,
                marginBottom: 5,
              }}
              data={reverseJournals}
              // numColumns={2}
              // columnWrapperStyle={{
              //   justifyContent: "space-between",
              //   marginBottom: 10,
              // }}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Journal onPress={() => openJournal(item)} item={item} />
              )}
            />
          )}

          {!journals.length ? (
            <View
              style={[
                StyleSheet.absoluteFillObject,
                styles.emptyHeaderContainer,
              ]}
            >
              <Text style={styles.emptyHeader}>Add Journal</Text>
            </View>
          ) : null}
        </View>
      </TouchableWithoutFeedback>
      <RoundIconBtn
        onPress={() => setModalVisible(true)}
        antIconName="plus"
        size={20}
        style={styles.addBtn}
      />
      <JournalInputModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
      />
    </>
  );
};

export default JournalScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.DARKBLUE,
    flex: 1,
  },

  header: {
    fontSize: 22,
    marginTop: 45,
    color: colors.GRAY,
    marginBottom: 10,
    alignSelf: "flex-start",
    marginLeft: 20,
    fontWeight: "bold",
  },

  emptyHeader: {
    fontSize: 30,
    textTransform: "uppercase",
    fontWeight: "bold",
    opacity: 0.2,
  },

  emptyHeaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
  },

  addBtn: {
    position: "absolute",
    right: 15,
    bottom: 30,
    zIndex: 1,
  },

  journalBG: {
    backgroundColor: colors.VIOLET,
    height: height * 0.6,
    alignSelf: "center",
    width: "95%",
    position: "absolute",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    bottom: 0,
  },
});
