import React, { Component, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { find, isBusy, shouldRefresh, getCollection } from "@shoutem/redux-io";
import { navigateTo } from "shoutem.navigation";

import { ext } from "../const";

const renderPodcast = ({ id, name }) => {
  return (
    <View key={id}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};

const PodList = ({ navigateTo, find, podcasts }) => {
  useEffect(() => {
    if (shouldRefresh(podcasts)) {
      find(ext("Podcasts"), "podcasts");
    }
  }, []);

  return <View style={styles.container}>{podcasts.map(renderPodcast)}</View>;
};

export default connect(
  state => ({
    podcasts: getCollection(state[ext()]?.allPodcasts, state)
  }),
  {
    navigateTo,
    find
  }
)(PodList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 50
  }
});
