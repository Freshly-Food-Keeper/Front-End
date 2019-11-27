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
import SignUpScreen from '../screens/SignUpScreen';
import LoginScreen from '../screens/LoginScreen';
import UserHomeScreen from '../screens/UserHomeScreen';
import FoodScreen from '../screens/FoodScreen';
import SingleFoodScreen from '../screens/SingleFoodScreen';
import AddButton from '../components/AddButton';

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
