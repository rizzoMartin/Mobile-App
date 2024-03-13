import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    marginVertical: 30,
    width: '80%',
    paddingVertical: 20,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#656176',
    backgroundColor: '#DECDF5',
    elevation: 10,
  },
  text : {
    color: '#534D56',
    fontSize: 20,
  },
  input : {
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#656176',
    backgroundColor: '#DECDF5',
    padding: 10,
    marginVertical: 10,
    width: '80%',
    fontSize: 16,
    elevation: 10,
    height: 60
  },
  pickerContainer : {
    marginVertical: 10,
    height: 60,
    width: '80%',
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#656176',
    backgroundColor: '#DECDF5',
    elevation: 10,
  },
  picker : {
    width: '100%',
  },
  gridItem: {
    flex: 1,
    margin: 10,
    height: 100, // Ajusta la altura según sea necesario
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#656176',
    backgroundColor: '#DECDF5',
    elevation: 10,
  },
  gridItemText: {
    fontSize: 16,
  },
});