import React from 'react'
import SettingsList from 'react-native-settings-list'
import { View, Alert, Image, Text, StyleSheet, AsyncStorage } from 'react-native'
import { logout } from '../store/reducers/user'
import { connect } from 'react-redux'

class SettingsScreen extends React.Component {
  constructor() {
    super()
    this.onValueChange = this.onValueChange.bind(this)
    this.logOut = this.logOut.bind(this)
    this.state = { switchValue: false }
  }
  render() {
    var bgColor = '#DCE3F4'
    return (
      <View style={{ backgroundColor: '#EFEFF4', flex: 1 }}>
        <View
          style={{
            borderBottomWidth: 1,
            backgroundColor: '#f7f7f8',
            borderColor: '#c8c7cc'
          }}
        >
        </View>
        <View style={{ backgroundColor: '#EFEFF4', flex: 1 }}>
          <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
            <SettingsList.Header headerStyle={{ marginTop: 15 }} />
            <SettingsList.Item
              hasNavArrow={false}
              icon={
                <Image
                  style={styles.imageStyle}
                  source={require('../assets/images/food-placeholder.jpg')}
                />
              }
              title='Log out'
              onPress={() => this.logOut()}
            />
          </SettingsList>
        </View>
      </View>
    )
  }
  onValueChange(value) {
    this.setState({ switchValue: value })
  }

  logOut = () => {
    this.props.logUserOut()
    this.props.navigation.navigate('Auth')
  }
}

const styles = StyleSheet.create({
  imageStyle: {
    marginLeft: 15,
    marginRight: 20,
    alignSelf: 'center',
    width: 20,
    height: 24,
    justifyContent: 'center'
  }
})

const mapDispatchToProps = dispatch => ({
  logUserOut: () => dispatch(logout())
})

export default connect(null, mapDispatchToProps)(SettingsScreen)
