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
import ActionSheet from 'react-native-actionsheet'

export default class PhotoPicker extends React.Component {
  state = {
    image: null,
    uploading: false,
    googleResponse: null,
    setModalVisible: false
  };
  showActionSheet = () => {
    this.ActionSheet.show()
  }
  render() {
    let { image } = this.state 
      return (
        <View style={{ position: "absolute", alignItems: "center" }}>
        {/* Diolog box pops up after picture is chosen */}
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
              <View >
                <Text onPress={this.showActionSheet}>Open ActionSheet</Text>
                <ActionSheet
                  ref={o => this.ActionSheet = o}
                  title={'Which one do you like ?'}
                  options={['Choose Image', 'Take Photo', 'Cancel']}
                  cancelButtonIndex={2}
                  destructiveButtonIndex={1}
                  onPress={(index) => { /* do something */ }}
                />
              </View>
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
    actionButtonIcon: {
      fontSize: 20,
        height: 22,
          color: 'white',
      },
});