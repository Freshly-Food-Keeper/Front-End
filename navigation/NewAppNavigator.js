import React from 'react';
import { Platform } from 'react-native';
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
import FoodScreen from '../screens/FoodScreen'

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
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const FoodStack = createStackNavigator({
  Food: FoodScreen
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

const AddItemStack = createStackNavigator({
  AddItem: AddItem
})

AddItemStack.navigationOptions = {
  tabBarLabel: 'Add Item',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-add-circle-outline'
          : 'md-add-circle-outline'
      }
    />
  ),
};

const TabNavigator = createBottomTabNavigator({
  UserHomeStack,
  AddItemStack,
  FoodStack,
});

const App = createAppContainer(
  createSwitchNavigator(
    {
      Auth: AuthStack,
      App: TabNavigator,
    },
    {
      initialRouteName: 'Auth',
    }
  )
);

export default App;
