import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Grafica from "../Grafica/Grafica";

const Recomendaciones = (props) => {
  const { promedio, dispositivos, data } = props;
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Estadísticas</Text>
      </View>
      <View style={styles.cardBody}>
        <View style={{ ...styles.row }}>
          <View style={{ width: "100%", height: "100%", fontSize: 1 }}>
            <Grafica
              dispositivos={dispositivos}
              promedio={promedio}
              data={data}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(19, 35, 64, 0.6)",
  },
  cardHeader: {
    backgroundColor: "rgba(19, 35, 64, 0.6)",
    width: "100%",
    height: "10%",
    justifyContent: "center",
    borderWidth: 0.3,
    borderBottomColor: "#ffffff78",
  },
  cardTitle: {
    fontWeight: "bold",
    borderColor: "white",
    color: "white",
    textAlign: "center",
  },
  cardBody: {
    height: "90%",
  },
  row: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  col: {
    width: "50%",
    height: "100%",
    padding: 4,
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

export default Recomendaciones;
