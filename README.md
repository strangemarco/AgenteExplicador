#  Camba Envíos (v2.0) - Logística y Entregas Inteligentes

Camba Envíos es un sistema interactivo de simulación y gestión de rutas logísticas. Esta plataforma simula un entorno empresarial realista de envíos en Santa Cruz de la Sierra, integrando algoritmos de búsqueda para determinar la ruta óptima de reparto.

## Novedades y Cambios Recientes (Actualización Premium)

Durante nuestra última sesión de trabajo, llevamos el sistema de un prototipo escolar a una interfaz de nivel profesional (SaaS Premium), implementando las siguientes mejoras:

### 1. Interfaz y Experiencia de Usuario (UI/UX)
- **Dashboard en Tiempo Real:** Se integró la librería `Chart.js` para crear un gráfico Doughnut interactivo que contabiliza los pedidos y se actualiza al instante cada vez que un pedido cambia de estado.
- **Skeleton Loaders:** Se añadieron efectos de carga simulados ("skeletons" parpadeantes) entre las transiciones de los casos para dar una sensación de software empresarial robusto.
- **Progress Tracker Visual:** Incorporamos una barra de progreso estilo UberEats/PedidosYa (Creado → En Camino → Entregado) sobre el mapa, que avanza llenando su barra azul conforme la simulación del pedido avanza.
- **Radar de Destino (Leaflet):** Se mejoró el marcador visual de destino usando un ícono CSS personalizado que emite ondas tipo radar continuamente.
- **Paginación y Pestañas Inteligentes:** Las pestañas de la parte superior ahora mantienen fijos los 3 casos iniciales y gestionan el caso "nuevo/actual" de forma temporal para evitar el desborde de la interfaz.

### 2. Simulación y Lógica Autónoma
- **Transición Automática de Estados:** Todos los pedidos nuevos nacen como "Recién Creado". A los 5 segundos pasan a "En Camino" y a los 8 segundos extra se marcan como "Entregado", con notificaciones "Toast" integradas.
- **Sincronización Total UI:** Hacer clic en un pedido de la barra lateral ahora sincroniza inmediatamente la barra de progreso (Progress Tracker) sin tener que recargar el mapa ni perder los efectos visuales.
- **Persistencia de Datos Mejorada:** El LocalStorage guarda no solo las rutas, sino también los colores y el estado actual de la simulación.

### 3. Clima y Eventos de Tráfico
- **Sincronización de Costos:** Se arregló el desajuste de minutos. Ahora, cuando se enciende el simulador de Lluvia o Tráfico, el tiempo se actualiza correctamente no solo en la tarjeta principal, sino en todas las tarjetas de los algoritmos y se reescribe el texto de la Explicación del Agente para mantener perfecta coherencia.

### 4. Motor de Inteligencia (Algoritmos)
- **Cálculo en Tiempo Real de 3 Algoritmos:** El código estático o el antiguo Dijkstra se sustituyó. Ahora, al crear un pedido nuevo de forma manual, el sistema ejecuta internamente en milisegundos:
  - **BFS** (Búsqueda en Anchura)
  - **DFS** (Búsqueda en Profundidad)
  - **Backtracking con Poda**
- El resultado dinámico de esta ejecución es lo que nutre las 3 tarjetas comparativas en pantalla, garantizando que Backtracking demuestre ser la ruta óptima para cada nuevo pedido.

---
**Desarrollado para la Actividad 4 - Agentes Inteligentes.**
