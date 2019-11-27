import React from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Animated,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback
} from "react-native";
import {
  FontAwesome5,
  Feather,
  Ionicons,
  FontAwesome,
  AntDesign
} from "@expo/vector-icons";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { GOOGLE_CLOUD_VISION_API_KEY } from "../config/secrets";

export default class AddButton extends React.Component {
  buttonSize = new Animated.Value(1);
  mode = new Animated.Value(0);

  handlePress = () => {
    Animated.sequence([
      Animated.timing(this.buttonSize, {
        toValue: 0.95,
        duration: 200
      }),
      Animated.timing(this.buttonSize, {
        toValue: 1
      }),
      Animated.timing(this.mode, {
        toValue: this.mode._value === 0 ? 1 : 0
      })
    ]).start();
  };

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(
        Permissions.CAMERA_ROLL,
        Permissions.CAMERA
      );
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  pickImage = async () => {
    console.log("in pick image");
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });

    this.setState({ uploading: true });
    if (!image.cancelled) {
      this.setState({ image: image });
      await this.submitToGoogle();
    }
  };

  takePhoto = async () => {
    let image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });

    if (!image.cancelled) {
      this.setState({ image });
      await this.submitToGoogle();
    }
  };

  submitToGoogle = async () => {
    try {
      this.setState({ uploading: true });
      let { image } = this.state;
      let body = JSON.stringify({
        requests: [
          {
            features: [{ type: "LABEL_DETECTION", maxResults: 10 }],
            image: {
              content: image.base64
            }
          }
        ]
      });

      let response = await fetch(
        "https://vision.googleapis.com/v1/images:annotate?key=" +
          GOOGLE_CLOUD_VISION_API_KEY,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: body
        }
      );
      let responseJson = await response.json();
      console.log(responseJson);
      this.setState({
        googleResponse: responseJson,
        uploading: false
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getPermissionAsync();
  }

  render() {
    const sizeStyle = {
      transform: [{ scale: this.buttonSize }]
    };

    const rotation = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "45deg"]
    });

    const cameraX = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-24, -100]
    });

    const cameraY = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, -100]
    });

    const photosX = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-24, -24]
    });

    const photosY = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, -150]
    });

    const formX = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-24, 50]
    });

    const formY = this.mode.interpolate({
      inputRange: [0, 1],
      outputRange: [-50, -100]
    });

    return (
      <View style={{ position: "absolute", alignItems: "center" }}>
        {Platform.OS ? (
          <React.Fragment>
            <Animated.View
              style={[
                styles.secondaryButton,
                { position: "absolute", left: cameraX, top: cameraY }
              ]}
            >
              <TouchableHighlight onPress={this.takePhoto}>
                <View>
                  <FontAwesome name="camera" size={24} color="#FFF" />
                </View>
              </TouchableHighlight>
            </Animated.View>

            <Animated.View
              style={[
                styles.secondaryButton,
                { position: "absolute", left: photosX, top: photosY }
              ]}
            >
              <TouchableHighlight onPress={this.pickImage}>
                <View>
                  <FontAwesome name="file-photo-o" size={24} color="#FFF" />
                </View>
              </TouchableHighlight>
            </Animated.View>

            <Animated.View
              style={[
                styles.secondaryButton,
                { position: "absolute", left: formX, top: formY }
              ]}
            >
              <View>
                <AntDesign name="form" size={24} color="#FFF" />
              </View>
            </Animated.View>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Animated.View
              style={[
                styles.secondaryButton,
                { position: "absolute", left: cameraX, top: cameraY }
              ]}
            >
              <TouchableNativeFeedback onPress={this.takePhoto}>
                <View>
                  <FontAwesome name="camera" size={24} color="#FFF" />
                </View>
              </TouchableNativeFeedback>
            </Animated.View>
            <Animated.View
              style={[
                styles.secondaryButton,
                { position: "absolute", left: photosX, top: photosY }
              ]}
            >
              <TouchableNativeFeedback onPress={this.pickImage}>
                <View>
                  <FontAwesome name="file-photo-o" size={24} color="#FFF" />
                </View>
              </TouchableNativeFeedback>
            </Animated.View>
            <Animated.View
              style={[
                styles.secondaryButton,
                { position: "absolute", left: formX, top: formY }
              ]}
            >
              <View>
                <AntDesign name="form" size={24} color="#FFF" />
              </View>
            </Animated.View>
            )
          </React.Fragment>
        )}

        <Animated.View style={[styles.button, sizeStyle]}>
          <TouchableNativeFeedback
            onPress={this.handlePress}
            underlayColor="#7F58FF"
          >
            <Animated.View style={{ transform: [{ rotate: rotation }] }}>
              <FontAwesome5 name="plus" size={24} color="#FFF" />
            </Animated.View>
          </TouchableNativeFeedback>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#035640",
    alignItems: "center",
    justifyContent: "center",
    width: 72,
    height: 72,
    borderRadius: 36,
    position: "absolute",
    top: -55,
    shadowColor: "#7F58FF",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { height: 10 },
    borderWidth: 3,
    borderColor: "#FFF"
  },
  secondaryButton: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#035640"
  }
});
