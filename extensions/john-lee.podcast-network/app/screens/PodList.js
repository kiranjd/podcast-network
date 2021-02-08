import React, { Component, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { find, isBusy, shouldRefresh, getCollection } from "@shoutem/redux-io";
import { navigateTo } from "shoutem.navigation";

import { NavigationBar } from "shoutem.navigation";
import {
  ImageBackground,
  ListView,
  Tile,
  Title,
  Subtitle,
  Overlay,
  Screen
} from "@shoutem/ui";

import { ext } from "../const";

const renderPodcast = ({ id, name }) => {
  return (
    <Tile>
      <Title>{name}</Title>
    </Tile>
  );
};

const PodList = ({ navigateTo, find, podcasts }) => {
  useEffect(() => {
    if (shouldRefresh(podcasts)) {
      find(ext("Podcasts"), "podcasts");
    }
  }, [podcasts]);

  return (
    <Screen>
      <NavigationBar title="PODCASTS" />
      <ListView
        data={podcasts}
        renderRow={renderPodcast}
        loading={isBusy(podcasts)}
      />
    </Screen>
  );
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
