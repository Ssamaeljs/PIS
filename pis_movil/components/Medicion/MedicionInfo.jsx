import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { getCategoriaPorUV } from "./assets/MedicionUtils";

const MedicionInfo = (props) => {
  const { selectedUVData, promedio } = props;
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            height: 35,
            color: selectedUVData
              ? getCategoriaPorUV(selectedUVData.uv).color
              : getCategoriaPorUV(promedio).color,
          }}
        >
          {(selectedUVData
            ? getCategoriaPorUV(selectedUVData.uv).tipo
            : getCategoriaPorUV(promedio).tipo
          ).toLocaleUpperCase()}
        </Text>
      </View>
      <View style={styles.row}>
        <Text
          style={{
            color: "white",
            fontSize: 9,
            fontWeight: "bold",
          }}
        >
          {selectedUVData
            ? getCategoriaPorUV(selectedUVData.uv).descripcion
            : getCategoriaPorUV(promedio).descripcion}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
  },
});

export default MedicionInfo;
