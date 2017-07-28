import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Dimensions,
  Text
} from 'react-native';

export const winSize = Dimensions.get('window');

const ReviewStats = ({ documentCount, stats }) => {

  if(documentCount === 0) {
    return  (
      <View style={styles.stats}>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>Your scanned documents will appear here</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.stats}>
      {Object.keys(stats).map(key => (
        <View style={styles.infoContainer} key={key}>
          <Text style={styles.info}>{key}</Text>
          <Text style={styles.info}>{stats[key]}</Text>
        </View>
      ))}
    </View>
  )
};

ReviewStats.propTypes = {
  stats: PropTypes.shape({
    Archived: PropTypes.number.isRequired,
    Deleted: PropTypes.number.isRequired,
    Pending: PropTypes.number.isRequired,
    Uploading: PropTypes.number.isRequired,
    Uploaded: PropTypes.number.isRequired,
    Failed: PropTypes.number.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  stats: {
    width: winSize.width,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    textAlign: 'center',
    color: 'gray'
  },
});

export default ReviewStats;

