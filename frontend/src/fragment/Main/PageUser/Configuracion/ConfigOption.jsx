import React, { useState } from "react";
import EditarPerfil from "./EditarPerfil/Mod/EditarPerfil";
import { Modal } from "react-bootstrap";
import Solicitud from "./Solicitud/Mod/Solicitud";
import InsertarToken from "./AccesoAPI/Mod/InsertarToken";

const ConfigOption = (props) => {
  const [showEditarPerfil, setShowEditarPerfil] = useState(false);
  const [showSolicitud, setShowSolicitud] = useState(false);
  const [showToken, setShowToken] = useState(false);

  const obtenerColorBoton = () => {
    if (props.numberOption == 1) {
      return "btn-outline-danger";
    }
    if (props.numberOption == 2) {
      return "btn-outline-dark";
    }
    if (props.numberOption == 3) {
      return "btn-outline-danger";
    }
  };
  return (
    <>
      <div
        className={"col-2 justify-content-center btn " + obtenerColorBoton()}
        style={{
          scale: "1.2",
          width: "25%",
          padding: "80px",
          color: "white",
          fontFamily: "Arial",
          fontWeight: "bold",
          borderRadius: "20px",
        }}
        onClick={() => {
          if (props.numberOption == 3) {
            setShowToken(true);
          }
          if (props.numberOption == 2) {
            setShowSolicitud(true);
          }
          if (props.numberOption == 1) {
            setShowEditarPerfil(true);
          }
        }}
      >
        {props.numberOption == 1 && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="130"
            height="200"
            fill="none"
            viewBox="0 0 249 225"
          >
            <path
              fill="white"
              d="m154.744 163.043 62.868 19.452a.861.861 0 0 1 .597.941c-1.134 8.254-1.539 16.333-10.294 19.555-3.462 1.268-8.128.849-12.055.849-49.098.061-98.527.092-148.287.092-7.011 0-11.741-2.652-14.19-7.957-1.762-3.815-1.894-8.448-2.683-12.62a.562.562 0 0 1 .067-.384.529.529 0 0 1 .297-.24l62.797-19.524a1.67 1.67 0 0 0 .791-.536c.207-.252.336-.56.373-.886.573-5.216.951-10.473 1.133-15.77.03-1.013-.546-2.731-1.194-3.508-5.439-6.532-9.882-13.357-13.33-20.475-1.407-2.915-3.401-5.012-5.163-7.568-3.613-5.216-4.048-11.404-2.388-17.53a36.063 36.063 0 0 0 1.234-8.99c.054-4.35.166-8.894.335-13.633.27-7.657.489-12.214.657-13.674 1.741-15.003 7.987-27.05 21.742-33.954a70.25 70.25 0 0 1 19.04-6.351c10.419-1.882 21.907-2.755 34.465-2.618.284.002.56.097.788.272.228.175.395.42.477.7a278.799 278.799 0 0 0 5.648 17.426c.78 2.169 2.683 2.762 4.494 3.713 7.4 3.897 9.738 18.511 10.001 26.407.229 7.077.358 13.384.385 18.92.02 3.389.536 7.139 1.548 11.25.756 3.055 1.08 5.85.972 8.387-.344 7.946-6.063 11.781-9.171 18.429-2.834 6.075-6.744 12.051-11.731 17.929-1.437 1.687-2.277 3.835-2.126 6.105.331 5.134.716 10.026 1.154 14.676.054.607.304.979.749 1.115Z"
            />
            <path
              fill="white"
              d="M160.463 156.355c-.476-4.49-1.204-9.174 1.832-13.061 4.184-5.352 7.669-10.738 10.456-16.159 1.262-2.454 2.602-4.609 4.019-6.463 4.565-6.004 7.227-13.255 6.002-20.772-.85-5.206-2.672-9.982-2.611-15.453.067-6.43.04-12.457-.081-18.082-.23-10.691-3.121-20.445-8.675-29.26-.202-.328-.115-.512.263-.553a273.93 273.93 0 0 1 23.443-1.33 1.262 1.262 0 0 1 1.204.86l5.274 16.087c.119.357.32.68.586.94.266.26.589.45.942.553 3.03.894 5.301 2.891 6.812 5.994 1.876 3.852 3.037 7.748 3.482 11.69 1.08 9.49 1.508 18.398 1.286 26.723-.054 1.855.337 3.6 1.174 5.237 3.553 6.913 2.338 13.039-1.782 19.125-4.737 6.985-8.32 15.596-14.262 21.906-.904.962-1.305 2.193-1.204 3.693.425 6.054.833 12.409 1.225 19.063a.496.496 0 0 1-.422.509.486.486 0 0 1-.236-.028c-1.64-.668-3.509-1.255-5.608-1.759a943.525 943.525 0 0 1-32.167-8.325c-.574-.157-.891-.535-.952-1.135ZM76.41 37.186c-5.05 8.346-7.368 20.128-7.48 29.506-.094 8.005-.286 14.911-.577 20.72-.192 3.979-1.164 7.824-1.852 11.64-1.242 6.845.078 13.185 3.958 19.022 1.832 2.761 3.927 5.246 5.425 8.294 3.023 6.143 6.795 12.075 11.317 17.796 2.6 3.303 1.74 8.243 1.336 12.017-.095.907-.577 1.469-1.448 1.687l-37.107 9.44c-.648.17-.948-.085-.9-.767.505-6.436.947-12.774 1.325-19.013.068-1.131-.3-2.123-1.103-2.976-3.84-4.036-7.318-9.351-10.436-15.944-1.761-3.723-5.253-6.883-6.741-10.473-2.095-5.032-1.437-10.36.992-15.208.722-1.432 1.07-2.918 1.042-4.459-.06-3.075-.064-6.201-.01-9.378.075-4.098.341-8.724.8-13.879.5-5.55 1.34-9.975 2.52-13.275 6.195-17.263 21.945-22.663 38.626-25.23a.31.31 0 0 1 .309.139.319.319 0 0 1 .004.341Z"
            />
          </svg>
        )}
        {props.numberOption == 2 && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="130"
            height="200"
            fill="currentColor"
            className="bi bi-file-earmark-text-fill"
            viewBox="0 0 16 16"
          >
            <path d="M9.293 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.707A1 1 0 0 0 13.707 4L10 .293A1 1 0 0 0 9.293 0M9.5 3.5v-2l3 3h-2a1 1 0 0 1-1-1M4.5 9a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1zM4 10.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 1 0-1h4a.5.5 0 0 1 0 1z" />
          </svg>
        )}
        {props.numberOption == 3 && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="130"
            height="200"
            fill="currentColor"
            className="bi bi-key-fill"
            viewBox="0 0 16 16"
          >
            <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
          </svg>
        )}
        <label style={{ fontSize: "10px", scale: "1.7" }}>
          {props.numberOption == 3 && "Acceso a la API"}
          {props.numberOption == 2 && "Ver Solicitud"}
          {props.numberOption == 1 && "Editar Perfil"}
        </label>
      </div>
      <Modal
        show={showEditarPerfil}
        onHide={() => setShowEditarPerfil(false)}
        style={{ "--bs-modal-width": "50%" }}
        keyboard={false}
      >
        <EditarPerfil setShow={setShowEditarPerfil} usuario={props.user} />
      </Modal>
      <Modal
        show={showSolicitud}
        onHide={() => setShowSolicitud(false)}
        style={{ "--bs-modal-width": "40%", transform: "translateY(10%)" }}
        keyboard={false}
      >
        <Solicitud setShow={setShowSolicitud} usuario={props.user} />
      </Modal>
      <Modal
        show={showToken}
        onHide={() => setShowToken(false)}
        style={{ "--bs-modal-width": "40%", transform: "translateY(10%)" }}
        keyboard={false}
      >
        <InsertarToken setShow={setShowToken} usuario={props.user} />
      </Modal>
    </>
  );
};

export default ConfigOption;
