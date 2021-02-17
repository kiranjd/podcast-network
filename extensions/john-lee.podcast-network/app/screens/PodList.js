import React, { useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import { find, isBusy, shouldRefresh, getCollection } from "@shoutem/redux-io";
import { navigateTo, NavigationBar } from "shoutem.navigation";

import {
  ImageBackground,
  ListView,
  Tile,
  Title,
  Subtitle,
  Overlay,
  Screen,
  Caption,
  Row
} from "@shoutem/ui";

import { ext } from "../const";

const renderPodcast = ({ id, name }, onPress) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Row key={id} style={styles.podcastItem}>
        <Image
          style={styles.podcastImage}
          source={{
            uri: "https://shoutem.github.io/img/ui-toolkit/examples/image-6.png"
          }}
        />
        <View styleName="stretch space-between">
          <Subtitle>{name}</Subtitle>
          <Caption>Educational Podcast</Caption>
        </View>
      </Row>
    </TouchableOpacity>
  );
};

const PodList = ({ navigateTo, find, podcasts }) => {
  useEffect(() => {
    if (shouldRefresh(podcasts)) {
      find(ext("Podcasts"), "all");
    }
  });

  const onPodcastPress = () => {
    navigateTo({
      screen: "shoutem.podcast.EpisodesListScreen",
      props: { podcasts }
    });
  };

  return (
    <Screen>
      <NavigationBar centerComponent={<Title>TITLE</Title>} />
      <ListView
        loading={isBusy(podcasts)}
        data={podcasts}
        renderRow={item => renderPodcast(item, onPodcastPress)}
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
  },
  podcastItem: {
    marginBottom: 4
  },
  podcastImage: {
    marginLeft: 4,
    marginRight: 8,
    width: 40,
    height: 40,
    borderRadius: 4
  }
});
