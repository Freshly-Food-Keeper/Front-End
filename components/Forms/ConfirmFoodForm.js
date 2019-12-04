import React from 'react';
import { DialogContent } from 'react-native-popup-dialog';
import { View, Image, StyleSheet } from 'react-native';
import { ButtonGroup, Button, Input } from 'react-native-elements';

const ConfirmFoodForm = props => {
  const [selectedButtonIndex, setSelectedButtonIndex] = React.useState(0);

  const [name, setName] = React.useState(props.buttons[selectedButtonIndex]);
  const [foodLife, setLife] = React.useState(props.expiresIn);
  return (
    <DialogContent style={styles.dialogContent}>
      <View styles={styles.imageConatiner}>
        <Image style={styles.image} source={props.image} />
      </View>
      <View styles={styles.listContainer}>
        <ButtonGroup
          onPress={index => setSelectedButtonIndex(index)}
          selectedIndex={selectedButtonIndex}
          buttons={props.buttons}
          containerStyle={styles.buttonGroup}
        />
      </View>
      <View>
        <Input
          label="CHANGE FOOD NAME"
          defaultValue={props.buttons[selectedButtonIndex]}
          onChangeText={text => setName(text)}
        />
        <Input
          label="CHANGE SHELF LIFE"
          defaultValue={foodLife}
          onChangeText={text => setLife(text)}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="SUBMIT"
          buttonStyle={styles.buttons}
          onPress={() => {
            props.navigation.navigate('Food');
            props.addFood(name, foodLife);
          }}
        />
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
  button: {
    backgroundColor: '#035640',
    alignItems: 'center',
    justifyContent: 'center',
    width: 72,
    height: 72,
    borderRadius: 36,
    position: 'absolute',
    top: -55,
    shadowColor: '#7F58FF',
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { height: 10 },
    borderWidth: 3,
    borderColor: '#FFF',
  },
  buttons: {
    backgroundColor: '#035640',
    width: '100%',
    height: 40,
    marginTop: 10,
  },
  buttonGroup: {
    height: 25,
    width: '100%',
    shadowColor: '#262626',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
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
  image: {
    marginTop: 70,
    height: 75,
    width: 75,
  },
});

export default ConfirmFoodForm;
