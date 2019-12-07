import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import SingleRecipeCard from '../components/Recipes/SingleRecipeCard';
const SingleRecipeScreen = props => {
  const recipe = props.navigation.getParam('recipe').recipe;
  return (
    <View style={styles.container}>
      <ScrollView>
        <SingleRecipeCard recipe={recipe} />
      </ScrollView>
    </View>
  );
};

export default SingleRecipeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
});
