import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MyPlans from "../PlansButton/MyPlans";
import FindPlans from "../PlansButton/FindPlans";
import Intro from "../journal-screens/Intro";
import JournalScreen from "../journal-screens/JournalScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import JournalDetail from "../components/JournalDetail";
import JournalProvider from "../context/JournalProvider";

const Tab = createMaterialTopTabNavigator();

const Stack = createNativeStackNavigator();

function MyTabs() {
  const insets = useSafeAreaInsets();

  //for journal screen user info

  const [user, setUser] = useState({});
  const [isAppFirstTimeOpen, setIsAppFirstTimeOpen] = useState(false);
  const findUser = async () => {
    const result = await AsyncStorage.getItem("user");

    if (result === null) return setIsAppFirstTimeOpen(true);

    setUser(JSON.parse(result));
    setIsAppFirstTimeOpen(false);
  };

  useEffect(() => {
    findUser();
    // AsyncStorage.clear();
  }, []);

  const RenderJournalScreen = (props) => (
    <JournalScreen {...props} user={user} />
  );

  if (isAppFirstTimeOpen) return <Intro onFinish={findUser} />;

  return (
    // <Tab.Navigator
    //   initialRouteName="My Plans"
    //   tabBarOptions={{
    //     activeTintColor: "black",
    //     labelStyle: { fontSize: 13, fontWeight: "bold" },
    //     user: { user },

    //     indicatorStyle: {
    //       backgroundColor: "red",
    //     },

    //     style: {
    //       marginTop: insets.top,
    //       marginRight: 118,
    //       elevation: 0,
    //       shadowOpacity: 0,
    //       borderWidth: 0,
    //       backgroundColor: "#ffffff",
    //     },
    //   }}
    //   style={{ backgroundColor: "#ffffff" }}
    // >
    //   <Tab.Screen
    //     name="My Plans"
    //     children={() => <JournalScreen user={user} />}
    //     option={{ tabBarLabel: "MyPlans" }}
    //   />

    //   <Tab.Screen
    //     name="Find Plans"
    //     component={FindPlans}
    //     option={{ tabBarLabel: "FindPlans" }}
    //   />
    // </Tab.Navigator>
    <JournalProvider>
      <Stack.Navigator
        screenOptions={{ headerTitle: "", headerTransparent: true }}
      >
        <Stack.Screen component={RenderJournalScreen} name={"JournalScreen"} />
        <Stack.Screen component={JournalDetail} name={"JournalDetail"} />
      </Stack.Navigator>
    </JournalProvider>

    // <JournalScreen user={user} />
  );
}

export default function PlanScreen() {
  return <MyTabs />;
}
