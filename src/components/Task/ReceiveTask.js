import React from 'react';
import { Text, View, Image, Button } from 'react-native';
import homeStyles from '../Home/styles/HomeStyle'
import { Images } from '../Themes';
import { connect } from 'react-redux';
import * as actions from '../../actions/actions';
import { bindActionCreators } from 'redux';

class ReceiveTask extends React.Component {
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
      headerRight: <Button title="Permission" color="white" onPress={() => navigation.navigate("CopyCenter")} />,
      headerLeft: <Button title="Back" color="white" onPress={() => navigation.navigate("LocationPicker")} />
    }
  };

  componentDidMount() {
    const { user } = this.props;
    const initTime = new Date().getTime();
    if (!user.record && user.location === 'NARA') {
      fetch('https://76k76zdzzl.execute-api.us-east-1.amazonaws.com/stage/dispatch', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.details.info.userId,
          isTest: true
        })
      })
      .then(fetchRes => fetchRes.json())
      .then((res) => {
        // console.log(res);
        console.log(`Wait time: ${new Date().getTime() - initTime} ms`);
        const { StackArea, RGN, Row, Compartment, Shelf, Title, boxRangeString, dispatchId, uid, NAID, EN } = res.record;
        const normalizedRecord = {
          dispatchId,
          catalogId: uid,
          RGNumber: RGN,
          stackArea: StackArea,
          rowNumber: Row,
          compartment: Compartment,
          shelfNumber: Shelf,
          NAID,
          EN,
          boxRangeString,
          Title
        };
        this.props.receiveRecord(normalizedRecord);
      })
    }
  }

  render() {
    const { record } = this.props.user || {};
    const {  RGNumber, stackArea, rowNumber, compartment, shelfNumber, Title, EN, boxRangeString, NAID } = record || {};
    const titleArray = Title && Title.split('\n');
    const seriesName = Title && (titleArray[1].includes('Series') ? titleArray[1] : titleArray[0]);
    return (
      <Image
        resizeMode='cover'
        source={Images.requestFormImg}
        style={homeStyles.backgroundImage} >
        <View style={homeStyles.container}>
          <Text style={homeStyles.requestorTextLastName}>Last Name</Text>
          <Text style={homeStyles.requestorTextFirstName}>First Name</Text>
          <Text style={homeStyles.naIdText}>ID Number</Text>
          <Text style={homeStyles.RGNumberText}>{RGNumber}</Text>
          <Text style={homeStyles.entryNumberText}>{EN}</Text>
          <Text style={homeStyles.NAIDText}>{NAID}</Text>
          <Text style={homeStyles.boxNumberText}>{boxRangeString}</Text>
          <Text style={homeStyles.stackAreaText}>{stackArea}</Text>
          <Text style={homeStyles.rowNumberText}>{rowNumber}</Text>
          <Text style={homeStyles.compartmentText}>{compartment}</Text>
          <Text style={homeStyles.shelfNumberText}>{shelfNumber}</Text>
          <Text style={homeStyles.recordIdText}>{seriesName}</Text>
        </View>
      </Image>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveTask);
