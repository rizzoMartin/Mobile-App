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
  buttonDisabled: {
    alignItems: 'center',
    marginVertical: 30,
    width: '80%',
    paddingVertical: 20,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#656176',
    backgroundColor: '#BBBBBB',
    elevation: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Esto asegura que los botones se distribuyan en los extremos del contenedor.
    width: '100%', // Usa el ancho completo para evitar que los botones se salgan.
    position: 'absolute',
    bottom: 0,
    padding: 20, // Ajusta el padding según sea necesario. Asegúrate de que no sea demasiado grande.
  },
  buttonGame: {
    alignItems: 'center',
    paddingVertical: 20,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#656176',
    backgroundColor: '#DECDF5',
    elevation: 10,
    marginHorizontal: 10, // Añade un poco de espacio horizontal entre los botones
    // No es necesario definir el width aquí; el flex se encargará de ello.
    flex: 1, // Permite que los botones expandan equitativamente dentro del contenedor
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
    width: '100%',
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#656176',
    elevation: 10,
  },
  gridItemText: {
    fontSize: 16,
  },
  inputAnswer : {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#DECDF5',
    backgroundColor: '#F8F1FF',
    padding: 10,
    marginVertical: 10,
    width: '80%',
    fontSize: 16,
    elevation: 10,
    height: 60,
    letterSpacing: 5
  },
});