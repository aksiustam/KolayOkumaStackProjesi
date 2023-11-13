import React from "react";
import { Text, View, StyleSheet } from "react-native";

const Profile = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text>Porfile!</Text>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
