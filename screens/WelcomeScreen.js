import React from 'react';
import {
  Image,
  Text,
  View,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import { styles } from '../styles';

export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.bootstrapAsync();
  }

  bootstrapAsync = async () => {
    const userId = await AsyncStorage.getItem('userId');
    this.props.navigation.navigate(userId ? 'App' : 'Auth');
  };

  render() {
    return (
      <View style={styles.greenBackground}>
        <View style={styles.contentContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/logos/circle.png')}
          />

          <Text style={styles.freshly}>freshly</Text>

          <View>
            <View>
              <TouchableOpacity
                style={styles.whiteButton}
                onPress={() => {
                  this.props.navigation.navigate('Login');
                }}
              >
                <Text style={styles.buttonText}>LOG IN</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.whiteButton}
                onPress={() => {
                  this.props.navigation.navigate('SignUp');
                }}
              >
                <Text style={styles.buttonText}>SIGN UP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

WelcomeScreen.navigationOptions = {
  header: null,
};
