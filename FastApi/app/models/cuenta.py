from typing import Optional
from pydantic import BaseModel

class Cuenta(BaseModel):
    correo: str
    clave: str
    description: Optional[str] = None
    description_pdf: Optional[str] = None

class CuentaLogin(BaseModel):
    correo: str
    clave: str