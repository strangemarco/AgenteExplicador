# Camba Envíos & CambaPredict (v3.0) - Logística e Inteligencia Artificial

Camba Envíos es un sistema interactivo de simulación y gestión de rutas logísticas. Esta plataforma simula un entorno empresarial realista de envíos en Santa Cruz de la Sierra, integrando algoritmos de búsqueda para determinar la ruta óptima de reparto y modelos de **Machine Learning** para predecir con precisión los tiempos de entrega.

## 🚀 Novedades de la Versión 3.0 (Machine Learning)

En esta última gran actualización, hemos transformado el sistema en una plataforma inteligente (**CambaPredict**), cumpliendo con todos los requisitos de integración de Inteligencia Artificial (Actividad 3).

### 1. Predicción Inteligente de Tiempos
- **Dataset Sintético:** Se generó un script en Python (`generar_dataset.py`) que crea un dataset histórico realista (`entregas_camba.csv`) con 500 registros, tomando en cuenta la distancia, el tiempo base OSRM, el vehículo, la lluvia, el tráfico y las zonas bloqueadas.
- **Entrenamiento de Modelos:** Se incluyó un cuaderno de Jupyter (`entrenar_modelo.ipynb`) preparado para Google Colab, donde se limpian los datos y se entrenan 3 modelos: *Regresión Lineal*, *Árbol de Decisión* y *Random Forest*.
- **Random Forest:** Fue seleccionado como el mejor modelo por su menor Error Cuadrático Medio (RMSE) y mayor precisión (R²). El modelo entrenado se exporta automáticamente como `modelo_camba.pkl`.

### 2. Integración Backend (API)
- **FastAPI:** Se desarrolló un servidor local ligero (`api.py`) que carga el modelo de Machine Learning y levanta un endpoint `POST /predecir`. 
- **Conexión en Tiempo Real:** Al hacer clic en el mapa y generar una nueva ruta, el Frontend se comunica instantáneamente con el Backend para solicitar una predicción real basada en los datos climáticos y logísticos del momento.

### 3. Interfaz de Usuario y Resiliencia
- **Explicación del Agente:** El sistema ahora incluye un párrafo dinámico en la explicación del Agente, donde detalla cómo Machine Learning ajustó el tiempo base tomando en cuenta los factores climáticos.
- **Plan B Automático (Fallback):** Si el servidor de Python está apagado o no está instalado, la página web no se rompe. Captura el error de conexión y activa un modelo matemático de contingencia en JavaScript puro, permitiendo que la demostración de la interfaz continúe funcionando perfectamente sin interrupciones visuales.
- **Bitácora de Auditoría de IA:** Al final de la página, se actualizó la bitácora para registrar la auditoría de cada intervención humana vs IA durante las fases de Preparación, Modelado, Evaluación, Código y Sesgos.

---

## 💻 Versión 2.0 (UI/UX y Algoritmos)

### 1. Interfaz y Experiencia de Usuario (UI/UX)
- **Dashboard en Tiempo Real:** Gráfico Doughnut (`Chart.js`) interactivo que contabiliza los pedidos.
- **Skeleton Loaders:** Efectos de carga simulados ("skeletons" parpadeantes) entre las transiciones de los casos.
- **Progress Tracker Visual:** Barra de progreso estilo UberEats (Creado → En Camino → Entregado) sobre el mapa.
- **Radar de Destino (Leaflet):** Marcador visual de destino que emite ondas tipo radar continuamente.
- **Paginación Inteligente:** Pestañas superiores que gestionan casos temporales sin desbordar la interfaz.

### 2. Simulación y Lógica Autónoma
- **Transición Automática:** Los pedidos nuevos pasan a "En Camino" y luego a "Entregado" de forma autónoma con notificaciones Toast.
- **Sincronización Total UI:** La barra lateral y el Progress Tracker se comunican instantáneamente sin recargas.
- **Persistencia:** LocalStorage guarda rutas, colores y estado actual de simulación.

### 3. Clima y Eventos de Tráfico
- **Sincronización Global:** Al encender simulador de Lluvia o Tráfico, el tiempo y los textos se actualizan correctamente no solo en la tarjeta principal, sino en el texto de Machine Learning y en todas las comparativas.

### 4. Motor de Inteligencia (Algoritmos)
- **Cálculo de 3 Algoritmos:** Al crear un pedido, el sistema ejecuta internamente:
  - **BFS** (Búsqueda en Anchura)
  - **DFS** (Búsqueda en Profundidad)
  - **Backtracking con Poda**
- El resultado demuestra de forma dinámica por qué Backtracking calcula la ruta teórica óptima.
