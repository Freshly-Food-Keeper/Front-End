import React from 'react'
import SettingsList from 'react-native-settings-list'
import { View, Image, StyleSheet } from 'react-native'
import { logout } from '../store/reducers/user'
import { connect } from 'react-redux'

class SettingsScreen extends React.Component {
  constructor() {
    super()
    this.logOut = this.logOut.bind(this)
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
            <SettingsList.Header headerStyle={{ marginTop: 15 }} headerText='User Settings' />
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
  logOut = () => {
    this.props.logUserOut()
    this.props.navigation.navigate('Auth')
  }
}

SettingsScreen.navigationOptions = {
  title: 'Settings'
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#EFEFF4', flex: 1 },
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
