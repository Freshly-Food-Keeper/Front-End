import React from 'react';
import { View } from 'react-native';
import { ListItem } from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';

import { styles } from '../styles';
import { AvatarComponent } from '../components/AvatarComponent';

const SingleFood = props => {
  const { singleFood, visible, navigation, onLongPress } = props;
  return (
    <View key={singleFood.id}>
      <ListItem
        key={singleFood.id}
        Component={TouchableScale}
        friction={90}
        tension={100}
        activeScale={0.95}
        leftAvatar={
          <AvatarComponent
            food={singleFood}
            showBadge={singleFood.expiresIn < 7}
          />
        }
        title={singleFood.name}
        onLongPress={() => onLongPress(visible, singleFood)}
        titleStyle={styles.title}
        subtitle={singleFood.expiresIn}
        subtitleStyle={styles.smallText}
        chevron={{ color: '#262626' }}
        onPress={() => navigation.navigate('SingleFood', singleFood)}
        bottomDivider
      />
    </View>
  );
};
export default SingleFood;
