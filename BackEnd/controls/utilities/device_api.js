const URL_API = "https://computacion.unl.edu.ec/uv/api/";
const categorias = require("./colorValues.json");

const dispositivos_api = async () => {
  try {
    var dispositivos;
    const dispositivosResponse = await fetch(`${URL_API}listar`);
    const data1 = await dispositivosResponse.json();
    dispositivos = data1.dispositivos;

    var mediciones;
    const medicionesResponse = await fetch(`${URL_API}medicionDispositivos`);
    const data2 = await medicionesResponse.json();
    mediciones = data2.ultimasMediciones;

    var fecha = new Date();
    fecha.setDate(fecha.getDate() - 3);
    var data = {
      fechaInicio: fecha.toISOString(),
      fechaFin: new Date().toISOString(),
    };

    var promediosDias = await fetch(`${URL_API}medicionFechas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-token": process.env.TOKENDISPOSITIVO,
      },
      body: JSON.stringify(data),
    });
    promediosDias = await promediosDias.json();
    fecha.getDate(new Date().getDate() - 6);
    var promedioHoy = await fetch(`${URL_API}medicionDia`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-token": process.env.TOKENDISPOSITIVO,
      },

      body: JSON.stringify({
        fechaInicio: fecha.toISOString(),
        fechaFin: new Date().toISOString(),
      }),
    });
    promedioHoy = await promedioHoy.json();
    dispositivos = dispositivos.map((device) => {
      const deviceMedicion = mediciones.find(
        (medicion) => medicion.nombre === device.nombre
      );
      if (deviceMedicion) {
        device.medicion = deviceMedicion.medicions;
        device.id = deviceMedicion.id;
      } else {
        device.medicion = [
          {
            uv: 0,
            fecha: new Date().toISOString(),
          },
        ];
      }
      return device;
    });

    dispositivos = dispositivos.filter((dispositivo) => dispositivo.activo);

    promediosDias = promediosDias.mediciones.map((promedio) => {
      const device = dispositivos.find(
        (device) => device.id === promedio.dispositivoId
      );
      if (device) {
        promedio.nombre = device.nombre;
      }
      return promedio;
    });
    promediosDias = promediosDias.filter((promedio) => promedio.uv < 12);
    var dispositivosMedicion0 = dispositivos.filter((dispositivo) => {
      return dispositivo.medicion.some((medicion) => medicion.uv > 0);
    });

    var promedio = dispositivosMedicion0.reduce((acc, device) => {
      device.medicion.forEach((medicion) => {
        acc.push(medicion.uv);
      });
      return acc;
    }, []);

    promedio =
      promedio.reduce((acc, value) => acc + value, 0) / promedio.length;
    promedio = promedio.toFixed(2);
    return {
      dispositivos,
      promedio,
      categorias,
      promediosDias,
      promedioHoy: promedioHoy.promedioMediciones,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = dispositivos_api;
