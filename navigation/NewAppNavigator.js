import React from 'react';
import { Platform, ActionSheetIOS } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import WelcomeScreen from '../screens/WelcomeScreen';
import AddItem from '../components/AddItem';
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import UserHomeScreen from '../screens/UserHomeScreen';
<<<<<<< HEAD
<<<<<<< HEAD
import FoodScreen from '../screens/FoodScreen';
import SingleFoodScreen from '../screens/SingleFoodScreen';
=======
import FoodScreen from '../screens/FoodScreen'
import AddButton from '../components/AddButton';
>>>>>>> 657d31514f5bd6add0b7ec8fbfcb3628d4482307
=======
import SingleFoodScreen from '../screens/SingleFoodScreen';
import FoodScreen from '../screens/FoodScreen'
import AddButton from '../components/AddButton';
>>>>>>> bf033cda3d1823ec1f625345741d6e60d3c30566

const AuthStack = createStackNavigator({
  Welcome: WelcomeScreen,
  SignUp: SignUpScreen,
  Login: LoginScreen
});

const UserHomeStack = createStackNavigator({
  UserHome: UserHomeScreen
});

UserHomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home`
          : 'md-home'
      }
    />
  ),
};

const FoodStack = createStackNavigator({
  Food: FoodScreen,
  SingleFood: SingleFoodScreen
});

FoodStack.navigationOptions = {
  tabBarLabel: 'My Food',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-leaf'
          : 'md-leaf'
      }
    />
  ),
};

// const AddItemStack = createStackNavigator({
//   AddItem: AddItem,
//   // UserHome: UserHomeScreen
// })

// AddItemStack.navigationOptions = {
//   tabBarLabel: 'Add Item',
//   tabBarIcon: ({ focused }) => (
//     <TabBarIcon
//       focused={focused}
//       name={
//         Platform.OS === 'ios'
//           ? 'ios-add-circle-outline'
//           : 'md-add-circle-outline'
//       }
//     />
//   ),
//   // tabBarOnPress: ({ navigation, defaultHandler }) => {
//   //   console.log('this will be fired just before nagivation happens')
//   //   showActionSheet
//   //   // defaultHandler({showActionSheet()}) // if you omit this, navigation will not happen
//   // }
// };

<<<<<<< HEAD
<<<<<<< HEAD

const TabNavigator = createBottomTabNavigator({
  UserHomeStack,
  AddItemStack,
  FoodStack
});
=======
=======
>>>>>>> bf033cda3d1823ec1f625345741d6e60d3c30566
const TabNavigator = createBottomTabNavigator(
  {
    UserHomeStack,
    Add : {
      screen: () => null,
      navigationOptions: {
        tabBarIcon: <AddButton />,
      },
    },
    FoodStack,
  },
  {
    tabBarOptions: {
      showLabel: false
    }
  }
);
<<<<<<< HEAD
>>>>>>> 657d31514f5bd6add0b7ec8fbfcb3628d4482307
=======
>>>>>>> bf033cda3d1823ec1f625345741d6e60d3c30566

const App = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      App: TabNavigator,
    },
    {
      initialRouteName: 'Auth',
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#035640',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    }
  )
);

export default App;
