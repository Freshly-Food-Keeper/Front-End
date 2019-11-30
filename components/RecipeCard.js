import React from 'react';
import { Card, Button } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import SingleRecipe from './SingleRecipe';

const RecipeCard = props => {
  console.log('recipe', props.recipe);
  return (
    <Card
      containerStyle={{ padding: 0 }}
      Component={TouchableScale}
      friction={90}
      tension={100}
      activeScale={0.95}
      title={props.recipe.title}
      titleStyle={{ color: '#262626', fontWeight: 'bold' }}
      chevron={{ color: '#262626' }}
      image={{ uri: props.recipe.image }}
    >
      <Button
        buttonStyle={{
          borderRadius: 5,
          margin: 5,
          width: '50%',
          backgroundColor: '#035640',
          alignSelf: 'center',
        }}
        title="View Recipe"
        titleStyle={{ color: 'white', fontWeight: 'bold' }}
        onPress={() => <SingleRecipe />}
      />
    </Card>
  );
};
export default RecipeCard;
