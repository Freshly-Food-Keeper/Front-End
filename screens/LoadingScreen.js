// import React from 'react';
// import { Image, StyleSheet, Text, View } from 'react-native';
// import { Button, ThemeProvider } from 'react-native-elements';
// import AnimatedLoader from 'react-native-animated-loader';

// export default class LoadingScreen extends React.Component {
//   _isMounted = false;
//   constructor(props) {
//     super(props);
//     this.state = { visible: false };
//   }

//   componentDidMount() {
//     this._isMounted = true;
//     if (this._isMounted) {
//       setInterval(() => {
//         this.setState({ visible: !this.state.visible });
//       }, 2000);
//     }
//   }
//   render() {
//     const { visible } = this.state;
//     return (
//       <AnimatedLoader
//         visible={visible}
//         overlayColor="rgba(255,255,255,0.75)"
//         source={require('../assets/logos/circle.png')}
//         animationStyle={styles.lottie}
//         speed={1}
//       />
//     );
//   }
// }

// LoadingScreen.navigationOptions = {
//   header: null,
// };
// const styles = StyleSheet.create({
//   lottie: {
//     width: 100,
//     height: 100,
//   },
// });
