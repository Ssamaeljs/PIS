import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { formatearFechaYHora, getCategoriaPorUV } from "./assets/MedicionUtils";

const MedicionUv = (props) => {
  const { selectedUVData, promedio } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>UV</Text>
      <Text style={styles.subtitle}>
        {selectedUVData ? selectedUVData.name : "PROMEDIO"}
      </Text>
      <Text
        style={{
          ...styles.uvValue,
          color: getCategoriaPorUV(
            selectedUVData ? selectedUVData.uv : promedio
          ).color,
        }}
      >
        {selectedUVData ? selectedUVData.uv : promedio}
      </Text>
      <View>
        <Text style={styles.dateLabel}>
          {selectedUVData
            ? formatearFechaYHora(selectedUVData.fecha)
            : formatearFechaYHora()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(19, 35, 64, 0.6)",
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 0.3,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    height: "30%",
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
  },
  subtitle: {
    height: "20%",
    color: "white",
    fontSize: 10,
    textTransform: "uppercase",
    textAlign: "center",
  },
  uvValue: {
    color: "white",
    fontWeight: "bold",
    height: "40%",
    fontSize: 50,
    transform: [{ scaleY: 1.4 }],
  },
  dateLabel: {
    fontWeight: "bold",
    fontSize: 10,
    color: "white",
    transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MedicionUv;
