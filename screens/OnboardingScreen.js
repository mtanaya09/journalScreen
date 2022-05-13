import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  StatusBar,
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

const { width, height } = Dimensions.get("window");

const COLORS = { primary: "#FFFFFF", white: "#FFFFFF" };

const slides = [
  {
    id: "1",
    image: require("../assets/onboarding-img1.png"),
  },
  {
    id: "2",
    image: require("../assets/onboarding-img2.png"),
  },
  {
    id: "3",
    image: require("../assets/onboarding-img3.png"),
  },
];
const Slide = ({ item }) => {
  return (
    <View
      style={{
        alignItems: "center",
      }}
    >
      <Image
        source={item.image}
        style={{
          height,
          width,
          resizeMode: "stretch",
          bottom: 0,
        }}
      />
    </View>
  );
};
const OnboardingScreen = ({ navigation }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef(null);
  const Footer = () => {
    return (
      <View
        style={{
          height: height * 0.24,
          justifyContent: "space-between",
          paddingHorizontal: 25,
          position: "absolute",
          bottom: 0,
          width: width,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideIndex == index && {
                  backgroundColor: "#EE5D9E",
                  width: 25,
                },
              ]}
            />
          ))}
        </View>

        {/* views thats holds buttons of next and skip */}

        <View style={{ marginBottom: 12 }}>
          {currentSlideIndex == slides.length - 1 ? (
            <View style={{ height: 50, paddingHorizontal: 60 }}>
              <TouchableOpacity
                style={[styles.btn]}
                onPress={() => navigation.replace("LoginScreen")}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    color: COLORS.white,
                  }}
                >
                  GET STARTED
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity
                style={
                  [
                    styles.btn,
                    {
                      backgroundColor: "transparent",
                      borderWidth: 1.5,
                      borderColor: "#EE5D9E",
                    },
                  ]
                  // { visibility: "hidden" }
                }
                onPress={skip}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    color: "#EE5D9E",
                  }}
                >
                  SKIP
                </Text>
              </TouchableOpacity>
              <View style={{ width: 20 }} />
              <TouchableOpacity
                style={
                  [styles.btn]
                  // { visibility: "hidden" }
                }
                onPress={goNextSlide}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 15,
                    color: COLORS.white,
                  }}
                >
                  NEXT
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  const updateCurrentSlideIndex = (e) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };
  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref?.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(nextSlideIndex);
    }
  };
  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref?.current?.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        data={slides}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => <Slide item={item} />}
      />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  indicator: {
    height: 25,
    width: 25,
    backgroundColor: COLORS.white,
    borderWidth: 1.5,
    borderColor: "#EE5D9E",
    marginHorizontal: 3,
    borderRadius: 100,
  },

  btn: {
    flex: 1,
    height: 50,
    borderRadius: 30,
    backgroundColor: "#EE5D9E",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default OnboardingScreen;
