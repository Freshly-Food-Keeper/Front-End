import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 5,
    paddingBottom: 5,
    fontWeight: '600',
  },
  cardImage: { width: '100%', height: 200 },
  subHeader: {
    textAlign: 'center',
    fontSize: 18,
    paddingTop: 5,
    paddingBottom: 5,
    fontWeight: '500',
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
});
