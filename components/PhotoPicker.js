import React from "react";
import { View, StyleSheet, TouchableHighlight, Animated, Image, Text } from "react-native";
import { FontAwesome5, Feather } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { GOOGLE_CLOUD_VISION_API_KEY } from '../config/secrets';
import ImageConfirmation from './ImageConfimation'
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { classes } from "istanbul-lib-coverage";

export default class PhotoPicker extends React.Component {
  state = {
    image: null,
    uploading: false,
    googleResponse: null,
    setModalVisible: false
  };
    mode = new Animated.Value(0);
    buttonSize = new Animated.Value(1);

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

    render() {
        let { image } = this.state;

        const thermometerX = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-24, -100]
        });

        const thermometerY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, -100]
        });

        const timeX = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-24, -24]
        });

        const timeY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, -150]
        });

        const pulseX = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-24, 50]
        });

        const pulseY = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, -100]
        });

        const rotation = this.mode.interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "45deg"]
        });

        const sizeStyle = {
            transform: [{ scale: this.buttonSize }]
        };

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
                    <View className={classes.imageConatiner}>
                      <Image
                        style={styles.logo}
                        source={image}
                      />
                    </View>
                  </DialogContent>
                </Dialog>
                <Animated.View style={{ position: "absolute", left: thermometerX, top: thermometerY }}>
                    <View style={styles.secondaryButton}>
                <Feather name="image" size={24} color="#FFF" onPress={this._pickImage}/>
                    </View>
                </Animated.View>
                <Animated.View style={{ position: "absolute", left: timeX, top: timeY }}>
                    <View style={styles.secondaryButton}>
                <Feather name="camera" size={24} color="#FFF" onPress={this._takePhoto} />
                    </View>
                </Animated.View>
                <Animated.View style={{ position: "absolute", left: pulseX, top: pulseY }}>
                    <View style={styles.secondaryButton}>
                <Feather name="file" size={24} color="#FFF" />
                    </View>
                </Animated.View>
                <Animated.View style={[styles.button, sizeStyle]}>
                    <TouchableHighlight onPress={this.handlePress} underlayColor="#7F58FF">
                        <Animated.View style={{ transform: [{ rotate: rotation }] }}>
                            <FontAwesome5 name="plus" size={24} color="#FFF" />
                        </Animated.View>
                    </TouchableHighlight>
                </Animated.View>
            </View>
        );
    }
  componentDidMount() {
    this.getPermissionAsync();
    console.log('it worked');
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(
        Permissions.CAMERA_ROLL,
        Permissions.CAMERA
      );
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  pickImage = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    this.setState({ uploading: true });
    if (!image.cancelled) {
      this.setState({ image: image });
    }
    if (image) {
      await this.submitToGoogle();
    }
  };

  takePhoto = async () => {
    let image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true,
    });

    if (!image.cancelled) {
      this.setState({ image });
    }

    if (image) {
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
            features: [{ type: 'LABEL_DETECTION', maxResults: 10 }],
            image: {
              content: image.base64,
            },
          },
        ],
      });
      // let response = await fetch(
      //   'https://vision.googleapis.com/v1/images:annotate?key=' +
      //     GOOGLE_CLOUD_VISION_API_KEY,
      //   {
      //     headers: {
      //       Accept: 'application/json',
      //       'Content-Type': 'application/json',
      //     },
      //     method: 'POST',
      //     body: body,
      //   }
      // );
      // let responseJson = await response.json();
      // console.log(responseJson);
      this.setState({
        googleResponse: {},
        uploading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        justifyContent: "center",
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: "#7F58FF",
        position: "absolute",
        marginTop: -60,
        shadowColor: "#7F58FF",
        shadowRadius: 5,
        shadowOffset: { height: 10 },
        shadowOpacity: 0.3,
        borderWidth: 3,
        borderColor: "#FFFFFF"
    },
    secondaryButton: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: "#7F58FF"
    },
    dialogContainer: {
      zIndex: 99,
      width: '100%',
      height: '100%'
    },
    logo: {
      width: 200,
      height: 200,
      resizeMode: 'contain',
    },
    imageConatiner: {
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    },
    dialogContent: {
      width: '90%',
      height: '63%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
});
