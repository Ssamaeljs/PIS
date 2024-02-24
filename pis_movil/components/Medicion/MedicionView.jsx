import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import MedicionUv from "./MedicionUv";
import MedicionInfo from "./MedicionInfo";
import SelectDropdown from "react-native-select-dropdown";

const MedicionView = (props) => {
  const { promedio, dispositivos, data } = props;
  const [selectedUVData, setSelectedUVData] = useState();
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Medición</Text>
      </View>
      <View style={styles.cardBody}>
        <View style={{ ...styles.row }}>
          <View style={styles.col}>
            <MedicionUv selectedUVData={selectedUVData} promedio={promedio} />
          </View>
          <View style={{ width: "100%", height: "100%", padding: 4 }}>
            <SafeAreaView style={styles.col}>
              <SelectDropdown
                defaultButtonText="Seleccione la facultad"
                buttonStyle={styles.buttonStyle}
                dropdownStyle={styles.dropdownStyle}
                buttonTextStyle={{
                  color: "white",
                  fontSize: 10,
                  textTransform: "uppercase",
                }}
                rowTextStyle={{
                  color: "white",
                  fontSize: 11,
                  textTransform: "uppercase",
                }}
                data={data}
                search
                searchPlaceHolder="Buscar facultad..."
                searchPlaceHolderColor="white"
                onChangeSearchInputText={(text) => console.log(text)}
                searchInputStyle={{
                  backgroundColor: "rgba(19, 35, 64, 0.6)",
                }}
                dropdownOverlayColor="rgba(19, 35, 64, 0)"
                searchInputTxtStyle={{ color: "white" }}
                onSelect={(selectedItem, index) => {
                  dispositivos.filter((dispositivo) => {
                    if (selectedItem === "Seleccione la facultad") {
                      setSelectedUVData(null);
                    }
                    if (dispositivo.nombre === selectedItem) {
                      let uv = 0;
                      let fecha;
                      dispositivo.medicion.map((medicion) => {
                        fecha = medicion.fecha;
                        uv = medicion.uv;
                      });
                      uv = uv.toFixed(2);
                      if (uv >= 100 || uv == 0) {
                        uv = Math.floor(uv);
                      }
                      var venues = {
                        geometry: [dispositivo.latitud, dispositivo.longitud],
                        name: dispositivo.nombre,
                        uv: uv,
                        fecha: fecha,
                        estado: dispositivo.activo,
                      };
                      setSelectedUVData(venues);
                    }
                  });
                }}
              />
              <SafeAreaView
                style={{
                  width: "100%",
                  height: "100$",
                }}
              >
                <MedicionInfo
                  selectedUVData={selectedUVData}
                  promedio={promedio}
                />
              </SafeAreaView>
            </SafeAreaView>
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

export default MedicionView;
