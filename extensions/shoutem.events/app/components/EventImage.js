import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';

import { ImageBackground } from '@shoutem/ui';

function EventImage(props) {
  return (
    <ImageBackground
      {...props}
      styleName={`placeholder ${props.styleName}`}
      source={{ uri: _.get(props.event, 'image.url') }}
    >
      {props.children}
    </ImageBackground>
  );
}

EventImage.propTypes = {
  event: PropTypes.object,
  styleName: PropTypes.string,
  animationName: PropTypes.string,
  children: PropTypes.node,
};

export default EventImage;
