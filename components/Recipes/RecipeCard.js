import React from 'react';
import { Card, Button } from 'react-native-elements';
import { styles } from '../../styles';

const RecipeCard = props => {
  const navigation = props.navigation;
  const recipe = props.recipe;
  const apiId = props.apiId

  return (
    <Card
      containerStyle={{ padding: 0 }}
      friction={90}
      tension={100}
      activeScale={0.95}
      title={recipe.title}
      titleStyle={styles.cardTitle}
      chevron={{ color: '#262626' }}
      image={{ uri: recipe.image }}
      imageStyle={styles.cardImage}
    >
      <Button
        buttonStyle={styles.cardButton}
        title="View Recipe"
        titleStyle={styles.buttonTitle}
        onPress={() =>
          navigation.navigate('SingleRecipe', { recipe: { recipe } })
        }
      />
    </Card>
  );
};
export default RecipeCard;
