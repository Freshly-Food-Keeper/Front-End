import * as React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Alert } from "react-native";
import { Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { createUser, removeError } from '../store';
import { Formik } from "formik";
import * as Yup from "yup";

class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  async handleSubmit(values) {
    const email = values.email.toLowerCase();

    await this.props.createUser({ ...values, email });

    if (!this.props.error){
      this.props.navigation.navigate('App');
    }
  }

  render() {
    const { error } = this.props;

    if(error) {
      Alert.alert(
        'Oops!',
        error.response.data,
        [
          {text: 'OK', onPress: this.props.removeError,}
        ],
        {cancelable: false},
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <Formik
            initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
            validationSchema={Yup.object({
              firstName: Yup.string()
                .min(2, "Names must be at least 2 characters long")
                .required("Please enter your first name"),
              lastName: Yup.string()
                .min(2, "Names must be at least 2 characters long")
                .required("Please enter your last name"),
              email: Yup.string()
                .email("Please enter a valid email address")
                .required("Please enter your email address"),
              password: Yup.string()
                .min(8, "Password must be at least 8 characters long")
                .required("Please enter a password")
            })}
            onSubmit={this.handleSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isValid
            }) => (
              <React.Fragment>
                <View style={styles.input}>
                  <Input
                    onChangeText={handleChange("firstName")}
                    onBlur={handleBlur("firstName")}
                    value={values.firstName}
                    placeholder="First Name"
                  />
                  {touched.firstName && errors.firstName ? (
                    <Text style={styles.errorText}>{errors.firstName}</Text>
                  ) : null}
                </View>

                <View style={styles.input}>
                  <Input
                    onChangeText={handleChange("lastName")}
                    onBlur={handleBlur("lastName")}
                    value={values.lastName}
                    placeholder="Last Name"
                  />
                  {touched.lastName && errors.lastName ? (
                    <Text style={styles.errorText}>{errors.lastName}</Text>
                  ) : null}
                </View>

                <View style={styles.input}>
                  <Input
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    placeholder="Email"
                  />
                  {touched.email && errors.email ? (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  ) : null}
                </View>

                <View style={styles.input}>
                  <Input
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    placeholder="Password"
                    secureTextEntry={true}
                  />
                  {touched.password && errors.password ? (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  ) : null}
                </View>

                <View>
                  <TouchableOpacity
                    style={[styles.button, !isValid && { opacity: 0.7 }]}
                    disabled={!isValid}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.buttonText}>LOGIN</Text>
                  </TouchableOpacity>
                </View>
              </React.Fragment>
            )}
          </Formik>
        </View>
      </View>
    );
  }
}

SignUp.navigationOptions = ({ navigation }) => {
  return {
    headerTitle: 'Create Account',
    headerRight: <Button
      onPress={() => {
        navigation.navigate('Login')
      }}
      title="Login"
      color="#fff" 
    />,
    headerStyle: {
      backgroundColor: '#035640',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
};

const mapState = state => {
  return {
    error: state.user.signUpError,
  };
};

const mapDispatch = dispatch => {
  return {
    createUser: user => dispatch(createUser(user)),
    removeError: () => dispatch(removeError())
  };
};

export default connect(mapState, mapDispatch)(SignUp);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#035640",
    alignItems: "center"
  },
  form: {
    backgroundColor: "white",
    width: "90%",
    padding: 10,
    marginTop: 50,
    borderRadius: 8
  },
  input: {
    padding: 3,
    margin: 10,
    fontSize: 20,
    borderRadius: 5
  },
  image: {
    flex: 1,
    height: null,
    width: null
  },
  button: {
    backgroundColor: "#035640",
    padding: 15,
    margin: 15,
    borderRadius: 5
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 20
  },
  errorText: {
    color: "#f44336",
    fontSize: 12,
    marginLeft: 10,
    marginTop: 2
  }
});
