import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
} from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

const COLORS = { primary: "#00004a", white: "#f5f5ff" };

export default function MyPlans() {
  const [textInput, setTextInput] = React.useState("");
  const [journals, setJournals] = React.useState([
    { id: 1, task: "First Journal", completed: false },
    { id: 2, task: "Second Journal", completed: false },
  ]);

  const ListItem = ({ journal }) => {
    return (
      <View style={styles.listItem}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 15,
              color: COLORS.primary,
              textDecorationLine: journal?.completed ? "line-through" : "none",
            }}
          >
            {journal?.task}
          </Text>
        </View>

        {!journal?.completed && (
          <TouchableOpacity
            // style={[styles.actionIcon]}
            style={{ visibility: "hidden" }}
            onPress={() => markJournalComplete(journal?.id)}
          >
            <Icon name="done" size={18} color={COLORS.white} />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.actionIcon, { backgroundColor: "#1f145c" }]}
          onPress={() => deleteJournal(journal?.id)}
        >
          <Icon name="delete" size={18} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    );
  };

  const addJournal = () => {
    if (textInput == "") {
      Alert.alert("Error", "Please type something");
    } else {
      const newJournal = {
        id: Math.random(),
        task: textInput,
        completed: false,
      };
      setJournals([...journals, newJournal]);
      setTextInput("");
    }
  };

  const markJournalComplete = (journalId) => {
    const newJournals = journals.map((item) => {
      if (item.id == journalId) {
        return { ...item, completed: true };
      }
      return item;
    });
    setJournals(newJournals);
  };

  const deleteJournal = (journalId) => {
    const newJournals = journals.filter((item) => item.id != journalId);
    setJournals(newJournals);
  };

  const clearJournals = () => {
    Alert.alert("Confirm", "Delete your journals?", [
      {
        text: "Yes",
        onPress: () => setJournals([]),
      },
      {
        text: "No",
      },
    ]);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#00004a" }}>
      <View style={styles.header}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            color: "#f5f5ff",
            marginLeft: 15,
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          YOUR JOURNAL
        </Text>
        <Icon name="delete" size={25} color="#f5f5ff" onPress={clearJournals} />
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: "#0f0f8c",
          marginLeft: 15,
          marginRight: 15,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          data={journals}
          renderItem={({ item }) => <ListItem journal={item} />}
        />

        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Add Journal"
              color={"#f5f5ff"}
              placeholderTextColor="#7a7a7a"
              value={textInput}
              onChangeText={(text) => setTextInput(text)}
            />
          </View>

          <TouchableOpacity onPress={addJournal}>
            <View style={styles.iconContainer}>
              <Icon name="add" color={COLORS.white} size={22} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: "#200669",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  listItem: {
    padding: 20,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    elevation: 5,
    borderRadius: 7,
    marginVertical: 10,
  },
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  footer: {
    position: "absolute",
    color: COLORS.white,
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  inputContainer: {
    flex: 1,
    height: 50,
    backgroundColor: COLORS.primary,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
    paddingHorizontal: 20,
    justifyContent: "center",
  },

  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: "#5959ff",
    borderRadius: 25,
    elevation: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  imahe: {
    marginRight: 10,
    width: 35,
    height: 30,
    tintColor: "#d0d0d9",
  },
});
