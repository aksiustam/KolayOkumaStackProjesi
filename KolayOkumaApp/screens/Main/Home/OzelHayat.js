import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Ozel = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text>Ozel!</Text>
      </View>
    </View>
  );
};

export default Ozel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
