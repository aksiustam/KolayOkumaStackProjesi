import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Kisa = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text>Kisa!</Text>
      </View>
    </View>
  );
};

export default Kisa;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
