import { StyleSheet } from 'react-native';
import { Platform } from 'react-native';

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  greenBackground: {
    flex: 1,
    backgroundColor: '#035640',
  },
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  greyBackground: {
    backgroundColor: '#EFEFF4',
    flex: 1,
  },
  header: {
    marginTop: 15,
    fontFamily:
      Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'sans-serif-light',
  },
  freshly: {
    padding: 0,
    marginBottom: 50,
    fontSize: 45,
    color: 'white',
    fontFamily:
      Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'sans-serif-light',
  },
  logo: {
    alignSelf: 'center',
    width: '30%',
    resizeMode: 'contain',
    marginTop: 100,
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: 18,
    padding: 5,
    margin: 5,
    fontWeight: '600',
  },
  cardImage: { width: '100%', height: 200 },
  subHeader: {
    textAlign: 'center',
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 5,
    fontWeight: '500',
    fontFamily:
      Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'sans-serif-light',
  },
  title: {
    fontFamily:
      Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'sans-serif-light',
    paddingTop: 5,
    margin: 0,
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
  },
  subTitle: {
    fontFamily:
      Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'sans-serif-light',
    paddingTop: 5,
    margin: 0,
    fontSize: 20,
    color: 'gray',
  },
  cardButton: {
    borderRadius: 5,
    marginBottom: 5,
    width: '65%',
    backgroundColor: 'white',
    borderWidth: 1.5,
    borderColor: 'black',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#035640',
    alignItems: 'center',
  },
  form: {
    backgroundColor: 'white',
    width: '90%',
    padding: 10,
    marginTop: 50,
    borderRadius: 8,
  },
  input: {
    fontFamily:
      Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'sans-serif-light',
    fontWeight: '500',
    padding: 3,
    margin: 10,
    fontSize: 20,
    borderRadius: 5,
  },
  buttonGroup: {
    borderRadius: 5,
    padding: 10,
    margin: 10,
    width: '40%',
    backgroundColor: 'black',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#035640',
    padding: 15,
    margin: 15,
    borderRadius: 5,
  },
  buttonTitle: {
    fontFamily:
      Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'sans-serif-light',
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    paddingTop: 3,
    paddingBottom: 3,
  },
  buttonText: {
    fontFamily:
      Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'sans-serif-light',
    textAlign: 'center',
    color: '#262626',
    fontSize: 20,
    fontWeight: '500',
  },
  buttonTextWhite: {
    fontFamily:
      Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'sans-serif-light',
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  whiteButton: {
    borderRadius: 10,
    padding: 15,
    margin: 10,
    width: 300,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  smallText: {
    fontFamily:
      Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'sans-serif-light',
    textAlign: 'left',
    fontSize: 16,
  },
  divider: {
    height: 2,
    backgroundColor: 'black',
    marginTop: 5,
    marginBottom: 5,
  },
  nutritionLabel: {
    fontFamily:
      Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'sans-serif-light',
    textAlign: 'left',
    fontSize: 14,
    color: 'black',
    fontWeight: '700',
  },
  nutritionText: {
    fontFamily:
      Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'sans-serif-light',
    textAlign: 'left',
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingVertical: 5,
  },
  nutritionContainer: {
    paddingLeft: 15,
    paddingRight: 25,
  },
  dataText: {
    fontFamily:
      Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'sans-serif-light',
    padding: 0,
    margin: 0,
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    paddingBottom: 10,
    paddingTop: 15,
    fontWeight: '500',
  },
  avatarContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gif: {
    width: 200,
    height: 200,
  },
  errorText: {
    fontFamily:
      Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'sans-serif-light',
    color: '#f44336',
    fontSize: 12,
    marginLeft: 10,
    marginTop: 2,
  },
  icon: {
    alignSelf: 'center',
    justifyContent: 'flex-end',
    padding: 5,
  },
});
