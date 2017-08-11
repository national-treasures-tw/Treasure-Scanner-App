import React from 'react';
import { Text, View, Image, Button } from 'react-native';
import homeStyles from '../Home/styles/HomeStyle'
import { Images } from '../Themes';

export default class ReceiveTask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      RGNumber: '',
      stackArea: '',
      rowNumber: '',
      compartment: '',
      shelfNumber: '',
      recordIdText: '',
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      title: `Request Form`,
      headerRight: <Button title="Next" onPress={() => navigation.navigate("Scan")} />,
      headerLeft: <Button title="Back" onPress={() => navigation.navigate("SignedIn")} />
    }
  };

  componentDidMount() {
    const initTime = new Date().getTime();
    fetch('https://76k76zdzzl.execute-api.us-east-1.amazonaws.com/stage/dispatch', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 'oh-my-user-id',
        isTest: true
      })
    })
    .then(fetchRes => fetchRes.json())
    .then((res) => {
      // console.log(res);
      console.log(`Wait time: ${new Date().getTime() - initTime} ms`)
      const { StackArea, RGN, Row, Compartment, Shelf, Title, boxRangeString } = res.record;
      this.setState({
        RGNumber: RGN,
        stackArea: StackArea,
        rowNumber: Row,
        compartment: Compartment,
        shelfNumber: Shelf,
        recordIdText: `Box #${boxRangeString.split('-').join(', ')} \n ${Title}`,
      })
    })
  }

  render() {
    const { RGNumber, stackArea, rowNumber, compartment, shelfNumber, recordIdText } = this.state;
  return (
    <Image
      resizeMode='cover'
      source={Images.requestFormImg}
      style={homeStyles.backgroundImage} >
      <View style={homeStyles.container}>
        <Text style={homeStyles.requestorText}>YuCheng Lin</Text>
        <Text style={homeStyles.naIdText}>021755</Text>
        <Text style={homeStyles.RGNumberText}>{RGNumber}</Text>
        <Text style={homeStyles.stackAreaText}>{stackArea}</Text>
        <Text style={homeStyles.rowNumberText}>{rowNumber}</Text>
        <Text style={homeStyles.compartmentText}>{compartment}</Text>
        <Text style={homeStyles.shelfNumberText}>{shelfNumber}</Text>
        <Text style={homeStyles.recordIdText}>{recordIdText}</Text>
      </View>
    </Image>
  )}
}
