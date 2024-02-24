import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ChartJs } from "@dpwiese/react-native-canvas-charts/ChartJs/ChartJs";
import { getCategoriaPorUV } from "../Medicion/assets/MedicionUtils";
import colorValues from "../../utilidades/data/colorValues.json";
const Grafica = (props) => {
  const { promedio, dispositivos } = props;
  const venues = dispositivos.map((dispositivo) => {
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
    return {
      geometry: [dispositivo.latitud, dispositivo.longitud],
      name: dispositivo.nombre,
      uv: uv,
      fecha: fecha,
      estado: dispositivo.activo,
    };
  });

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
      padding: 1,
      height: "100%",
    },
    col: {
      width: "50%",
      height: "100%",
      padding: 4,
    },
  });

  const chartConfig = {
    type: "line",
    data: {
      labels: venues.map((venue) => {
        switch (venue.name) {
          case "Facultad de la Salud Humana":
            return "Salud Humana";
          case "Facultad de la Energía - FEIRNNR":
            return "FEIRNNR";
          case "Veterinaria":
            return "Veterinaria";
          case "Quinta experimental Punzara":
            return "Punzara";
          case "Area de contabilidad":
            return "Contabilidad";
          case "Hospital Universitario Motupe (G6)":
            return "H.Motupe";
          case "Hospital Universitario Motupe":
            return "H.Motupe";
          default:
            break;
        }
      }),

      datasets: [
        {
          label: "",
          pointStyle: false,
          backgroundColor: venues.map(
            (venue) => getCategoriaPorUV(venue.uv).color
          ),
          borderColor: venues.map((venue) => getCategoriaPorUV(venue.uv).color),
          borderWidth: 1,
          data: venues.map((venue) => venue.uv),
          fill: false,
          tension: 0.1,
        },
        {
          label: "Promedio",
          type: "line",
          backgroundColor: getCategoriaPorUV(promedio).color,
          borderColor: getCategoriaPorUV(promedio).color,
          borderWidth: 1,
          data: venues.map((venue) => promedio),
          fill: false,
          tension: 0.1,
        },
        {
          label: colorValues[0].tipo,
          backgroundColor: colorValues[0].color,
          borderColor: colorValues[0].color,
          borderWidth: 1,
          fill: false,
        },
        {
          label: colorValues[1].tipo,
          backgroundColor: colorValues[1].color,
          borderColor: colorValues[1].color,
          borderWidth: 1,
        },
        {
          label: colorValues[2].tipo,
          backgroundColor: colorValues[2].color,
          borderColor: colorValues[2].color,
          borderWidth: 1,
        },
        {
          label: colorValues[3].tipo,
          backgroundColor: colorValues[3].color,
          borderColor: colorValues[3].color,
          borderWidth: 1,
        },
        {
          label: colorValues[4].tipo,
          backgroundColor: colorValues[4].color,
          borderColor: colorValues[4].color,
          borderWidth: 1,
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  };

  return (
    <View style={styles.card}>
      <View style={{ ...styles.cardBody }}>
        <SafeAreaView>
          <ChartJs
            config={chartConfig}
            style={{ height: "100%", width: "100%" }}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

export default Grafica;
