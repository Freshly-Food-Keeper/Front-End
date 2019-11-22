import * as React from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { GOOGLE_APPLICATION_CREDENTIALS } from 'react-native-dotenv';

export default class PhotoPicker extends React.Component {
  state = {
    image: null,
    uploading: false,
    googleResponse: null,
  };

  render() {
    let { image } = this.state;
    console.log('env', Environment);
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Pick an image from camera roll"
          onPress={this._pickImage}
        />
        <Button title="Take a photo" onPress={this._takePhoto} />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )}
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

  _pickImage = async () => {
    let image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    this.setState({ uploading: true });

    if (image) {
      console.log(image);
      await this.quickstart(image.uri);
    }

    if (!image.cancelled) {
      this.setState({ image: image.uri });
    }
  };

  _takePhoto = async () => {
    let image = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (image) {
      console.log(image);
      await this.quickstart(image.uri);
    }

    if (!image.cancelled) {
      this.setState({ image: image.uri });
    }
  };

  async quickstart() {
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');

    // Creates a client
    const client = new vision.ImageAnnotatorClient({
      keyFilename: '../config/apiKey.json',
    });

    // Performs label detection on the image file
    const [result] = await client.labelDetection(
      'https://static.puzzlefactory.pl/puzzle/201/241/original.jpg'
    );
    const labels = result.labelAnnotations;
    console.log('Labels:');
    labels.forEach(label => console.log(label.description));
  }
}
