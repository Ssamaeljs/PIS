from typing import Any, Optional
from pydantic import BaseModel
import datetime
from models import cuenta
from uuid import uuid4
class Persona(BaseModel):
    nombres: str
    apellidos: str
    fecha_nacimiento: datetime.date
    cargo: str
    institucion: str
    cuenta: cuenta.Cuenta

class PersonaRegistrarse(BaseModel):
    nombres: str
    apellidos: str
    fecha_nacimiento: datetime.date
    cargo: str
    institucion: str
    correo: str
    clave: str
    description: Optional[str] = None

class Fechas(BaseModel):
    fecha_incio: datetime.date
    fecha_fin: datetime.date