import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";

import ContenedorInicio from "../ContenedorInicio";

const PaginaInicio = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://siaaf.unl.edu.ec/asistencia-static/img/unl.jpg",
        }}
        style={styles.image}
      >
        <ContenedorInicio />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  col: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  buttonStyle: {
    width: "99%",
    borderRadius: 5,
    backgroundColor: "rgba(19, 35, 64, 0.6)",
  },
  dropdownStyle: {
    width: "50%",
    height: "30%",
    backgroundColor: "rgba(19, 35, 64, 0.6)",
  },
});

export default PaginaInicio;
