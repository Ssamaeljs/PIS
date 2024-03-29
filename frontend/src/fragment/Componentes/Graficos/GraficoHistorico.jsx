import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  PointElement,
  LineElement,
} from "chart.js";
import moment from "moment";
import { Button } from "react-bootstrap";
import generatePdf from "../generatePdf";
import { MDBCarousel, MDBCarouselItem, MDBCol, MDBRow } from "mdb-react-ui-kit";
import { getCategoriaPorUV } from "../MedicionUV/assets/MedicionUtils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  PointElement,
  LineElement
);

const GraficoHistorico = (props) => {
  const { radiacionUVPromedio, dispositivos, promedio, promedioHoy } = props;
  const dataPromedio = {
    //Coloca en los labels el filtrado de radiacionUVPromedio por este día

    labels: promedioHoy.map((item) => moment(item.dia).format("DD/MM/YYYY")),

    datasets: [
      {
        label: "Radiación UV Promedio Diario",
        data: promedioHoy.map((item) => item.promedio.toFixed(2)),
        tension: 0.5,
        fill: true,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointRadius: 5,
        pointBorderColor: promedioHoy.map((item) => {
          return getCategoriaPorUV(item.promedio).color;
        }),

        pointBackgroundColor: promedioHoy.map((item) => {
          return getCategoriaPorUV(item.promedio).color;
        }),
      },
    ],
  };

  const dataDispositivoActual = {
    labels: dispositivos.map((dispositivo) => dispositivo.nombre),
    datasets: [
      {
        label: "Radiación UV Dispositivos Actuales",
        data: dispositivos.map((dispositivo) =>
          dispositivo.medicion[0].uv.toFixed(2)
        ),
        tension: 0.5,
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgb(75, 192, 192)",
        pointRadius: 5,
        pointBorderColor: dispositivos.map((dispositivo) => {
          return getCategoriaPorUV(dispositivo.medicion[0].uv).color;
        }),
        pointBackgroundColor: dispositivos.map((dispositivo) => {
          return getCategoriaPorUV(dispositivo.medicion[0].uv).color;
        }),
      },
    ],
  };

  const options = {
    scales: {
      y: {
        min: 0,
        ticks: { color: "rgb(75, 192, 192)" },
      },
      x: {
        ticks: { color: "rgb(75, 192, 192)" },
      },
    },
  };

  return (
    <div
      className="card"
      style={{
        maxWidth: "100%",
        maxHeight: "100%",
        backgroundColor: "rgba(19, 35, 64, 0.7)",
      }}
    >
      <div className="card-header">
        <h3
          className="card-title text-center"
          style={{ fontWeight: "bold", color: "white" }}
        >
          Estadísticas
        </h3>
      </div>
      <div className="card-body">
        <MDBRow className="g-0">
          <MDBCol md="6">
            <div
              style={{
                width: "100%",
                height: "55%",
              }}
            >
              <Line data={dataPromedio} options={options} />
            </div>
            <div style={{ width: "100%", height: "100%" }}>
              <Line data={dataDispositivoActual} options={options} />
            </div>
          </MDBCol>
          <MDBCol md="6">
            <div
              style={{
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MDBCarousel
                showControls
                showIndicators
                style={{
                  transform: "translateY(25%)",
                }}
                interval={3000}
              >
                {dispositivos.map((dispositivo, index) => {
                  return (
                    <MDBCarouselItem itemId={index + 1} interval={3000}>
                      <div
                        style={{
                          width: "100%",
                          height: "70%",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <h3
                          style={{
                            color: "white",
                            fontSize: "25px",
                            fontFamily: "Arial",
                            fontWeight: "600",
                            borderBottom: "1px solid #e20613",
                          }}
                        >
                          {dispositivo.nombre}
                        </h3>

                        <div
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Line
                            data={{
                              labels: radiacionUVPromedio.map((item) => {
                                if (item.nombre === dispositivo.nombre) {
                                  return moment(item.fecha).format(
                                    "DD/MM/YYYY" + " " + "HH:mm"
                                  );
                                }
                              }),
                              datasets: [
                                {
                                  label:
                                    "Radiación UV de " + dispositivo.nombre,
                                  data: radiacionUVPromedio.map((item) => {
                                    if (item.nombre === dispositivo.nombre) {
                                      return item.uv.toFixed(2);
                                    }
                                  }),
                                  tension: 0.5,
                                  fill: true,
                                  borderColor: "rgb(75, 192, 192)",
                                  backgroundColor: "rgb(75, 192, 192)",
                                  pointRadius: 5,
                                  pointBorderColor: radiacionUVPromedio.map(
                                    (item) => {
                                      if (item.nombre === dispositivo.nombre) {
                                        return getCategoriaPorUV(item.uv).color;
                                      }
                                    }
                                  ),
                                  pointBackgroundColor: radiacionUVPromedio.map(
                                    (item) => {
                                      if (item.nombre === dispositivo.nombre) {
                                        return getCategoriaPorUV(item.uv).color;
                                      }
                                    }
                                  ),
                                },
                              ],
                            }}
                            options={{
                              scales: {
                                y: {
                                  min: 0,
                                  ticks: { color: "rgb(75, 192, 192)" },
                                },
                                x: {
                                  ticks: { color: "rgb(75, 192, 192)" },
                                },
                              },
                            }}
                          />
                        </div>
                      </div>
                    </MDBCarouselItem>
                  );
                })}
              </MDBCarousel>
              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "20px",
                }}
              >
                <Button
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    alignSelf: "center",
                    transform: "translateY(350%) ",
                  }}
                  className="btn btn-outline-danger"
                  size="lg"
                  alt="Generar Reporte"
                  onClick={() => {
                    generatePdf(dispositivos, promedio);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-file-earmark-pdf-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.523 12.424q.21-.124.459-.238a8 8 0 0 1-.45.606c-.28.337-.498.516-.635.572l-.035.012a.3.3 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548m2.455-1.647q-.178.037-.356.078a21 21 0 0 0 .5-1.05 12 12 0 0 0 .51.858q-.326.048-.654.114m2.525.939a4 4 0 0 1-.435-.41q.344.007.612.054c.317.057.466.147.518.209a.1.1 0 0 1 .026.064.44.44 0 0 1-.06.2.3.3 0 0 1-.094.124.1.1 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256M8.278 6.97c-.04.244-.108.524-.2.829a5 5 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.5.5 0 0 1 .145-.04c.013.03.028.092.032.198q.008.183-.038.465z" />
                    <path
                      fillRule="evenodd"
                      d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m5.5 1.5v2a1 1 0 0 0 1 1h2zM4.165 13.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.7 11.7 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.86.86 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.84.84 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.8 5.8 0 0 0-1.335-.05 11 11 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.24 1.24 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a20 20 0 0 1-1.062 2.227 7.7 7.7 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103"
                    />
                  </svg>{" "}
                  Generar Reporte de Medición Actual
                </Button>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </div>
    </div>
  );
};

export default GraficoHistorico;
