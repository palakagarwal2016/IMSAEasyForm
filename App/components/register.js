import React from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      password: ''
    }
  }

  static navigationOptions = {
    title: 'Register'
  };

  register() {
    fetch('https://shrouded-tor-50203.herokuapp.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: this.state.fullName.trim(),
        password: this.state.password
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.success) {
        Alert.alert(
          'Success',
          'Registered successfully!', // Button
        )
        this.props.navigation.navigate('Home');
      } else {
        Alert.alert(
          'Error',
          responseJson.error, // Button
        )
      }
      this.setState({
        fullName: '',
        password: ''
      });
    })
    .catch((err) => {
      console.log('error:', err);
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{marginTop: 90, height: 40, width: 400, borderColor: 'white', borderWidth: 0.5, textAlign: 'center', margin: 10}}
          placeholder="Full Name"
          onChangeText={(text) => this.setState({fullName: text})}
        />
        <TextInput
          style={{height: 40, width: 400, borderColor: 'white', borderWidth: 0.25, textAlign: 'center', margin: 10}}
          placeholder="Password"
          onChangeText={(text) => this.setState({password: text})}
          secureTextEntry={true}
        />
        <TouchableOpacity onPress={ () => {this.register()} } style={[styles.button, styles.buttonGreen]}>
          <Text style={styles.buttonLabel}>Register</Text>
        </TouchableOpacity>
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
  button: {
    alignSelf: 'stretch',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5
  },
  buttonBlue: {
    backgroundColor: '#0074D9',
  },
  buttonGreen: {
    backgroundColor: '#2ECC40'
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 16,
    color: 'white'
  }
});
