import * as React from 'react';
import { Input } from 'react-native-elements';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <View style={{ ...StyleSheet.absoluteFill }}>
          <Image
            source={require('../assets/images/background.jpeg')}
            style={styles.image}
          />
        </View> */}

        <Text style={styles.header}>Login</Text>
        <View style={styles.form}>
          <View style={styles.input}>
            <Input
              name="email"
              placeholder="Email"
              onChangeText={text => this.handleChange}
              errorMessage="This field is required"
            />
          </View>
          <View style={styles.input}>
            <Input
              name="password"
              placeholder="Password"
              onChangeText={text => this.handleChange}
              errorMessage="This field is required"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#035640',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 0,
    margin: 0,
    fontSize: 30,
    color: 'white',
  },
  form: {
    backgroundColor: 'white',
    width: '80%',
    padding: 15,
    margin: 15,
    borderRadius: 5,
  },
  input: {
    padding: 3,
    margin: 3,
    fontSize: 20,
    // backgroundColor: 'white',
    width: 300,
    borderRadius: 5,
  },
  image: {
    flex: 1,
    height: null,
    width: null,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#035640',
    width: 300,
    padding: 15,
    margin: 15,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
});
