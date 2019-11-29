import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import { Button, ThemeProvider } from "react-native-elements";

const theme = {
  Button: {
    titleStyle: {
      color: "#262626"
    }
  }
};

export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.bootstrapAsync();
  }

  bootstrapAsync = async () => {
    const userId = await AsyncStorage.getItem("userId");
    this.props.navigation.navigate(userId ? "App" : "Auth");
  };
  
  render() {
    return (
      <ThemeProvider theme={theme}>
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <Image
              style={styles.logo}
              source={require("../assets/logos/circle.png")}
            />

            <Text style={styles.freshly}>freshly</Text>

            <View style={styles.buttonContainer}>
              <View>
                <TouchableOpacity
                  style={styles.buttons}
                  onPress={() => {
                    this.props.navigation.navigate("Login");
                  }}
                >
                  <Text style={styles.buttonText}>LOG IN</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.buttons}
                  onPress={() => {
                    this.props.navigation.navigate("SignUp");
                  }}
                >
                  <Text style={styles.buttonText}>SIGN UP</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ThemeProvider>
    );
  }
}

WelcomeScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#035640"
  },
  contentContainer: {
    alignItems: "center"
  },
  freshly: {
    padding: 0,
    marginBottom: 50,
    fontSize: 45,
    color: "white"
  },
  logo: {
    alignSelf: "center",
    width: "30%",
    resizeMode: "contain",
    marginTop: 100
  },
  buttons: {
    backgroundColor: "white",
    width: 300,
    padding: 15,
    margin: 10,
    borderRadius: 5
  },
  buttonText: {
    textAlign: "center",
    color: "#262626",
    fontSize: 20
  }
});
