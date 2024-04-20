import { StyleSheet } from 'react-native';

export const styledImageStep = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
  },
  subTitle1: {
    display: 'flex',
    flexDirection: 'row',
    color: '#CD4C3E',
    fontSize: 16,
    fontWeight: '800',
  },
  subTitle2: {
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    fontSize: 14,
    fontWeight: '700',
    color: '#CD4C3E',
  },
  textImg: {
    display: 'flex',
    flexDirection: 'row',
    color: '#CD4C3E',
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    borderRadius: 10,
    backgroundColor: 'rgba(246, 174, 174, 0.5)',
    padding: 15,
    paddingTop: 20,
    paddingBottom: 20,
  },
  carrousel: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  buttonFormat: {
    marginRight: 10,
    width: '50%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export const styledImg = StyleSheet.create({
  container: {
    width: 315,
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
  Image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  Icon: {
    width: 305,
    height: 149,
    borderColor: '#CD4C3E',
    borderRadius: 10,
    borderWidth: 2,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAEBEA',
  },
});
