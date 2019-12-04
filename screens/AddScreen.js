import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert
} from "react-native";
import { connect } from "react-redux";
import Constants from 'expo-constants';
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import {
  GOOGLE_CLOUD_VISION_API_KEY,
  BACK_END_SERVER
} from "../config/secrets";
import axios from 'axios';
import LoadingScreen from "./LoadingScreen";


class AddScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false
    }
    this.pickPhoto = this.pickPhoto.bind(this);
    this.takePhoto = this.takePhoto.bind(this);
    this.submitToGoogle = this.submitToGoogle.bind(this);
    this.getPermissionAsync = this.getPermissionAsync.bind(this);
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

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

  takePhoto = async () => {

    let image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true
    });

    if (!image.cancelled) {
        this.submitToGoogle(image);
    }
  };

  pickPhoto = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true
    });

    if (!image.cancelled) {
      this.submitToGoogle(image);
    }
  };

  submitToGoogle = async image => {
    try {
      this.setState({ uploading: true });
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

      let googleResponseJson = await response.json();

      let foodName = googleResponseJson["responses"][0]["labelAnnotations"][0][
        "description"
      ]
        .split(" ")
        .join("_");

      let topFoods = googleResponseJson
        ? googleResponseJson["responses"][0]["labelAnnotations"]
            .slice(0, 3)
            .map(button => button["description"])
        : [];

      let life = await axios.get(`${BACK_END_SERVER}/api/expiration/${foodName}`);

      this.setState({ uploading: false });
      this.props.navigation.navigate("ConfirmFood", {
        topFoods,
        life: life.data || "No shelf life available",
        image
      });
    } catch (error) {
      this.setState({ uploading: false });
      console.log(error);
    }
  };

  render() {
    return ( this.state.uploading ?
      <LoadingScreen /> :
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>Add a new food!</Text>
          <View>
            <TouchableOpacity style={styles.buttons} onPress={this.takePhoto}>
              <Text style={styles.buttonText}>TAKE A PHOTO</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity style={styles.buttons} onPress={this.pickPhoto}>
              <Text style={styles.buttonText}>CHOOSE A PHOTO</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.buttons}
              onPress={() => {
                this.props.navigation.navigate("SignUp");
              }}
            >
              <Text style={styles.buttonText}>ADD CUSTOM</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

AddScreen.navigationOptions = {
  header: null
};

export default connect(null, null)(AddScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#035640",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    padding: 0,
    marginBottom: 20,
    fontSize: 36,
    color: "white",
    alignSelf: "center"
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
