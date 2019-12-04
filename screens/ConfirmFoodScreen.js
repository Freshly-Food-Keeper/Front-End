import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Input, Avatar } from "react-native-elements";
import { connect } from "react-redux";
import { addFood } from "../store/reducers/food";
import DatePicker from "react-native-datepicker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from 'axios'


const ConfirmFoodScreen = props => {
  const [name, setName] = React.useState(
    props.navigation.state.params.topFoods[0]
  );
  const [selectedButtonIndex, setSelectedButtonIndex] = React.useState(0);
  const [life, setLife] = React.useState(
    props.navigation.state.params.life === "NO AVAILABLE SHELF LIFE"
      ? 0
      : props.navigation.state.params.life
  );
  const [expDate, setExpDate] = React.useState(
    life ? new Date(new Date().getTime() + life * 1000 * 3600 * 24) : new Date()
  );

  const foodOne = props.navigation.state.params.topFoods[0];
  const foodTwo = props.navigation.state.params.topFoods[1];
  const foodThree = props.navigation.state.params.topFoods[2];

  return (
    <ScrollView
      style={{ backgroundColor: "#035640" }}
    >
      <View style={styles.form}>
        <View style={styles.avatarContainer}>
          <Avatar
            size="xlarge"
            rounded
            source={props.navigation.state.params.image}
          />
        </View>

        <View style={styles.labelContainer}>
          <Text style={styles.label}>Select food:</Text>
        </View>

        <View>
          <TouchableOpacity
            style={
              selectedButtonIndex === 0 ? styles.selectedButton : styles.buttons
            }
            onPress={() => {
              setSelectedButtonIndex(0);
              setName(foodOne);
            }}
          >
            <View>
              <Text
                style={
                  selectedButtonIndex === 0
                    ? styles.selectedButtonText
                    : styles.buttonText
                }
              >
                {foodOne}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={
              selectedButtonIndex === 1 ? styles.selectedButton : styles.buttons
            }
            onPress={() => {
              setSelectedButtonIndex(1);
              setName(foodTwo);
            }}
          >
            <View>
              <Text
                style={
                  selectedButtonIndex === 1
                    ? styles.selectedButtonText
                    : styles.buttonText
                }
              >
                {foodTwo}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={
              selectedButtonIndex === 2 ? styles.selectedButton : styles.buttons
            }
            onPress={() => {
              setSelectedButtonIndex(2);
              setName(foodThree);
            }}
          >
            <View>
              <Text
                style={
                  selectedButtonIndex === 2
                    ? styles.selectedButtonText
                    : styles.buttonText
                }
              >
                {foodThree}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.input}>
          <TouchableOpacity
            style={
              selectedButtonIndex === 3 ? styles.selectedButton : styles.buttons
            }
            onPress={() => {
              setSelectedButtonIndex(3);
            }}
          >
            <View>
              <Input
                onChangeText={text => {
                  setName(text);
                  setSelectedButtonIndex(3);
                }}
                // value=""
                placeholder="Other"
              />
            </View>
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
              position: "absolute",
              left: 2,
              top: 8,
              marginLeft: 0
            },
            dateInput: {
              position: "absolute",
              top: 4,
              marginLeft: 36,
              borderColor: "white"
            }
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
            onPress={() => {
              props.navigation.popToTop();
              props.navigation.navigate("Food");
              props.addFood(name, life);
            }}
          >
            <Text style={styles.submitButtonText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

// async function getImage(name) {
//    try {
//       const { data } = await axios.get(
//         `https://api.spoonacular.com/food/ingredients/autocomplete?query=${name}&number=1&apiKey=${SPOONACULAR_API_KEY}`
//       )
//       console.log(`https://spoonacular.com/cdn/ingredients_250x250/${data[0].image}`)
//       return data[0].image ? `https://spoonacular.com/cdn/ingredients_250x250/${data[0].image}` : null
//     } catch (error) {
//       console.error(error);
//     }
//   // https://api.spoonacular.com/food/ingredients/autocomplete?query=blueberries&number=1&apiKey=d1d95a97cd0f48ae89126a0a04b17718
// }

ConfirmFoodScreen.navigationOptions = () => {
  return {
    headerTitle: "Confirm",
    headerStyle: {
      backgroundColor: "#035640"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };
};

const mapDispatch = dispatch => ({
  addFood: (food, shelfLife) => dispatch(addFood(food, shelfLife))
});

export default connect(null, mapDispatch)(ConfirmFoodScreen);

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#035640",
    alignItems: "center"
  },
  avatarContainer: {
    paddingBottom: 15,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  calendar: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "white",
    height: 50
  },
  form: {
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
    alignItems: "center"
  },
  input: {
    padding: 3,
    fontSize: 20,
    borderRadius: 5
  },
  label: {
    color: "white",
    fontSize: 20,
    marginTop: 5
  },
  labelContainer: {
    margin: 5
  },
  selectedButton: {
    backgroundColor: "white",
    width: 300,
    padding: 15,
    margin: 10,
    borderRadius: 5
  },
  selectedButtonText: {
    color: "#262626",
    fontSize: 20
  },
  submitButton: {
    backgroundColor: "white",
    width: 300,
    padding: 15,
    margin: 10,
    borderRadius: 5
  },
  submitButtonText: {
    color: "#262626",
    fontSize: 20,
    textAlign: "center"
  },
  buttons: {
    width: 300,
    padding: 15,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "white"
  },
  buttonText: {
    color: "white",
    fontSize: 20
  },
  errorText: {
    color: "#f44336",
    fontSize: 12,
    marginLeft: 10,
    marginTop: 2
  }
});
