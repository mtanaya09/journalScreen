import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Icons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./homeScreen";
import SearchScreen from "./searchScreen";
import SettingsScreen from "./settingScreen";
import LottieView from "lottie-react-native";
import "react-native-gesture-handler";
import PlanScreen from "./planScreen";
import BibleScreen from "./bibleScreen";

function TabNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let filePath;
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
            filePath = require("../assets/animation/homepage.json");
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
            filePath = require("../assets/animation/search7.json");
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings1-outline";
            filePath = require("../assets/animation/settings2.json");
          } else if (route.name === "Bible") {
            iconName = focused ? "home" : "home-outline";
            filePath = require("../assets/animation/bible2.json");
          } else if (route.name === "Plans") {
            iconName = focused ? "home" : "home-outline";
            filePath = require("../assets/animation/leaf3.json");
          }

          //return <Icons name={iconName} size={30} color={color}  />
          return (
            <LottieView
              source={filePath}
              autoPlay={focused}
              style={styles.lottieButtons}
            />
          );
        },
        tabBarActiveTintColor: "#ffefd5",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#000080",
          height: 65,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Bible" component={BibleScreen} />
      <Tab.Screen
        name="Plans"
        component={PlanScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function FirstItem(navigation) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fa8072",
      }}
    >
      <Text style={{ fontSize: 20, color: "black", fontWeight: "800" }}>
        DRAWER
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

function Profile(navigation) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ff1493",
      }}
    >
      <Text style={{ fontSize: 20, color: "white", fontWeight: "800" }}>
        PROFILE
      </Text>

      <Text
        style={{
          fontSize: 15,
          color: "white",
          fontWeight: "800",
          marginTop: 10,
          padding: 10,
        }}
      >
        yes you can!!
      </Text>
    </View>
  );
}

function Notifications(navigation) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#deb887",
      }}
    >
      <Text style={{ fontSize: 20, color: "white", fontWeight: "800" }}>
        NOTIFICATIONS
      </Text>

      <Text
        style={{
          fontSize: 15,
          color: "white",
          fontWeight: "800",
          marginTop: 10,
          padding: 10,
        }}
      >
        Welcome
      </Text>
    </View>
  );
}

function Friends(navigation) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#5f9ea0",
      }}
    >
      <Text style={{ fontSize: 20, color: "white", fontWeight: "800" }}>
        FRIENDS
      </Text>

      <Text
        style={{
          fontSize: 15,
          color: "white",
          fontWeight: "800",
          marginTop: 10,
          padding: 10,
        }}
      >
        Hello
      </Text>
    </View>
  );
}

function VerseoftheDay(navigation) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#b8860b",
      }}
    >
      <Text style={{ fontSize: 20, color: "white", fontWeight: "800" }}>
        VERSE OF THE DAY
      </Text>

      <Text
        style={{
          fontSize: 15,
          color: "white",
          fontWeight: "800",
          marginTop: 10,
          padding: 10,
        }}
      >
        'You must be the change you wish to see in the world'
      </Text>
    </View>
  );
}

function Videos(navigation) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#6495ed",
      }}
    >
      <Text style={{ fontSize: 20, color: "white", fontWeight: "800" }}>
        VIDEOS
      </Text>

      <Text
        style={{
          fontSize: 15,
          color: "white",
          fontWeight: "800",
          marginTop: 10,
          padding: 10,
        }}
      >
        Have Fun!!
      </Text>
    </View>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation={true}
      initialRouteName="FirstItem"
    >
      <Drawer.Screen
        name="Main"
        component={TabNavigation}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Icons name="home" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Details"
        component={FirstItem}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Icons name="folder" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Icons name="person" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Icons name="notifications" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Friends"
        component={Friends}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Icons name="people" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Verse of the Day"
        component={VerseoftheDay}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Icons name="sunny" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Videos"
        component={Videos}
        options={{
          headerShown: false,
          drawerIcon: ({ color }) => (
            <Icons name="logo-youtube" size={22} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
const styles = StyleSheet.create({
  lottieButtons: {
    position: "absolute",
    height: "110%",
    width: "110%",
  },
});

export default function MainScreen({ navigation }) {
  return <MyDrawer />;
}
