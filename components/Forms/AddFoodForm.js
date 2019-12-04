import React from 'react';
import { DialogContent } from 'react-native-popup-dialog';
import { View, StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';

const AddFoodForm = props => {
  const [foodName, setName] = React.useState(props.name);
  const [foodLife, setLife] = React.useState(props.expiresIn);
  return (
    <DialogContent style={styles.dialogContent}>
      <View>
        <View style={styles.inputContent}>
          <Input
            style={styles.input}
            label="FOOD NAME"
            onChangeText={food => setName(food)}
            defaultValue={foodName}
          />
          <Input
            style={styles.input}
            label="*optional: SHELF LIFE (days)"
            defaultValue={foodLife}
            onChangeText={life => setLife(life)}
          />
          <Button
            title="SUBMIT"
            buttonStyle={styles.button}
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
    height: '25%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContent: {
    marginTop: 50,
    minWidth: '75%',
    height: '100%',
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
  input: {
    marginTop: 20,
  },
  button: {
    marginTop: 30,
    marginBottom: 30,
    minWidth: '75%',
    height: '25%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  }
});

export default AddFoodForm;
