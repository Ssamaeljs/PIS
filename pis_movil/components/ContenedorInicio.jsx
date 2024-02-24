import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, Image, View } from "react-native";
import { GET } from "../hooks/Conexion";
import MedicionView from "./Medicion/MedicionView";
import Grafica from "./Grafica/Grafica";
import Recomendaciones from "./Recomendaciones/Recomendaciones";
const ContenedorInicio = () => {
  const [dispositivos, setDispositivos] = useState([]);
  const [promedio, setPromedio] = useState(0);
  const [llDispositivos, setLlDispositivos] = useState(false);
  const [selectedUVData, setSelectedUVData] = useState();
  const [data, setData] = useState(["Seleccione la facultad"]);
  useEffect(() => {
    if (!llDispositivos) {
      GET("listar/api_dispositivo")
        .then((info) => {
          var dispositivos, promedio;
          dispositivos = info.info.dispositivos;
          promedio = info.info.promedio;
          if (info.code != 200) {
          } else {
            setDispositivos(dispositivos);
            setPromedio(promedio);
            dispositivos.map((dispositivo) => {
              setData((data) => [...data, dispositivo.nombre]);
            });
            setLlDispositivos(true);
          }
        })
        .catch((error) => {
          throw new Error("Error al obtener los dispositivos: " + error);
        });
    }
  }, [llDispositivos]);
  const styles = StyleSheet.create({
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
  return (
    <>
      {llDispositivos && dispositivos.length > 0 && promedio && (
        <SafeAreaView style={styles.col}>
          <SafeAreaView
            style={{
              width: 360,
              height: 30,
              backgroundColor: "rgba(19, 35, 64, 0.8)",
            }}
          ></SafeAreaView>
          <SafeAreaView
            style={{
              paddingTop: 9,
              paddingLeft: 9,
              paddingRight: 9,
              width: 360,
              height: 200,
              borderTopColor: "rgba(19, 35, 64, 0.6)",
              borderTopWidth: 5,
              backgroundColor: "rgba(19, 35, 64, 0.6)",
            }}
          >
            <Text
              style={{
                flex: 1,
                fontSize: 25,
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
                borderBottomColor: "#e20613",
                borderBottomWidth: 2,
              }}
            >
              SEMÁFORO DE RADIACIÓN UV
            </Text>

            <Image
              source={{
                uri: "https://unl.edu.ec/sites/default/files/inline-images/logo_0.png",
              }}
              style={{
                width: 300,
                height: 100,
                transform: [{ scale: 0.6 }],
                alignSelf: "center",
              }}
            />
          </SafeAreaView>
          <SafeAreaView
            style={{
              padding: 9,
              flexDirection: "column",
              width: 360,
              height: 300,
              backgroundColor: "rgba(19, 35, 64, 0.6)",
            }}
          >
            <MedicionView
              selectedUVData={selectedUVData}
              promedio={promedio}
              data={data}
              dispositivos={dispositivos}
            />
          </SafeAreaView>
          <SafeAreaView
            style={{
              padding: 9,
              flexDirection: "column",
              width: 360,
              height: 240,
              backgroundColor: "rgba(19, 35, 64, 0.6)",
            }}
          >
            <Recomendaciones
              selectedUVData={selectedUVData}
              promedio={promedio}
              data={data}
              dispositivos={dispositivos}
            />
          </SafeAreaView>
        </SafeAreaView>
      )}
    </>
  );
};

export default ContenedorInicio;
