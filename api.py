from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pickle
import pandas as pd
import os

app = FastAPI(title="CambaPredict API")

# Permitir peticiones desde cualquier origen (CORS) para integrar con HTML local
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Definir la estructura de datos que recibe la API
class Pedido(BaseModel):
    distancia_km: float
    tiempo_osrm_min: int
    vehiculo: str
    hora: int
    dia_semana: int
    lluvia: int
    trafico: int
    zonas_bloqueadas: int

# Cargar el modelo si existe
modelo = None
columnas = None

if os.path.exists("modelo_camba.pkl") and os.path.exists("columnas_modelo.pkl"):
    with open("modelo_camba.pkl", "rb") as f:
        modelo = pickle.load(f)
    with open("columnas_modelo.pkl", "rb") as f:
        columnas = pickle.load(f)

@app.get("/")
def read_root():
    return {"status": "ok", "message": "API de CambaPredict funcionando."}

@app.post("/predecir")
def predecir_tiempo(pedido: Pedido):
    if not modelo or not columnas:
        # Modo simulado (si aún no se ha entrenado el modelo)
        # Esto sirve para que el frontend no falle
        tiempo_predicho = pedido.tiempo_osrm_min
        if pedido.trafico:
            tiempo_predicho += 8
        if pedido.lluvia:
            tiempo_predicho += 5
        if pedido.zonas_bloqueadas > 0:
            tiempo_predicho += pedido.zonas_bloqueadas * 3
            
        return {
            "tiempo_osrm_min": pedido.tiempo_osrm_min,
            "tiempo_predicho_min": int(tiempo_predicho),
            "modelo_usado": "Simulado (Falta modelo_camba.pkl)"
        }

    # Crear dataframe con los datos
    datos = pd.DataFrame([pedido.dict()])
    
    # Aplicar One-Hot Encoding como en el entrenamiento
    datos = pd.get_dummies(datos, columns=['vehiculo'], drop_first=False) # Guardamos todo
    
    # Asegurar que todas las columnas del modelo existan
    # (Si falta alguna categoría, rellenar con 0)
    datos_completos = pd.DataFrame(columns=columnas)
    
    for col in columnas:
        if col in datos.columns:
            datos_completos.loc[0, col] = datos.loc[0, col]
        else:
            datos_completos.loc[0, col] = 0
            
    # Hacer predicción
    prediccion = modelo.predict(datos_completos)[0]
    
    return {
        "tiempo_osrm_min": pedido.tiempo_osrm_min,
        "tiempo_predicho_min": int(round(prediccion)),
        "modelo_usado": "Random Forest"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api:app", host="0.0.0.0", port=8000, reload=True)
