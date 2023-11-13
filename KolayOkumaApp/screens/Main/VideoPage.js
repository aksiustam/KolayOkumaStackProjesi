import React from "react";
import { Text, View, StyleSheet } from "react-native";

const VideoPage = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text>VideoPage</Text>
      </View>
    </View>
  );
};

export default VideoPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
