import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Kutuphane = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text>Kutuphane!</Text>
      </View>
    </View>
  );
};

export default Kutuphane;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
