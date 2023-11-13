import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Ders = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text>Ders!</Text>
      </View>
    </View>
  );
};

export default Ders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
