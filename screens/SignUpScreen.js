import * as React from 'react';
import { Input } from 'react-native-elements';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { createUser } from '../store';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit() {
    this.props.createUser(this.state);
    this.props.navigation.navigate('UserHome');
  }

  render() {
    const { error } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.input}>
            <Input
              name="firstName"
              placeholder="First Name"
              onChangeText={firstName => this.setState({ firstName })}
              value={this.state.firstName}
              errorMessage="This field is required"
            />
          </View>
          <View style={styles.input}>
            <Input
              name="lastName"
              placeholder="Last Name"
              onChangeText={lastName => this.setState({ lastName })}
              value={this.state.lastName}
              errorMessage="This field is required"
            />
          </View>
          <View style={styles.input}>
            <Input
              name="email"
              placeholder="Email"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
              errorMessage="This field is required"
            />
          </View>
          <View style={styles.input}>
            <Input
              name="password"
              placeholder="Password"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
              errorMessage="This field is required"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
              <Text style={styles.buttonText}>SUBMIT</Text>
            </TouchableOpacity>
            {error && error.response && <Text> {error.response.data} </Text>}
          </View>
        </View>
      </View>
    );
  }
}

const mapState = state => {
  return {
    error: state.user.error,
  };
};

const mapDispatch = dispatch => {
  return {
    createUser: user => dispatch(createUser(user)),
  };
};

export default connect(mapState, mapDispatch)(SignUp);

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
