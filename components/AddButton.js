import React from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Animated,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  Text,
  Image,
} from "react-native";
import { FontAwesome5, FontAwesome, AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { GOOGLE_CLOUD_VISION_API_KEY } from "../config/secrets";
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { ButtonGroup } from 'react-native-elements'

export default class AddButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      uploading: false,
      googleResponse: null,
      setModalVisible: false,
      selectedButtonIndex: 0,
    };
    this.handlePress = this.handlePress.bind(this);
    this.pickImage = this.pickImage.bind(this);
    this.takePhoto = this.takePhoto.bind(this);
    this.submitToGoogle = this.submitToGoogle.bind(this);
    this.getPermissionAsync = this.getPermissionAsync.bind(this);
  }

  buttonSize = new Animated.Value(1);
  mode = new Animated.Value(0);

  handlePress = () => {
    Animated.sequence([
      Animated.timing(this.buttonSize, {
        toValue: 0.95,
        duration: 100
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

    let { image } = this.state
    const buttons = this.state.googleResponse ? this.state.googleResponse['responses'][0]['labelAnnotations'].slice(0, 3).map(button => button["description"]) : []

    return (
      <View style={{ position: "absolute", alignItems: "center" }}>
        <Dialog
          containerStyle={styles.dialogContainer}
          visible={!!this.state.image}
          onTouchOutside={() => {
            this.setState({ image: null });
          }}
        >
          <DialogContent style={styles.dialogContent}>
            <View styles={styles.imageConatiner}>
              <Image
                style={styles.image}
                source={image}
              />
            </View>
            {this.state.googleResponse && (
              <View styles={styles.listContainer}>
                <ButtonGroup
                  onPress={(selectedButtonIndex) => this.setState({ selectedButtonIndex })}
                  selectedIndex={this.state.selectedButtonIndex}
                  buttons={buttons}
                  containerStyle={{ height: 25, width:'100%' }}
                />
              </View>
            )}
          </DialogContent>
        </Dialog>
        <Animated.View
          style={[
            styles.secondaryButton,
            { position: "absolute", left: cameraX, top: cameraY }
          ]}
        >
          <TouchableHighlight
            onPress={this.takePhoto}
            underlayColor="#7F58FF"
          >
            <FontAwesome name="camera" size={24} color="#FFF" />
          </TouchableHighlight>
        </Animated.View>

        <Animated.View
          style={[
            styles.secondaryButton,
            { position: "absolute", left: photosX, top: photosY }
          ]}
        >
          <TouchableHighlight
            onPress={() => this.pickImage()}
            underlayColor="#7F58FF"
            // style={{ }}
          >
            <FontAwesome name="file-photo-o" size={24} color="#FFF" />
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

        <Animated.View style={[styles.button, sizeStyle]}>
          <TouchableHighlight
            onPress={this.handlePress}
            underlayColor="#7F58FF"
          >
            <Animated.View style={{ transform: [{ rotate: rotation }] }}>
              <FontAwesome5 name="plus" size={24} color="#FFF" />
            </Animated.View>
          </TouchableHighlight>
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
  },
  image: {
    marginTop: 20,
    height: '25%',
    width: '25%'
  },
  dialogContent: {
    minWidth: '75%',
    height: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageConatiner: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  buttonGroup: {
    width: 20,
    height: 20,
  }
});
