import React from 'react';
import { ListView, StyleSheet, TouchableOpacity, Text, View, Image } from 'react-native';
import {
  getTheme,
} from 'react-native-material-kit';
const theme = getTheme();

export default class MainPage extends React.Component {
  static navigationOptions = {
    title: 'Completed forms'
  };

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      students: [],
      dataSource: ds.cloneWithRows([]),
    }
  }

  componentDidMount() {
    fetch('https://shrouded-tor-50203.herokuapp.com/students')
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.success) {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          students: responseJson.students,
          dataSource: ds.cloneWithRows(responseJson.students)
        });
      } else {
        Alert.alert(
          'Error loading students',
          responseJson.error, // Button
        )
      }
    })
    .catch((err) => {
      console.log('error:', err);
    });
  }

  render() {
    const font = 'KohinoorTelugu-Light';
    return (
      <View style={styles.container}>
        <View style={{marginTop: 20}}>
          {/*<Image source={{uri : base64Icon}} style={theme.cardImageStyle} />*/}
          {/*Use list view*/}
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity>
              <Text onPress={() => this.props.navigation.navigate('Form')} style={{fontSize: 20, color: 'white', fontFamily: font}}>New form</Text>
            </TouchableOpacity>
          </View>
          {this.state.students.length !== 0 ?
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(student) =>
              <View>
                <View key={student._id} style={theme.cardStyle, styles.card}>
                  <View style={{backgroundColor: '#87849a'}}><Text style={theme.cardActionStyle}><Text style={{color: 'white', fontFamily: font}}>{student.fullName}                 Total: {student.hours} hours</Text></Text>
                  <Text style={theme.cardContentStyle}>
                    <Text style={{fontFamily: font, color: '#343243'}}>Organizations: {student.organizations.length === 0 ? "None" : student.organizations.filter((item, pos) => student.organizations.indexOf(item) === pos).join(', ')}</Text>
                  </Text>
                </View>
                </View>
              <Text>{"\n"}</Text>
            </View>
            }
            />
            : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#343243',
  },
  card: {
    backgroundColor: '#87849a'
  }
});
