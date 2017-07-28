import React from 'react';
import { ListView, StyleSheet, TouchableOpacity, Text, View, Image, Button } from 'react-native';
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
    return (
      <View style={styles.container}>
        <View style={{marginTop: 20}}>
          {/*<Image source={{uri : base64Icon}} style={theme.cardImageStyle} />*/}
          {/*Use list view*/}
          <TouchableOpacity>
            <Button
              onPress={() => {this.props.navigation.navigate('Form');}}
              title="New form"
              color="#841584"
              accessibilityLabel="Submit a form"
            />
          </TouchableOpacity>
          {this.state.students.length !== 0 ?
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(student) =>
              <View>
                <View key={student._id} style={theme.cardStyle}>
                  <Text style={theme.cardActionStyle}>{student.fullName}                 Total: {student.hours} hours</Text>
                  <Text style={theme.cardContentStyle}>
                    Organizations: {student.organizations.length === 0 ? "None" : student.organizations.filter((item, pos) => student.organizations.indexOf(item) === pos).join(', ')}
                  </Text>
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
    backgroundColor: '#F5FCFF',
  },
});
