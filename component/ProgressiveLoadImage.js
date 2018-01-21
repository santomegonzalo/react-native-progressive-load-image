import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Animated
} from 'react-native';

class ProgressiveImage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      opacity: new Animated.Value(0)
    };
  }

  componentWillReceiveProps(nextProps) {
    const { isClosing } = nextProps;

    if (isClosing) {
      const { opacity } = this.state;

      Animated.timing(opacity, {
        toValue: 0,
        duration: 100
      }).start();
    }
  }

  onLoad = () => {
    const { opacity } = this.state;

    Animated.timing(opacity, {
      toValue: 1,
      duration: 400
    }).start();
  };

  render() {
    const {
      backgroundColor,
      isClosing,
      style,
      ...imageProps
    } = this.props;
    const {
      opacity,
      ...viewStyle
    } = style;

    return (
      <Animated.View
        style={[
          viewStyle,
          {
            backgroundColor,
            opacity: this.state.opacity
          }
        ]}
      >
        <Animated.Image
          {...imageProps}
          style={[
            style,
            {
              opacity: this.state.opacity
            }
          ]}
          onLoad={this.onLoad}
        />
      </Animated.View>
    );
  }
}

ProgressiveImage.defaultProps = {
  backgroundColor: '#ffffff'
};

ProgressiveImage.propTypes = {
  backgroundColor: PropTypes.string,
  style: PropTypes.any,
  imageProps: PropTypes.any,
  isClosing: PropTypes.bool
};

export default ProgressiveImage;
