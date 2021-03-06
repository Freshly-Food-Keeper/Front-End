import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { addFood, updateFoodLife } from '../store/reducers/food';
import DatePicker from 'react-native-datepicker';

const EditFormScreen = props => {
  const defaultExp = new Date();
  defaultExp.setDate(defaultExp.getDate() + 7);
  const [name, setName] = React.useState(props.navigation.state.params.name);
  const [foodId] = React.useState(props.navigation.state.params.foodId);
  const [life, setLife] = React.useState(
    props.navigation.state.params.expiresIn || 7
  );
  const [expDate, setExpDate] = React.useState(defaultExp);
  const [nameError, setNameError] = React.useState(false);

  return (
    <View style={styles.view}>
      <View style={styles.form}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Edit food:</Text>
        </View>
        <View style={styles.input}>
          <TouchableOpacity style={styles.selectedButton}>
            <View>
              <Input
                onChangeText={text => {
                  setName(text);
                  setNameError(!text);
                }}
                defaultValue={`${name}`}
              />
            </View>
            {nameError && (
              <View>
                <Text style={styles.errorText}>
                  Please provide a food name.
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.labelContainer}>
          <Text style={styles.label}>Select expiration date:</Text>
        </View>

        <DatePicker
          style={styles.calendar}
          date={expDate}
          mode="date"
          placeholder="Select Expiration Date"
          format="MMM D YYYY"
          minDate={new Date()}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 2,
              top: 8,
              marginLeft: 0,
            },
            dateInput: {
              position: 'absolute',
              top: 4,
              marginLeft: 36,
              borderColor: 'white',
            },
          }}
          onDateChange={date => {
            const newExpDate = new Date(date);
            const today = new Date();
            const newLife = Math.round(
              (newExpDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
            );
            setExpDate(new Date(newExpDate));
            setLife(newLife);
          }}
        />

        <View>
          <TouchableOpacity
            style={styles.submitButton}
            buttonStyle={styles.buttons}
            disabled={nameError}
            onPress={() => {
              props.navigation.popToTop();
              props.navigation.navigate('Food');
              props.updateFoodLife(foodId, life, name)
            }}
          >
            <Text style={styles.submitButtonText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

EditFormScreen.navigationOptions = () => {
  return {
    headerTitle: 'Edit a food',
    headerStyle: {
      backgroundColor: '#035640',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
};

const mapDispatch = dispatch => ({
  updateFoodLife: (foodId, shelfLife, name) =>
    dispatch(updateFoodLife(foodId, shelfLife, name)),
});

export default connect(null, mapDispatch)(EditFormScreen);

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#035640',
    alignItems: 'center',
  },
  calendar: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: 'white',
    height: 50,
  },
  form: {
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  input: {
    padding: 3,
    fontSize: 20,
    borderRadius: 5,
  },
  label: {
    color: 'white',
    fontSize: 20,
    marginTop: 5,
  },
  labelContainer: {
    margin: 5,
  },
  selectedButton: {
    backgroundColor: 'white',
    width: 300,
    padding: 15,
    margin: 10,
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: 'white',
    width: 300,
    padding: 15,
    margin: 10,
    marginTop: 30,
    borderRadius: 5,
  },
  submitButtonText: {
    color: '#262626',
    fontSize: 20,
    textAlign: 'center',
  },
  buttons: {
    width: 300,
    padding: 15,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: 'white',
  },
  errorText: {
    color: '#f44336',
    fontSize: 12,
    marginLeft: 10,
    marginTop: 2,
  },
});