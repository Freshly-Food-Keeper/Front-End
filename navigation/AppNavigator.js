import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';
import {
  WelcomeScreen,
  SignUpScreen,
  LoginScreen,
  UserHomeScreen,
  FoodScreen,
  SingleFoodScreen,
  SettingsScreen,
} from '../screens';
import TabBarIcon from '../components/TabBarIcon';
import AddButton from '../components/AddButton';
import RecipeScreen from '../screens/RecipeScreen';
import SingleRecipe from '../components/SingleRecipe';

const AuthStack = createStackNavigator({
  Welcome: WelcomeScreen,
  SignUp: SignUpScreen,
  Login: LoginScreen,
});

const UserHomeStack = createStackNavigator({
  UserHome: UserHomeScreen,
});

UserHomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-home` : 'md-home'}
    />
  ),
};

const FoodStack = createStackNavigator({
  Food: FoodScreen,
  SingleFood: SingleFoodScreen,
});

FoodStack.navigationOptions = {
  tabBarLabel: 'My Food',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-leaf' : 'md-leaf'}
    />
  ),
};

const RecipeStack = createStackNavigator({
  Recipe: RecipeScreen,
  SingleRecipe: SingleRecipe,
});

RecipeStack.navigationOptions = {
  tabBarLabel: 'My Recipes',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  SettingsScreen: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-settings' : 'md-settings'}
    />
  ),
};

const TabNavigator = createBottomTabNavigator(
  {
    UserHomeStack,
    FoodStack,
    Add: {
      screen: () => null,
      navigationOptions: {
        tabBarIcon: <AddButton />,
      },
    },
    RecipeStack,
    SettingsStack,
  },
  {
    tabBarOptions: {
      showLabel: false,
    },
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
