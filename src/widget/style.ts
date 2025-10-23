import { StyleSheet } from 'react-native'
import { Colors, Screens } from '../shared/tokens'

export const welcomeStyle = StyleSheet.create({
  pages: {
    width: Screens.width,
    height: Screens.height
  },

  image: {
    width: Screens.width * 0.9,
    height: Screens.height * 0.55,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 10
  },

  title: {
    fontSize: 26,
    color: Colors.primary,
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'left'
  },

  desc: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: '400',
    textAlign: 'left'
  },

  boxButton: {
    width: Screens.width,
    height: Screens.height * 0.12,
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#1d1d1d',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },

  boshlashBtn: {
    width: '100%',
    height: Screens.height * 0.075,
    backgroundColor: Colors.primary,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center'
  },

  boshlashBtnText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '500',
    letterSpacing: 1
  },

  backButton: {
    backgroundColor: '#222',
    position: 'absolute',
    left: 5,
    width: 60,
    height: Screens.height * 0.075 - 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
    alignItems: 'center',
    justifyContent: 'center'
  },

  doteBox: {
    width: Screens.width,
    height: 30,
    position: 'absolute',
    top: Screens.height * 0.83,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    zIndex: 10
  },

  dote: {
    height: 5,
    borderRadius: 20
  },

})
