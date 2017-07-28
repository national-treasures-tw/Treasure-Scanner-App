import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Dimensions,
  Image
} from 'react-native';

export const winSize = Dimensions.get('window');

const ReviewDocument = ({ image }) => {
  return (
    <View style={styles.listItem}>
      <Image
        style={styles.image}
        source={{ uri: `file://${image}`, scale: 1 }}
      />
    </View>
  )
};

ReviewDocument.propTypes = {
  image: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  listItem: {
    width: winSize.width,
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: winSize.width - 20,
    height: winSize.height - 136,
    resizeMode: Image.resizeMode.contain,
  },
});

export default ReviewDocument;

