import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView
} from "react-native";
import { Input, Avatar, Scroll } from "react-native-elements";
import { connect } from "react-redux";
import { addFood } from "../store/reducers/food";

const ConfirmFoodScreen = props => {
  const [name, setName] = React.useState(
    props.navigation.state.params.topFoods[0]
  );
  const [selectedButtonIndex, setSelectedButtonIndex] = React.useState(0);
  const [life, setLife] = React.useState(props.navigation.state.params.life);

  const foodOne = props.navigation.state.params.topFoods[0];
  const foodTwo = props.navigation.state.params.topFoods[1];
  const foodThree = props.navigation.state.params.topFoods[2];
  console.log(name);
  console.log(props.addFood)

  return (
    <ScrollView style={styles.scrollView}>
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

        <View>
              <TouchableOpacity
                style={styles.selectedButton}
                buttonStyle={styles.buttons}
                onPress={() => {
                  props.navigation.navigate("Food");
                  props.addFood(name, life);
                }}
              >
                <Text style={styles.selectedButtonText}>SUBMIT</Text>
              </TouchableOpacity>
            </View>

        {/* <View style={styles.input}>
                <Input
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  placeholder="Email"
                />
              </View>

              <View style={styles.input}>
                <Input
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  placeholder="Password"
                  secureTextEntry={true}
                />
                {touched.password && errors.password ? (
                  <Text style={styles.errorText}>{errors.password}</Text>
                ) : null}
              </View>

              <View>
                <TouchableOpacity
                  style={[styles.button, !isValid && { opacity: 0.7 }]}
                  disabled={!isValid}
                  onPress={handleSubmit}
                >
                  <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
              </View> */}
      </View>
    </ScrollView>
  );
};

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
    fontSize: 20
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
