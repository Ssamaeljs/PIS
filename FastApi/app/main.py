from fastapi import FastAPI, Header
from starlette.responses import RedirectResponse
from pydantic import BaseModel
import models.persona as persona
import models.cuenta as cuenta
import uvicorn

from hooks.conexion import Conexion
app = FastAPI()

@app.get("/", include_in_schema=False)
def raiz():
    return RedirectResponse(url="/docs")

@app.get("/listar/api_dispositivo", tags=["Dispositivo"])
def listar_dispositivos():
    return Conexion.GET("listar/api_dispositivo")

@app.get("/activos", tags=["Dispositivo"])
def listar_activos():
    return Conexion.GET("activos", server="unl")

@app.get("/medicionDispositivos", tags=["Medición de Dispositivos"])
def listar_medicion_individual_dispositivos():
    return Conexion.GET("medicionDispositivos", server="unl")

@app.get("/medicionDispositivos", tags=["Medición de Dispositivos"])
def listar_medicion_individual_dispositivos():
    return Conexion.GET("medicionPromedio", server="unl")

@app.post("/medicionFechas", tags=["Medición de Dispositivos"])
def listar_medicion_fechas(fechas: persona.Fechas):
    return Conexion.POST(fechas, "medicionFechas", server="unl")

@app.post("/medicionSemana", tags=["Medición de Dispositivos"])
def listar_medicion_fechas(fechas: persona.Fechas):
    return Conexion.POST(fechas, "medicionSemana", server="unl")

@app.post("/medicionDia", tags=["Medición de Dispositivos"])
def listar_medicion_fechas(fechas: persona.Fechas):
    return Conexion.POST(fechas, "medicionDia", server="unl")

if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', port=8000)