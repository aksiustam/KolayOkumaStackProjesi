import React from "react";
import { SafeAreaView, StyleSheet, Dimensions, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import PageOne from "../../components/LoginMenu/PageOne";
import Slider from "../../components/LoginMenu/Slider";
import PageTwo from "../../components/LoginMenu/PageTwo";

const Login = () => {
  const ITEM_WIDTH = Dimensions.get("window").width;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={["#0B4455", "#086D65"]}
        style={{ flex: 1, zIndex: -5 }}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.9, y: 0.9 }}
        locations={[0.1, 0.7]}
      >
        {
          <ScrollView
            horizontal={true}
            decelerationRate={0.09}
            snapToInterval={ITEM_WIDTH}
            bounces={false}
            scrollEventThrottle={6}
            nestedScrollEnabled={true}
          >
            <PageOne />
            <PageTwo />
            <Slider />
          </ScrollView>
        }
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  fullcontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: Dimensions.get("window").width,
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    width: Dimensions.get("window").width / 1.5,
    height: Dimensions.get("window").height / 3,
    borderColor: "lightgrey",
    borderWidth: 11,
    borderRadius: 30,
  },
});
