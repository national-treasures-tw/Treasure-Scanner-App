import React from 'react';
import { Text, View, Image, Button } from 'react-native';
import homeStyles from '../Home/styles/HomeStyle'
import { Images } from '../Themes';

export default class ReceiveTask extends React.Component {
  constructor(props) {
    super(props);

  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: `Permission`,
      headerRight: <Button title="Next" color="white" onPress={() => navigation.navigate("Scan")} />,
    }
  };


  render() {
    return (
      <Image
        resizeMode='cover'
        source={Images.copyCenter}
        style={homeStyles.backgroundImage} >
      </Image>
    );
  }
}
