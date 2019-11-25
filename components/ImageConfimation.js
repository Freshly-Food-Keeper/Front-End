import React from 'react';
import { View, StyleSheet, ThemeProvider, Image } from "react-native";

const theme = {
  Button: {
    titleStyle: {
      color: '#262626',
    },
  },
};

export default class ImageConfirmation extends React.Component {
  constructor(props){
    super(props)
  }

  render (){
    console.log('image')
    return (
      <Image
        style={styles.logo}
        source={this.props.image}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#035640',
    width: '20%',
    position: 'relative',
    zIndex: 200,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
    width: '10%',
    resizeMode: 'contain',
    marginTop: 50,
    marginBottom: 0,
  },
});