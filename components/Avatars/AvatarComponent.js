import React from 'react';
import { View } from 'react-native';
import { Badge, Avatar } from 'react-native-elements';

export function AvatarComponent({ food, showBadge }) {
  return (
    <View>
      <Avatar
        size="small"
        rounded
        source={
          food.imageUrl === null
            ? require('../../images/food-placeholder.jpg')
            : { uri: food.imageUrl }
        }
      />
      {showBadge && (
        <Badge
          status="error"
          containerStyle={{ position: 'absolute', top: -4, right: -4 }}
        />
      )}
    </View>
  );
}
