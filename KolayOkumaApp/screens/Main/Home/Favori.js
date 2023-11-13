import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Favori = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text>Favori!</Text>
      </View>
    </View>
  );
};

export default Favori;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
