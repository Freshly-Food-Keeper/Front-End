import React from 'react';
import { Platform, Button} from 'react-native';
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
  SingleRecipeScreen,
  LoadingScreen,
} from '../screens';
import TabBarIcon from '../components/TabBarIcon';
import AddButton from '../components/AddButton';
import RecipeScreen from '../screens/RecipeScreen';

const AuthStack = createStackNavigator({
  Welcome: WelcomeScreen,
  SignUp: SignUpScreen,
  Login: LoginScreen,
});

const UserHomeStack = createStackNavigator({
  UserHome: UserHomeScreen,
  Food: FoodScreen,
  SingleFood: SingleFoodScreen,
  SingleRecipe: SingleRecipeScreen,
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
  SingleRecipe: SingleRecipeScreen,
});

FoodStack.path = 'singleFood';

FoodStack.navigationOptions = ({ testing, screenProps }) => ({
  headerRight: (
    <Button
      title='Menu'
      onPress={testing => {
        testing.navigate('DrawerOpen')
      }}
    />
  ),
  tabBarLabel: `My Food`,
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-leaf' : 'md-leaf'}
    />
  ),
});

const RecipeStack = createStackNavigator({
  Recipe: RecipeScreen,
  SingleRecipe: SingleRecipeScreen,
});

RecipeStack.navigationOptions = {
  tabBarLabel: 'My Favorites',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-heart' : 'md-heart'}
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

const LoadingStack = createStackNavigator({
  LoadingStack: LoadingScreen,
});

const TabNavigator = createBottomTabNavigator(
  {
    UserHomeStack,
    FoodStack,
    Add: {
      screen: () => null,
      navigationOptions: {
        tabBarIcon: props => <AddButton {...props} />,
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
      Loading: LoadingStack,
    },
    {
      initialRouteName: 'App',
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
