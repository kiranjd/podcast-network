
import React, { Component, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";
import { find, isBusy, shouldRefresh, getCollection } from "@shoutem/redux-io";
import { navigateTo } from "shoutem.navigation";

import { ext } from "../const";

import {   
  TouchableOpacity,
  Title,
  Caption,
  Tile,
  ImageBackground} from '@shoutem/ui';

const renderPodcast = ({ id, name }) => {
  return (
    <View key={id}>
      <Text style={styles.text}>name: {name}</Text>
    </View>
  );
};

const PodList = ({ navigateTo, find, podcasts }) => {
  useEffect(() => {
    if (shouldRefresh(podcasts)) {
      find(ext("Podcasts"), "podcasts");
    }
  }, []);

  return (
    <View>
      <View style={styles.container}>{podcasts.map(renderPodcast)}</View>
      <TouchableOpacity>
        <View styleName="sm-gutter featured">
          <ImageBackground styleName="featured placeholder">
            <Tile>
              <Title>Featured Podcast Name</Title>
              <View styleName="horizontal md-gutter-top" virtual>
                <Caption numberOfLines={1} styleName="collapsible">caption</Caption>
              </View>
            </Tile>            
          </ImageBackground>
        </View>
      </TouchableOpacity>
    </View>
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
    alignItems: "center"
  },
  text: {
    fontSize: 50
  }
});

