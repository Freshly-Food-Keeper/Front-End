import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';

import TabBarIcon from './TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import PhotoPicker from './PhotoPicker';
import SettingsScreen from '../screens/SettingsScreen';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const SignUp = createStackNavigator(
  {
    Signup: SignUpForm,
  },
  config
);
SignUp.path = '/signup';

const Login = createStackNavigator(
  {
    Login: LoginForm,
  },
  config
);
SignUp.path = '/login';

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
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

HomeStack.path = '';

const AddItemStack = createStackNavigator(
  {
    Links: PhotoPicker,
  },
  config
);

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

AddItemStack.path = '/AddItem';

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  ),
};

SettingsStack.path = '/settings';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  AddItemStack,
  SettingsStack,
});

tabNavigator.path = '';

const AppNavigator = createAppContainer(
  createSwitchNavigator(
    {
      App: tabNavigator,
      SignUp: SignUp,
      Login: Login,
    },
    {
      initialRouteName: 'App',
    }
  )
);

export default AppNavigator;
