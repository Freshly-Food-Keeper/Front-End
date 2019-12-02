import React from 'react';
import { DialogContent } from 'react-native-popup-dialog';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';

const AddFoodForm = props => {
  const [foodName, setName] = React.useState(props.food.name);
  const [foodLife, setLife] = React.useState(props.food.expiresIn);
  return (
    <DialogContent style={styles.dialogContent}>
      <View>
        <View>
          <Input
            label="FOOD NAME"
            onChangeText={food => setName(food)}
            defaultValue={foodName}
          />
          <Input
            label="*optional: SHELF LIFE (days)"
            defaultValue={foodLife}
            onChangeText={life => setLife(life)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="SUBMIT"
            buttonStyle={styles.buttons}
            onPress={() => {
              props.navigation.navigate('Food');
              props.addFood(foodName, foodLife);
            }}
          />
        </View>
      </View>
    </DialogContent>
  );
};

const styles = StyleSheet.create({
  dialogContent: {
    marginTop: 50,
    minWidth: '75%',
    height: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginTop: 70,
    height: 75,
    width: 75,
  },
  imageConatiner: {
    marginTop: 75,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
});

export default AddFoodForm;
