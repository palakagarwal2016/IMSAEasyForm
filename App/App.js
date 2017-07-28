import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ListView,
  Alert,
  Button,
  Image,
  RefreshControl
} from 'react-native';
import MainPage from './components/mainpage';
import Register from './components/register';
import Form from './components/form';
import { StackNavigator } from 'react-navigation';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fullName: '',
      password: ''
    }
  }

  static navigationOptions = {
    title: 'Home'
  };

  login() {
    fetch('https://shrouded-tor-50203.herokuapp.com/login', {
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
          'Logged in successfully!', // Button
        )
        AsyncStorage.setItem('user', this.state.fullName).then(() => {
          this.props.navigation.navigate('MainPage');
        });
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
  register() {
    this.props.navigation.navigate('Register');
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{height: 250, width: 250}}
          source={require('./logoeasy.png')}
        />
        <Image
          // style={{height: 110, width: 110}}
          source={{uri: './logoeasy.png'}}
        />
        <Text>{"\n"}</Text>
        <TextInput
          placeholderTextColor='#87849a'
          style={{height: 40, width: 400, backgroundColor: '#353344', textAlign: 'center', margin: 10, color: 'white'}}
          placeholder="Full Name"
          onChangeText={(text) => this.setState({fullName: text})}
          value={this.state.fullName}
        />
        <TextInput
          placeholderTextColor='#87849a'
          style={{height: 40, width: 400, backgroundColor: '#353344', textAlign: 'center', margin: 10, color: 'white'}}
          placeholder="Password"
          onChangeText={(text) => this.setState({password: text})}
          secureTextEntry={true}
          value={this.state.password}
        />
        <TouchableOpacity onPress={() => {this.login()} } style={[styles.button, styles.buttonGreen]}>
          <Text style={styles.buttonLabel}>Log in</Text>
        </TouchableOpacity>
        <Text>{"\n"}</Text>
        <Text>{"\n"}</Text>
        <Text>{"\n"}</Text>
        <TouchableOpacity onPress={() => {this.register()} }>
          <Text style={styles.buttonLabel}>Don't have an account? Register Here.</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default StackNavigator({
  Home: {
    screen: Home,
  },
  MainPage: {
    screen: MainPage,
  },
  Register: {
    screen: Register,
  },
  Form: {
    screen: Form,
  },
}, {initialRouteName: 'Home'});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#353344',
    padding: 0,
    margin: 0
  },
  button: {
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 0
  },
  buttonBlue: {
    backgroundColor: '#0074D9',
  },
  buttonGreen: {
    width: 250,
    justifyContent: 'center',
    backgroundColor: '#302d41'
  },
  buttonLabel: {
    textAlign: 'center',
    fontSize: 16,
    color: '#87849a'
  }
});
