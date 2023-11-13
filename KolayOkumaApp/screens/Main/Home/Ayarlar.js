import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Ayarlar = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text>Ayarlar</Text>
      </View>
    </View>
  );
};

export default Ayarlar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
