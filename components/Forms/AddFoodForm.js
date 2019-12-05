import React from 'react';
import { DialogContent } from 'react-native-popup-dialog';
import { View, StyleSheet } from 'react-native';
import { Button, Input } from 'react-native-elements';

class AddFoodForm extends React.Component {
  constructor (props){
    super (props)
    this.state = {
      foodName: this.props.name,
      foodLife: this.props.expiresIn,
      foodId: this.props.foodId
    }
  }
render() {
  return (
    <DialogContent style={styles.dialogContent}>
      <View>
        <View>
          <Input
            label="Edit food name"
            onChangeText={food => this.setState({foodName: food})}
            defaultValue={this.state.foodName}
          />
          { this.state.foodLife ? (
          <Input
            label="Edit shelf life"
            defaultValue={`${this.state.foodLife}`}
            onChangeText={life => this.setState({foodLife: life})}
          /> 
          ) : (
            <Input
              label="Add shelf life"
                onChangeText={life => this.setState({ foodLife: life })}
            /> 
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="SUBMIT"
            buttonStyle={styles.buttons}
            onPress={() => {
              this.props.navigation.navigate('Food');
              this.props.updateFoodLife(this.state.foodId, this.state.foodLife)
            }}
          />
        </View>
      </View>
    </DialogContent>
  );
  }
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
});

export default AddFoodForm;
