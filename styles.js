import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingTop: 5,
    paddingBottom: 5,
    fontWeight: '600',
  },
  cardImage: { width: '100%', height: 200 },
  subHeader: {
    textAlign: 'center',
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 5,
    fontWeight: '500',
  },
  title: {
    paddingTop: 5,
    margin: 0,
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
  },
  subTitle: {
    paddingTop: 5,
    margin: 0,
    fontSize: 20,
    color: 'gray',
  },
  cardButton: {
    borderRadius: 5,
    margin: 5,
    width: '50%',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderWidth: 1.5,
    borderColor: 'black',
  },
  buttonTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    paddingTop: 3,
    paddingBottom: 3,
  },
  smallText: {
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
    textAlign: 'left',
    fontSize: 14,
    color: 'black',
    fontWeight: '700',
  },
  nutritionText: {
    textAlign: 'left',
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  nutritionContainer: {
    paddingLeft: 15,
    paddingRight: 25,
  },
  dataText: {
    padding: 0,
    margin: 0,
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
    paddingBottom: 10,
    paddingTop: 15,
    fontWeight: '500',
  },
});
