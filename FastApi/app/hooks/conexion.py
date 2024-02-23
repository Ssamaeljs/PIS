import requests 
import json
from utils.Util import Util
class Conexion:
    def URLN(server = "local"):
        if server == "local":
           return "https://semaforouvunlb.azurewebsites.net/api" 
        elif server == "unl":
            return "https://computacion.unl.edu.ec/uv/api/"
    def GET(urls, token=None, server="local"):
        headers = {}
        if token:
            headers["x-api-token"] = token    
        response = requests.get(f"{Conexion.URLN(server)}/{urls}", headers=headers)
        datos = response.json()
        return datos
    def POST(data, urls, token=None, type="json", server="local"):
        data = data.__dict__

        headers = {}
        if token:
            headers["x-api-token"] = token
        if type == "json":
            headers["Content-Type"] = "application/json"
            data = Util.convertir_a_json(data)
            data = json.dumps(data)
        elif type == "form":
            form_data = {key: str(value) for key, value in data.items()}
            data = form_data
        response = requests.post(f"{Conexion.URLN(server)}/{urls}", data=data, headers=headers)
        datos = response.json()
        return datos

    def DELETE(urls, token=None):
        headers = {}
        if token:
            headers["x-api-token"] = token

        response = requests.delete(f"{Conexion.URLN()}/{urls}", headers=headers)
        datos = response.json()
        return datos
