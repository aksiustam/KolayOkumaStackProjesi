import React from "react";
import { Text, View, StyleSheet } from "react-native";

const BookRead = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text>BookRead</Text>
      </View>
    </View>
  );
};

export default BookRead;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
