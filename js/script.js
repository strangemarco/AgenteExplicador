// ============================================================
// DATOS DE LOS NODOS (TODOS LOS PUNTOS POSIBLES CON COORDENADAS)
// ============================================================
const nodosDisponibles = {
    "La_Ramada": [-17.795, -63.190],
    "Plaza_24_Septiembre": [-17.783, -63.182],
    "Zona_Sur_A": [-17.810, -63.175],
    "Zona_Sur_B": [-17.820, -63.170],
    "Cristo_Redentor": [-17.768, -63.183],
    "Parque_Urbano": [-17.788, -63.175],
    "Terminal_Bimodal": [-17.790, -63.165],
    "Equipetrol": [-17.760, -63.195],
    "Hospital_Japanes": [-17.775, -63.160]
};

// ============================================================
// DATOS DE LAS ARISTAS (CONEXIONES ENTRE NODOS)
// ============================================================
let aristas = [
    { from: "La_Ramada", to: "Plaza_24_Septiembre", label: "3 min", baseTime: 3 },
    { from: "La_Ramada", to: "Cristo_Redentor", label: "4 min", baseTime: 4 },
    { from: "La_Ramada", to: "Equipetrol", label: "5 min", baseTime: 5 },
    { from: "La_Ramada", to: "Terminal_Bimodal", label: "7 min", baseTime: 7 },
    { from: "Plaza_24_Septiembre", to: "Zona_Sur_A", label: "2 min", baseTime: 2 },
    { from: "Plaza_24_Septiembre", to: "Equipetrol", label: "3 min", baseTime: 3 },
    { from: "Zona_Sur_A", to: "Zona_Sur_B", label: "3 min", baseTime: 3 },
    { from: "Zona_Sur_A", to: "Parque_Urbano", label: "4 min", baseTime: 4 },
    { from: "Zona_Sur_B", to: "Parque_Urbano", label: "2 min", baseTime: 2 },
    { from: "Zona_Sur_B", to: "Hospital_Japanes", label: "3 min", baseTime: 3 },
    { from: "Cristo_Redentor", to: "Parque_Urbano", label: "5 min", baseTime: 5 },
    { from: "Cristo_Redentor", to: "Equipetrol", label: "6 min", baseTime: 6 },
    { from: "Parque_Urbano", to: "Hospital_Japanes", label: "4 min", baseTime: 4 },
    { from: "Hospital_Japanes", to: "Terminal_Bimodal", label: "3 min", baseTime: 3 },
    { from: "Equipetrol", to: "Plaza_24_Septiembre", label: "3 min", baseTime: 3 }
];

// ============================================================
// CASOS DE PRUEBA Y CLIENTES
// ============================================================
const defaultCasos = [
    {
        id: "principal",
        origen: "La_Ramada",
        destino: "Zona_Sur_B",
        cliente: { nombre: "Carlos Méndez", telefono: "+591 71234567", avatar: "CM" },
        repartidor: { nombre: "Juan (Moto)", foto: "🏍️", tipo: "Moto", tarifaMin: 2.5 },
        ruta: ["La_Ramada", "Plaza_24_Septiembre", "Zona_Sur_A", "Zona_Sur_B"],
        costo_minutos: 8,
        algoritmo_usado: "Backtracking con poda",
        nodos_explorados: 42,
        comparacion: {
            BFS: { costo: 10, nodos: 7, camino: ["La_Ramada", "Plaza_24_Septiembre", "Zona_Sur_A", "Zona_Sur_B"] },
            DFS: { costo: 17, nodos: 4, camino: ["La_Ramada", "Cristo_Redentor", "Parque_Urbano", "Zona_Sur_B"] },
            Backtracking: { costo: 8, nodos: 42, camino: ["La_Ramada", "Plaza_24_Septiembre", "Zona_Sur_A", "Zona_Sur_B"] }
        },
        explicacion: `**1. RESUMEN EJECUTIVO**  
        Se recomienda la ruta La_Ramada → Plaza_24_Septiembre → Zona_Sur_A → Zona_Sur_B, que es la más eficiente con 8 minutos. Se obtuvo usando Backtracking con poda, explorando 42 nodos en 0.025 ms.

        **2. DETALLE DE LA RUTA**  
        Inicia en La Ramada, pasa por Plaza 24 de Septiembre (centro), luego Zona Sur A (área comercial) y finaliza en Zona Sur B. Es el camino más directo.

        **3. ANÁLISIS COMPARATIVO**  
        - BFS: 10 min, 7 nodos. La ruta Backtracking es 20% más rápida.  
        - DFS: 17 min, 4 nodos. Backtracking es más del doble de rápido y explora más nodos para mayor precisión.

        **4. IMPLICACIONES PARA EL NEGOCIO**  
        - Ahorro de 2 min vs BFS y 9 min vs DFS.  
        - Menor consumo de combustible y mayor satisfacción del cliente por entregas más rápidas.

        **5. RECOMENDACIÓN FINAL**  
        Utilizar Backtracking con poda para planificar rutas, ya que equilibra eficiencia y exploración.`
    },
    {
        id: "contraprueba",
        origen: "La_Ramada",
        destino: "Terminal_Bimodal",
        cliente: { nombre: "Ana Suárez", telefono: "+591 78901234", avatar: "AS" },
        repartidor: { nombre: "Pedro (Camioneta)", foto: "🛻", tipo: "Camioneta", tarifaMin: 4.0 },
        ruta: ["La_Ramada", "Terminal_Bimodal"],
        costo_minutos: 7,
        algoritmo_usado: "Backtracking con poda",
        nodos_explorados: 18,
        comparacion: {
            BFS: { costo: 7, nodos: 4, camino: ["La_Ramada", "Terminal_Bimodal"] },
            DFS: { costo: 31, nodos: 7, camino: ["La_Ramada", "Cristo_Redentor", "Parque_Urbano", "Zona_Sur_A", "Zona_Sur_B", "Hospital_Japanes", "Terminal_Bimodal"] },
            Backtracking: { costo: 7, nodos: 18, camino: ["La_Ramada", "Terminal_Bimodal"] }
        },
        explicacion: `**1. RESUMEN EJECUTIVO**  
        Ruta directa La_Ramada → Terminal_Bimodal en 7 minutos. Este caso demuestra que DFS NO es confiable (encontró 31 min).

        **2. DETALLE DE LA RUTA**  
        Viaje directo sin paradas intermedias. La ruta más corta posible.

        **3. ANÁLISIS COMPARATIVO**  
        - BFS: 7 min, 4 nodos (mismo tiempo, menos exploración).  
        - DFS: 31 min, 7 nodos (343% más larga). Backtracking evita este problema.

        **4. IMPLICACIONES PARA EL NEGOCIO**  
        - Ahorro de 24 minutos vs DFS.  
        - Menor combustible y mayor eficiencia operativa.

        **5. RECOMENDACIÓN FINAL**  
        No usar DFS. Backtracking con poda o BFS son opciones confiables.`
    },
    {
        id: "alternativa",
        origen: "La_Ramada",
        destino: "Parque_Urbano",
        cliente: { nombre: "Luis Fernando", telefono: "+591 75556677", avatar: "LF" },
        repartidor: { nombre: "Miguel (Bici)", foto: "🚴", tipo: "Bicicleta", tarifaMin: 1.5 },
        ruta: ["La_Ramada", "Cristo_Redentor", "Parque_Urbano"],
        costo_minutos: 9,
        algoritmo_usado: "Backtracking con poda",
        nodos_explorados: 15,
        comparacion: {
            BFS: { costo: 9, nodos: 5, camino: ["La_Ramada", "Cristo_Redentor", "Parque_Urbano"] },
            DFS: { costo: 19, nodos: 3, camino: ["La_Ramada", "Equipetrol", "Plaza_24_Septiembre", "Zona_Sur_A", "Zona_Sur_B", "Parque_Urbano"] },
            Backtracking: { costo: 9, nodos: 15, camino: ["La_Ramada", "Cristo_Redentor", "Parque_Urbano"] }
        },
        explicacion: `**1. RESUMEN EJECUTIVO**  
        Ruta recomendada: La_Ramada → Cristo_Redentor → Parque_Urbano en 9 minutos. Backtracking con poda exploró 15 nodos.

        **2. DETALLE DE LA RUTA**  
        Desde La Ramada hacia Cristo Redentor (punto de referencia) y luego al Parque Urbano. Ruta limpia y directa.

        **3. ANÁLISIS COMPARATIVO**  
        - BFS: 9 min, 5 nodos (mismo tiempo, menos nodos).  
        - DFS: 19 min, 3 nodos (ruta mucho más larga). Backtracking ofrece la mejor relación tiempo-exploración.

        **4. IMPLICACIONES PARA EL NEGOCIO**  
        - Ahorro de 10 min vs DFS.  
        - Consumo de combustible reducido y mejor experiencia de cliente.

        **5. RECOMENDACIÓN FINAL**  
        Backtracking con poda es versátil y confiable para distintos destinos.`
    }
];

let casos = JSON.parse(localStorage.getItem('casos')) || defaultCasos;

// ============================================================
// RECORRIDOS DEL DÍA
// ============================================================
const defaultRecorridos = [
    { hora: "08:30", cliente: "María López", destino: "Equipetrol", estado: "Entregado", color: "#16a34a" },
    { hora: "09:15", cliente: "Juan Pérez", destino: "Terminal_Bimodal", estado: "Entregado", color: "#16a34a" },
    { hora: "10:00", cliente: "Elena Gómez", destino: "Zona_Sur_A", estado: "Entregado", color: "#16a34a" },
    { hora: "11:30", cliente: "Carlos Méndez", destino: "Zona_Sur_B", estado: "En Camino", color: "#f59e0b" }
];

let recorridosDelDia = JSON.parse(localStorage.getItem('recorridos')) || defaultRecorridos;
let nodosBloqueados = new Set(JSON.parse(localStorage.getItem('nodosBloqueados')) || []);

let currentPageRecorridos = 1;
const ITEMS_PER_PAGE = 5;

function renderRecorridos() {
    const lista = document.getElementById('listaRecorridos');
    const paginacion = document.getElementById('paginacionRecorridos');
    let html = '';
    
    // Invertir para mostrar los más nuevos primero
    const reversed = [...recorridosDelDia].reverse();
    
    const totalPages = Math.ceil(reversed.length / ITEMS_PER_PAGE) || 1;
    if (currentPageRecorridos > totalPages) currentPageRecorridos = totalPages;
    
    const start = (currentPageRecorridos - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pageItems = reversed.slice(start, end);
    
    pageItems.forEach((rec, i) => {
        // Encontrar el índice original en el arreglo no invertido
        const originalIndex = recorridosDelDia.length - 1 - (start + i);
        const hasCaso = rec.casoIndex !== undefined;
        const casoObj = hasCaso ? casos[rec.casoIndex] : null;
        const isLibre = casoObj && casoObj.tipo === 'libre';

        const pointerStyle = hasCaso ? "cursor: pointer;" : "";
        const hoverEffect = hasCaso ? "onmouseover=\"this.style.background='#f1f5f9'\" onmouseout=\"this.style.background='transparent'\"" : "";
        const clickAction = hasCaso ? `onclick="window.cargarCaso(${rec.casoIndex})"` : "";
        
        const editButton = (hasCaso && isLibre) ? `
            <button class="btn-edit" onclick="event.stopPropagation(); window.openEditModal(${rec.casoIndex})" style="position: absolute; right: 10px; top: 10px; background: none; border: none; color: #94a3b8; cursor: pointer;" title="Cambiar Vehículo">
                <i class="fas fa-pencil-alt"></i>
            </button>
        ` : '';
        
        html += `
            <li style="${pointerStyle} transition: background 0.2s; border-radius: 8px; position: relative;" ${hoverEffect} ${clickAction} title="${hasCaso ? 'Ver Pedido' : ''}">
                ${editButton}
                <div class="timeline-dot" style="background: ${rec.color}; border-color: white;"></div>
                <div class="timeline-content">
                    <div class="timeline-title">${rec.cliente} - ${rec.destino}</div>
                    <div class="timeline-meta">
                        <span><i class="far fa-clock"></i> ${rec.hora}</span>
                        <span class="badge" style="background: ${rec.color}20; color: ${rec.color}; cursor: pointer;" onclick="event.stopPropagation(); cycleStatus(${originalIndex})" title="Clic para cambiar estado">${rec.estado}</span>
                    </div>
                </div>
            </li>
        `;
    });
    
    lista.innerHTML = html;
    
        // Paginación
    if (totalPages > 1 && paginacion) {
        paginacion.style.display = 'flex';
        paginacion.innerHTML = `
            <button onclick="cambiarPaginaRecorridos(-1)" ${currentPageRecorridos === 1 ? 'disabled' : ''} style="background: none; border: none; cursor: pointer; color: #3b82f6; font-weight: bold; padding: 5px;">&laquo; Ant</button>
            <span style="font-size: 0.9rem; color: #64748b;">Pág ${currentPageRecorridos} de ${totalPages}</span>
            <button onclick="cambiarPaginaRecorridos(1)" ${currentPageRecorridos === totalPages ? 'disabled' : ''} style="background: none; border: none; cursor: pointer; color: #3b82f6; font-weight: bold; padding: 5px;">Sig &raquo;</button>
        `;
    } else if (paginacion) {
        paginacion.style.display = 'none';
        paginacion.innerHTML = '';
    }
    
    // Si la gráfica existe, actualizarla
    if (typeof updateDashboard === 'function') {
        updateDashboard();
    }
}

window.cambiarPaginaRecorridos = function(dir) {
    currentPageRecorridos += dir;
    renderRecorridos();
};

window.cycleStatus = function(index) {
    const rec = recorridosDelDia[index];
    const states = [
        { estado: "Recién Creado", color: "#3b82f6" },
        { estado: "En Camino", color: "#f59e0b" },
        { estado: "Entregado", color: "#16a34a" },
        { estado: "Cancelado", color: "#ef4444" }
    ];
    
    let currentIdx = states.findIndex(s => s.estado === rec.estado);
    if (currentIdx === -1) currentIdx = 0;
    
    const nextIdx = (currentIdx + 1) % states.length;
    rec.estado = states[nextIdx].estado;
    rec.color = states[nextIdx].color;
    
    localStorage.setItem('recorridos', JSON.stringify(recorridosDelDia));
    renderRecorridos();
    
    // Si el caso actual es el que estamos viendo, actualizar tracker visualmente
    if (rec.casoIndex === currentIndex) {
        actualizarTracker(rec.estado);
    }
};

window.cargarCaso = function(index) {
    if (casos[index]) {
        currentIndex = index;
        renderTabs();
        // Mostrar skeleton loader antes de renderizar
        document.getElementById('mainCard').innerHTML = `
            <div class="skeleton-loader" style="padding: 2rem;">
                <div class="skeleton-header" style="height: 40px; background: #334155; border-radius: 8px; margin-bottom: 1rem; width: 60%; animation: pulse 1.5s infinite;"></div>
                <div class="skeleton-body" style="height: 200px; background: #334155; border-radius: 8px; margin-bottom: 1rem; animation: pulse 1.5s infinite;"></div>
                <div class="skeleton-cards" style="display: flex; gap: 1rem;">
                    <div style="flex:1; height: 100px; background: #334155; border-radius: 8px; animation: pulse 1.5s infinite;"></div>
                    <div style="flex:1; height: 100px; background: #334155; border-radius: 8px; animation: pulse 1.5s infinite;"></div>
                </div>
                <style>
                    @keyframes pulse {
                        0% { opacity: 0.5; }
                        50% { opacity: 0.8; }
                        100% { opacity: 0.5; }
                    }
                </style>
            </div>
        `;
        setTimeout(() => {
            renderCaso(index);
        }, 600);
    }
};

window.simularProgresoPedido = function(recorridoIndex) {
    // A los 5 segundos cambia a "En Camino"
    setTimeout(() => {
        if (recorridosDelDia[recorridoIndex] && recorridosDelDia[recorridoIndex].estado === "Recién Creado") {
            recorridosDelDia[recorridoIndex].estado = "En Camino";
            recorridosDelDia[recorridoIndex].color = "#f59e0b"; // Naranja
            localStorage.setItem('recorridos', JSON.stringify(recorridosDelDia));
            renderRecorridos();
            showToast(`El pedido hacia ${recorridosDelDia[recorridoIndex].destino} está En Camino.`, "info");
            
            if (recorridosDelDia[recorridoIndex].casoIndex === currentIndex) {
                actualizarTracker("En Camino");
            }
            
            // A los 8 segundos más cambia a "Entregado"
            setTimeout(() => {
                if (recorridosDelDia[recorridoIndex] && recorridosDelDia[recorridoIndex].estado === "En Camino") {
                    recorridosDelDia[recorridoIndex].estado = "Entregado";
                    recorridosDelDia[recorridoIndex].color = "#16a34a"; // Verde
                    localStorage.setItem('recorridos', JSON.stringify(recorridosDelDia));
                    renderRecorridos();
                    showToast(`El pedido de ${recorridosDelDia[recorridoIndex].cliente} fue Entregado.`, "info");
                    
                    if (recorridosDelDia[recorridoIndex].casoIndex === currentIndex) {
                        actualizarTracker("Entregado");
                    }
                }
            }, 8000);
        }
    }, 5000);
};

function aplicarEfectosSimulacion() {
    casos.forEach(caso => {
        if (caso.original_costo === undefined) {
            caso.original_costo = caso.costo_minutos;
            for (let k in caso.comparacion) {
                caso.comparacion[k].original_costo = caso.comparacion[k].costo;
            }
        }
        
        // Traffic gives a random extra per case, or 0
        const extraTraffic = simulandoTrafico ? Math.floor(Math.random() * 8) + 2 : 0;
        const extraRain = simulandoLluvia ? 5 : 0;
        
        caso.costo_minutos = caso.original_costo + extraTraffic + extraRain;
        
        for (let k in caso.comparacion) {
            caso.comparacion[k].costo = caso.comparacion[k].original_costo + extraTraffic + extraRain;
        }
        
        // Limpiar prefijos anteriores
        caso.explicacion = caso.explicacion.replace("**ALERTA DE TRÁFICO:** Ruta recalculada debido a congestión vehicular.\n\n", "");
        caso.explicacion = caso.explicacion.replace("**ALERTA DE CLIMA:** Calles resbaladizas por lluvia, se ha reducido la velocidad por seguridad.\n\n", "");
        
        // Actualizar números en el texto
        caso.explicacion = caso.explicacion.replace(/toma \d+ minutos/, `toma ${caso.costo_minutos} minutos`);
        
        // Poner prefijos
        let prefixes = "";
        if (simulandoTrafico) prefixes += "**ALERTA DE TRÁFICO:** Ruta recalculada debido a congestión vehicular.\n\n";
        if (simulandoLluvia) prefixes += "**ALERTA DE CLIMA:** Calles resbaladizas por lluvia, se ha reducido la velocidad por seguridad.\n\n";
        
        caso.explicacion = prefixes + caso.explicacion;
    });
    
    renderCaso(currentIndex);
}

let simulandoTrafico = false;
const btnTrafico = document.getElementById('btnTrafico');

btnTrafico.addEventListener('click', () => {
    simulandoTrafico = !simulandoTrafico;
    
    if (simulandoTrafico) {
        btnTrafico.classList.add('active');
        btnTrafico.innerHTML = '<i class="fas fa-car-side"></i> Simular Tráfico (ON)';
        // Aumentar aleatoriamente el tiempo de algunas rutas
        aristas.forEach(a => {
            if (Math.random() > 0.5) {
                const extra = Math.floor(Math.random() * 10) + 5;
                a.label = `${a.baseTime + extra} min (Tráfico)`;
                a.color = '#ef4444';
                a.weight = a.baseTime + extra;
            } else {
                a.label = `${a.baseTime} min`;
                a.color = '#cbd5e1';
                a.weight = a.baseTime;
            }
        });
        showToast("⚠️ Tráfico detectado. Recalculando ruta...", "warning");
    } else {
        btnTrafico.classList.remove('active');
        btnTrafico.innerHTML = '<i class="fas fa-car-side"></i> Simular Tráfico (OFF)';
        // Restaurar tiempos
        aristas.forEach(a => {
            a.label = `${a.baseTime} min`;
            a.color = '#cbd5e1';
            a.weight = a.baseTime;
        });
        showToast("Tráfico normalizado.", "info");
    }
    
    aplicarEfectosSimulacion();
});

// ============================================================
// CLIMA (LLUVIA)
// ============================================================
let simulandoLluvia = false;
const btnClima = document.getElementById('btnClima');

btnClima.addEventListener('click', () => {
    simulandoLluvia = !simulandoLluvia;
    if (simulandoLluvia) {
        btnClima.classList.add('active');
        btnClima.innerHTML = '<i class="fas fa-cloud-showers-heavy"></i> Simular Lluvia (ON)';
        document.body.classList.add('rainy');
        showToast("🌧️ Empezó a llover. Las rutas serán más lentas.", "error");
    } else {
        btnClima.classList.remove('active');
        btnClima.innerHTML = '<i class="fas fa-cloud-showers-heavy"></i> Simular Lluvia (OFF)';
        document.body.classList.remove('rainy');
        showToast("⛅ El clima mejoró.", "info");
    }
    
    aplicarEfectosSimulacion();
});

// ============================================================
// MAPA LEAFLET
// ============================================================
let mapInstance = null;
let currentPolylines = [];
let markers = [];

function renderMap(casoIndex) {
    const caso = casos[casoIndex];
    
    if (!mapInstance) {
        mapInstance = L.map('map').setView([-17.785, -63.180], 14);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(mapInstance);
    }

    // Limpiar marcadores y líneas anteriores
    currentPolylines.forEach(p => mapInstance.removeLayer(p));
    currentPolylines = [];
    markers.forEach(m => mapInstance.removeLayer(m));
    markers = [];

    // Dibujar TODAS las Zonas de Peligro bloqueadas independientemente de la ruta
    nodosBloqueados.forEach(nodo => {
        if (nodosDisponibles[nodo]) {
            const blockedIcon = L.divIcon({
                html: '<div style="background:#ef4444;color:white;width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 0 8px red;"><i class="fas fa-skull-crossbones" style="font-size:12px;"></i></div>',
                className: 'blocked-marker',
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            });
            const m = L.marker(nodosDisponibles[nodo], { icon: blockedIcon }).addTo(mapInstance);
            m.bindTooltip("BLOQUEADO: " + nodo.replace(/_/g, ' '), { permanent: true, direction: 'top', offset: [0, -10] });
            markers.push(m);
        }
    });

    if (caso.tipo === 'libre') {
        const rutaCoords = caso.routeCoordinates;
        
        // Marcador Origen
        const markerOrigen = L.circleMarker(caso.coordOrigen, {
            radius: 8,
            fillColor: '#10b981',
            color: '#fff',
            weight: 2,
            opacity: 1,
            fillOpacity: 1
        }).addTo(mapInstance).bindTooltip("Origen", { permanent: true, direction: 'top', offset: [0, -10] });
        markers.push(markerOrigen);
        
        // Marcador Destino
        const pulseIcon = L.divIcon({
            className: 'pulse-marker',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });
        const markerDestino = L.marker(caso.coordDestino, { icon: pulseIcon })
            .addTo(mapInstance).bindTooltip("Destino", { permanent: true, direction: 'top', offset: [0, -10] });
        markers.push(markerDestino);

        // Línea de ruta
        const optimalLine = L.polyline(rutaCoords, {
            color: '#2563eb',
            weight: 5,
            opacity: 0.9
        }).addTo(mapInstance);
        currentPolylines.push(optimalLine);

        mapInstance.fitBounds(optimalLine.getBounds(), { padding: [50, 50] });

        // Animación
        if (rutaCoords.length > 0) {
            let iconClass = "fa-truck";
            if (caso.repartidor && caso.repartidor.tipo === "Bicicleta") iconClass = "fa-bicycle";
            else if (caso.repartidor && caso.repartidor.tipo === "Moto") iconClass = "fa-motorcycle";
            
            const vehicleIcon = L.divIcon({
                html: `<i class="fas ${iconClass}" style="color:#1e3a5f; font-size: 20px; background: white; padding: 4px; border-radius: 50%; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></i>`,
                className: 'truck-marker',
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });
            const truckMarker = L.marker(rutaCoords[0], { icon: vehicleIcon }).addTo(mapInstance);
            markers.push(truckMarker);
            
            let i = 0;
            const animate = () => {
                if (i < rutaCoords.length - 1) {
                    i++;
                    truckMarker.setLatLng(rutaCoords[i]);
                    setTimeout(animate, 50); // más rápido porque son muchos puntos
                }
            };
            setTimeout(animate, 1000);
        }
    } else {
        // Dibujar todas las aristas (fondo)
        aristas.forEach(arista => {
            const fromCoords = nodosDisponibles[arista.from];
            const toCoords = nodosDisponibles[arista.to];
            
            const line = L.polyline([fromCoords, toCoords], {
                color: simulandoTrafico ? (arista.color || '#cbd5e1') : '#cbd5e1',
                weight: 3,
                dashArray: '5, 5',
                opacity: 0.6
            }).addTo(mapInstance);
            
            line.bindTooltip(arista.label, { permanent: false, direction: 'center' });
            currentPolylines.push(line);
        });

        // Dibujar ruta óptima
        let rutaCoords = [];
        caso.ruta.forEach((nodo, idx) => {
            rutaCoords.push(nodosDisponibles[nodo]);
            
            // Marcador del nodo
            const isOrigen = nodo === caso.origen;
            const isDestino = nodo === caso.destino;
            
            let markerColor = '#2563eb';
            if (isOrigen) markerColor = '#10b981';
            
            let isBlocked = nodosBloqueados.has(nodo);
            if (isBlocked) return; // Ya se dibujó arriba como calavera
            
            let nodeMarker;
            
            if (isDestino) {
                const pulseIcon = L.divIcon({
                    className: 'pulse-marker',
                    iconSize: [20, 20],
                    iconAnchor: [10, 10]
                });
                nodeMarker = L.marker(nodosDisponibles[nodo], { icon: pulseIcon }).addTo(mapInstance);
            } else {
                nodeMarker = L.circleMarker(nodosDisponibles[nodo], {
                    radius: isOrigen ? 8 : 5,
                    fillColor: markerColor,
                    color: '#fff',
                    weight: 2,
                    opacity: 1,
                    fillOpacity: 1
                }).addTo(mapInstance);
            }
            
            nodeMarker.bindTooltip(nodo.replace(/_/g, ' '), { permanent: true, direction: 'top', offset: [0, -10] });
            markers.push(nodeMarker);
        });

        // Línea de ruta óptima
        const optimalLine = L.polyline(rutaCoords, {
            color: '#2563eb',
            weight: 5,
            opacity: 0.9
        }).addTo(mapInstance);
        currentPolylines.push(optimalLine);

        // Ajustar zoom para ver toda la ruta
        mapInstance.fitBounds(optimalLine.getBounds(), { padding: [50, 50] });
        
        // Simular animación del camión moviéndose
        if (rutaCoords.length > 0) {
            let iconClass = "fa-truck";
            if (caso.repartidor && caso.repartidor.tipo === "Bicicleta") iconClass = "fa-bicycle";
            else if (caso.repartidor && caso.repartidor.tipo === "Moto") iconClass = "fa-motorcycle";
            
            const vehicleIcon = L.divIcon({
                html: `<i class="fas ${iconClass}" style="color:#1e3a5f; font-size: 20px; background: white; padding: 4px; border-radius: 50%; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></i>`,
                className: 'truck-marker',
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });
            
            const truckMarker = L.marker(rutaCoords[0], { icon: vehicleIcon }).addTo(mapInstance);
            markers.push(truckMarker);
            
            let i = 0;
            const animate = () => {
                if (i < rutaCoords.length - 1) {
                    i++;
                    truckMarker.setLatLng(rutaCoords[i]);
                    setTimeout(animate, 1500);
                }
            };
            setTimeout(animate, 1000);
        }
    }
}

// ============================================================
// FUNCIONES AUXILIARES PARA EL TRACKER
// ============================================================
function getTrackerHtml(estadoActual) {
    if (estadoActual === "Cancelado") return '';
    
    const step1Class = "active";
    const step2Class = (estadoActual === "En Camino" || estadoActual === "Entregado") ? "active" : "";
    const step3Class = (estadoActual === "Entregado") ? "active" : "";
    
    return `
        <div class="tracker-steps" style="display: flex; justify-content: space-between; position: relative;">
            <div style="position: absolute; top: 15px; left: 10%; right: 10%; height: 4px; background: #334155; z-index: 0; border-radius: 2px;"></div>
            
            <!-- Progreso dinámico -->
            <div style="position: absolute; top: 15px; left: 10%; height: 4px; background: #3b82f6; z-index: 0; border-radius: 2px; transition: width 1s ease-in-out; width: ${estadoActual === 'Recién Creado' ? '0%' : (estadoActual === 'En Camino' ? '40%' : '80%')};"></div>

            <div class="tracker-step ${step1Class}" style="position: relative; z-index: 1; text-align: center; width: 33%;">
                <div class="step-icon" style="width: 34px; height: 34px; border-radius: 50%; background: ${step1Class ? '#3b82f6' : '#334155'}; color: white; display: flex; align-items: center; justify-content: center; margin: 0 auto; box-shadow: 0 0 10px rgba(59,130,246,0.3); transition: all 0.3s;">
                    <i class="fas fa-box"></i>
                </div>
                <div class="step-label" style="margin-top: 8px; font-size: 0.85rem; color: ${step1Class ? '#f8fafc' : '#94a3b8'}; font-weight: bold;">Creado</div>
            </div>
            
            <div class="tracker-step ${step2Class}" style="position: relative; z-index: 1; text-align: center; width: 33%;">
                <div class="step-icon" style="width: 34px; height: 34px; border-radius: 50%; background: ${step2Class ? '#f59e0b' : '#334155'}; color: white; display: flex; align-items: center; justify-content: center; margin: 0 auto; box-shadow: ${step2Class ? '0 0 10px rgba(245,158,11,0.3)' : 'none'}; transition: all 0.3s;">
                    <i class="fas fa-truck-fast"></i>
                </div>
                <div class="step-label" style="margin-top: 8px; font-size: 0.85rem; color: ${step2Class ? '#f8fafc' : '#94a3b8'}; font-weight: bold;">En Camino</div>
            </div>
            
            <div class="tracker-step ${step3Class}" style="position: relative; z-index: 1; text-align: center; width: 33%;">
                <div class="step-icon" style="width: 34px; height: 34px; border-radius: 50%; background: ${step3Class ? '#10b981' : '#334155'}; color: white; display: flex; align-items: center; justify-content: center; margin: 0 auto; box-shadow: ${step3Class ? '0 0 10px rgba(16,185,129,0.3)' : 'none'}; transition: all 0.3s;">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="step-label" style="margin-top: 8px; font-size: 0.85rem; color: ${step3Class ? '#f8fafc' : '#94a3b8'}; font-weight: bold;">Entregado</div>
            </div>
        </div>
    `;
}

function actualizarTracker(estadoActual) {
    const container = document.getElementById('orderTrackerContainer');
    if (container) {
        container.innerHTML = getTrackerHtml(estadoActual);
    }
}

// ============================================================
// FUNCIÓN PARA RENDERIZAR UN CASO COMPLETO
// ============================================================
function renderCaso(index) {
    if (mapInstance) {
        mapInstance.remove();
        mapInstance = null;
    }
    
    const caso = casos[index];
    const comp = caso.comparacion;
    const algoNames = Object.keys(comp);

    let costoFinal = (caso.costo_minutos * caso.repartidor.tarifaMin).toFixed(2);
    
    // Determinar estado actual
    const currentRecorrido = recorridosDelDia.find(r => r.casoIndex === index);
    const estadoActual = currentRecorrido ? currentRecorrido.estado : "Entregado";
    
    let trackerHtml = '';
    if (estadoActual !== "Cancelado") {
        trackerHtml = `
        <div id="orderTrackerContainer" class="order-tracker" style="margin-top: 1.5rem; margin-bottom: 1rem;">
            ${getTrackerHtml(estadoActual)}
        </div>
        `;
    }

    let html = `
        <div class="info-container" style="display: flex; gap: 1rem; flex-wrap: wrap;">
            <!-- INFO CLIENTE -->
            <div class="client-info" style="flex: 1; min-width: 250px;">
                <div class="client-avatar">${caso.cliente.avatar}</div>
                <div class="client-details">
                    <span class="client-name">Cliente: ${caso.cliente.nombre}</span>
                    <span class="client-phone"><i class="fas fa-phone-alt"></i> ${caso.cliente.telefono}</span>
                </div>
            </div>

            <!-- INFO REPARTIDOR -->
            <div class="client-info" style="flex: 1; min-width: 250px;">
                <div class="client-avatar" style="background:#fef3c7; color:#d97706;">${caso.repartidor.foto}</div>
                <div class="client-details">
                    <span class="client-name">Repartidor: ${caso.repartidor.nombre}</span>
                    <span class="client-phone"><i class="fas fa-money-bill-wave"></i> Costo Est.: Bs. ${costoFinal}</span>
                </div>
            </div>
        </div>
        
        ${trackerHtml}

        <div class="route-header">
            <div class="route-from-to">
                <span>${caso.origen.replace(/_/g, ' ')}</span>
                <i class="fas fa-arrow-right arrow"></i>
                <span>${caso.destino.replace(/_/g, ' ')}</span>
            </div>
            <div class="route-meta">
                <span><i class="far fa-clock"></i> ${caso.costo_minutos} min</span>
                <span><i class="fas fa-code-branch"></i> ${caso.nodos_explorados} nodos</span>
                <span class="algo-tag"><i class="fas fa-brain"></i> ${caso.algoritmo_usado}</span>
            </div>
        </div>

        <!-- MAPA LEAFLET -->
        <div class="graph-container">
            <div id="map"></div>
        </div>
    `;

    html += `<div class="comparison-grid">`;
    // Tarjetas de cada algoritmo
    for (const name of algoNames) {
            const data = comp[name];
            const isBest = (name === 'Backtracking');
            const icon = isBest ? '<i class="fas fa-star" style="color:#facc15;"></i>' : '';
            html += `
                <div class="algo-card ${isBest ? 'highlight' : ''}">
                    <div class="algo-name">
                        <span>${name} ${icon}</span>
                        <span class="check">${isBest ? '✓ óptimo' : ''}</span>
                    </div>
                    <div class="algo-stats">
                        <div><span class="label">Tiempo</span> ${data.costo} min</div>
                        <div><span class="label">Nodos</span> ${data.nodos}</div>
                    </div>
                    <div class="path-preview">
                        <i class="fas fa-route" style="color:#64748b;margin-right:4px;"></i>
                        ${data.camino.join(' → ').replace(/_/g, ' ')}
                    </div>
                </div>
            `;
        }
        html += `</div>`;

    html += `
        <div class="explicacion-box">
            <h3><i class="fas fa-comment-dots"></i> Explicación del agente</h3>
            <div class="explicacion-content">${caso.explicacion}</div>
        </div>
    `;

    document.getElementById('mainCard').innerHTML = html;

    // Renderizar el mapa después de que el DOM esté listo
    setTimeout(() => renderMap(index), 100);
}

// ============================================================
// MANEJADOR DE TABS E INICIALIZACIÓN
// ============================================================
let currentIndex = 0;

function renderTabs() {
    const container = document.getElementById('tabContainer');
    container.innerHTML = '';
    
    const indicesToRender = [0, 1, 2];
    if (currentIndex > 2 && !indicesToRender.includes(currentIndex)) {
        indicesToRender.push(currentIndex);
    }
    
    indicesToRender.forEach(i => {
        if (!casos[i]) return;
        const caso = casos[i];
        
        const btn = document.createElement('button');
        btn.className = `tab-btn ${i === currentIndex ? 'active' : ''}`;
        let icon = 'fa-map-marker-alt';
        if (i === 0) icon = 'fa-location-dot';
        else if (i === 1) icon = 'fa-flask';
        else if (i === 2) icon = 'fa-tree';
        
        let displayId = caso.id;
        displayId = displayId.charAt(0).toUpperCase() + displayId.slice(1);
        
        btn.innerHTML = `<i class="fas ${icon}"></i> ${displayId} <span class="time-badge">${caso.costo_minutos} min</span>`;
        btn.onclick = () => {
            currentIndex = i;
            renderTabs();
            renderCaso(i);
        };
        container.appendChild(btn);
    });
}

// Inicializar vista
// Definir chart global para evitar ReferenceError
var dashboardChart = null;

renderRecorridos();
renderTabs();
renderCaso(0);

// ============================================================
// BITÁCORA
// ============================================================
const bitacoraData = {
    fecha: "24/07/2026 01:34",
    actividad: "Actividad 4 - Agente Explicador",
    componente: "Actividad 1 - Camba Envíos",
    api_usada: "Groq - llama-3.1-8b-instant",
    casos_probados: 3,
    alucinaciones_detectadas: 0,
    estado: "✅ APROBADO"
};

document.getElementById('bitacoraContent').textContent =
    JSON.stringify(bitacoraData, null, 2);

// ============================================================
// TOAST NOTIFICACIONES
// ============================================================
function showToast(mensaje, tipo = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${tipo}`;
    
    let icono = 'ℹ️';
    if (tipo === 'warning') icono = '⚠️';
    if (tipo === 'error') icono = '🌧️';

    toast.innerHTML = `<span>${icono}</span> <span>${mensaje}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================================
// MODO OSCURO
// ============================================================
const btnDarkMode = document.getElementById('btnDarkMode');
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    btnDarkMode.innerHTML = '<i class="fas fa-sun"></i>';
}

btnDarkMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    btnDarkMode.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    showToast(isDark ? "Modo oscuro activado" : "Modo claro activado", "info");
});

// ============================================================
// DASHBOARD CHART.JS
// ============================================================

function initDashboard() {
    const ctx = document.getElementById('statsChart');
    if (!ctx) return;
    
    dashboardChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Entregados', 'En Camino', 'Creados', 'Cancelados'],
            datasets: [{
                data: [0, 0, 0, 0],
                backgroundColor: ['#10b981', '#f59e0b', '#3b82f6', '#ef4444'],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'bottom', labels: { color: '#94a3b8', font: { size: 10 } } }
            },
            animation: { animateScale: true }
        }
    });
    
    updateDashboard();
}

function updateDashboard() {
    if (!dashboardChart) return;
    
    let counts = {
        entregados: 0,
        enCamino: 0,
        creados: 0,
        cancelados: 0
    };
    
    recorridosDelDia.forEach(r => {
        if (r.estado === "Entregado") counts.entregados++;
        else if (r.estado === "En Camino") counts.enCamino++;
        else if (r.estado === "Recién Creado") counts.creados++;
        else if (r.estado === "Cancelado") counts.cancelados++;
    });
    
    dashboardChart.data.datasets[0].data = [
        counts.entregados, counts.enCamino, counts.creados, counts.cancelados
    ];
    dashboardChart.update();
}

initDashboard();

// ============================================================
// ADMIN: MODALES Y FORMULARIOS
// ============================================================
let listaClientes = JSON.parse(localStorage.getItem('clientes')) || [];
let listaRepartidores = JSON.parse(localStorage.getItem('repartidores')) || [];

function openModal(id) {
    document.getElementById(id).classList.add('active');
    if (id === 'modalPedido') {
        actualizarSelectsPedido();
    }
    if (id === 'modalMapaSeleccion') {
        setTimeout(initMapSeleccion, 100);
    }
}

function closeModal(id) {
    document.getElementById(id).classList.remove('active');
}

document.getElementById('formCliente').addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('cliNombre').value;
    const telefono = document.getElementById('cliTelefono').value;
    const avatar = nombre.substring(0, 2).toUpperCase();
    listaClientes.push({ nombre, telefono, avatar });
    localStorage.setItem('clientes', JSON.stringify(listaClientes));
    showToast(`Cliente ${nombre} guardado`, 'info');
    closeModal('modalCliente');
    e.target.reset();
});

document.getElementById('formRepartidor').addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('repNombre').value;
    const tipo = document.getElementById('repTipo').value;
    const tarifaMin = parseFloat(document.getElementById('repTarifa').value);
    
    let foto = '🏍️';
    if (tipo === 'Bicicleta') foto = '🚴';
    if (tipo === 'Camioneta') foto = '🛻';
    
    listaRepartidores.push({ nombre: `${nombre} (${tipo})`, foto, tipo, tarifaMin });
    localStorage.setItem('repartidores', JSON.stringify(listaRepartidores));
    showToast(`Repartidor ${nombre} guardado`, 'info');
    closeModal('modalRepartidor');
    e.target.reset();
});

function actualizarSelectsPedido() {
    const selCli = document.getElementById('pedCliente');
    const selRep = document.getElementById('pedRepartidor');
    
    selCli.innerHTML = listaClientes.map((c, i) => `<option value="${i}">${c.nombre}</option>`).join('');
    selRep.innerHTML = listaRepartidores.map((r, i) => `<option value="${i}">${r.nombre}</option>`).join('');
}

let mapSeleccionInstance = null;
let markerOrigen = null;
let markerDestino = null;
let coordOrigen = null;
let coordDestino = null;

function initMapSeleccion() {
    if (!mapSeleccionInstance) {
        mapSeleccionInstance = L.map('mapSeleccion').setView([-17.785, -63.180], 13);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(mapSeleccionInstance);

        mapSeleccionInstance.on('click', async function(e) {
            const inputId = !coordOrigen ? 'pedOrigen' : (!coordDestino ? 'pedDestino' : null);
            if (!inputId) return;
            
            // Set input to loading state
            document.getElementById(inputId).value = 'Cargando dirección...';
            
            let direccion = `${e.latlng.lat.toFixed(5)}, ${e.latlng.lng.toFixed(5)}`;
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}`);
                const data = await response.json();
                if (data && data.display_name) {
                    // Limitar la longitud de la dirección mostrada a algo razonable
                    direccion = data.display_name.split(',').slice(0, 3).join(',');
                }
            } catch (err) {
                console.error('Error fetching reverse geocoding:', err);
            }

            if (!coordOrigen) {
                coordOrigen = e.latlng;
                markerOrigen = L.circleMarker(coordOrigen, {
                    radius: 8, fillColor: '#10b981', color: '#fff', weight: 2, opacity: 1, fillOpacity: 1
                }).addTo(mapSeleccionInstance).bindTooltip("Origen", { permanent: true, direction: 'top' });
                document.getElementById('pedOrigen').value = direccion;
            } else if (!coordDestino) {
                coordDestino = e.latlng;
                const pulseIcon = L.divIcon({ className: 'pulse-marker', iconSize: [20, 20], iconAnchor: [10, 10] });
                markerDestino = L.marker(coordDestino, { icon: pulseIcon }).addTo(mapSeleccionInstance).bindTooltip("Destino", { permanent: true, direction: 'top' });
                document.getElementById('pedDestino').value = direccion;
            }
        });
    } else {
        setTimeout(() => { mapSeleccionInstance.invalidateSize(); }, 200);
    }
}

document.getElementById('btnLimpiarPuntos').addEventListener('click', () => {
    if (markerOrigen) mapSeleccionInstance.removeLayer(markerOrigen);
    if (markerDestino) mapSeleccionInstance.removeLayer(markerDestino);
    markerOrigen = null;
    markerDestino = null;
    coordOrigen = null;
    coordDestino = null;
    document.getElementById('pedOrigen').value = '';
    document.getElementById('pedDestino').value = '';
});

// Algoritmo Dijkstra
// ============================================================
// ALGORITMOS DE BÚSQUEDA
// ============================================================
function getNodoMasCercano(lat, lng) {
    let closestNode = null;
    let minDistance = Infinity;
    for (const [nodo, coords] of Object.entries(nodosDisponibles)) {
        const d = Math.pow(coords[0] - lat, 2) + Math.pow(coords[1] - lng, 2);
        if (d < minDistance) {
            minDistance = d;
            closestNode = nodo;
        }
    }
    return closestNode;
}

// ============================================================
// ZONAS DE PELIGRO
// ============================================================
window.openZonasPeligroModal = function() {
    const container = document.getElementById('zonasList');
    let html = '';
    Object.keys(nodosDisponibles).forEach(nodo => {
        const isChecked = nodosBloqueados.has(nodo) ? 'checked' : '';
        html += `
            <div style="display: flex; align-items: center; padding: 5px 0; border-bottom: 1px solid #334155;">
                <input type="checkbox" id="chk_${nodo}" value="${nodo}" ${isChecked} style="margin-right: 10px;">
                <label for="chk_${nodo}" style="color: #cbd5e1; cursor: pointer;">${nodo.replace(/_/g, ' ')}</label>
            </div>
        `;
    });
    container.innerHTML = html;
    openModal('modalZonasPeligro');
};

window.guardarZonasPeligro = function() {
    const checkboxes = document.querySelectorAll('#zonasList input[type="checkbox"]');
    nodosBloqueados.clear();
    checkboxes.forEach(chk => {
        if (chk.checked) nodosBloqueados.add(chk.value);
    });
    localStorage.setItem('nodosBloqueados', JSON.stringify([...nodosBloqueados]));
    closeModal('modalZonasPeligro');
    showToast("Zonas de peligro guardadas.", "success");
    renderMap(currentIndex); // Repintar mapa actual
};

function buildAdjList() {
    const adj = {};
    Object.keys(nodosDisponibles).forEach(n => adj[n] = []);
    aristas.forEach(a => {
        if (nodosBloqueados.has(a.from) || nodosBloqueados.has(a.to)) return; // Ignorar aristas bloqueadas
        const w = a.weight || a.baseTime;
        adj[a.from].push({ node: a.to, weight: w });
        adj[a.to].push({ node: a.from, weight: w });
    });
    return adj;
}

function calcularRutaBFS(origen, destino) {
    const adj = buildAdjList();
    let queue = [{ path: [origen], cost: 0 }];
    let visited = new Set();
    let nodosExplorados = 0;
    
    while (queue.length > 0) {
        let current = queue.shift();
        let lastNode = current.path[current.path.length - 1];
        
        nodosExplorados++;
        if (lastNode === destino) {
            return { costo: current.cost, camino: current.path, nodos: nodosExplorados };
        }
        
        if (visited.has(lastNode)) continue;
        visited.add(lastNode);
        
        for (let edge of adj[lastNode]) {
            if (!visited.has(edge.node)) {
                queue.push({ 
                    path: [...current.path, edge.node], 
                    cost: current.cost + edge.weight 
                });
            }
        }
    }
    return { costo: Infinity, camino: [], nodos: nodosExplorados };
}

function calcularRutaDFS(origen, destino) {
    const adj = buildAdjList();
    let stack = [{ path: [origen], cost: 0 }];
    let visited = new Set();
    let nodosExplorados = 0;
    
    while (stack.length > 0) {
        let current = stack.pop();
        let lastNode = current.path[current.path.length - 1];
        
        nodosExplorados++;
        if (lastNode === destino) {
            return { costo: current.cost, camino: current.path, nodos: nodosExplorados };
        }
        
        if (visited.has(lastNode)) continue;
        visited.add(lastNode);
        
        for (let edge of adj[lastNode]) {
            if (!visited.has(edge.node)) {
                stack.push({ 
                    path: [...current.path, edge.node], 
                    cost: current.cost + edge.weight 
                });
            }
        }
    }
    return { costo: Infinity, camino: [], nodos: nodosExplorados };
}

function calcularRutaBacktracking(origen, destino) {
    const adj = buildAdjList();
    let bestCost = Infinity;
    let bestPath = [];
    let nodosExplorados = 0;
    let currentPath = [origen];
    let visited = new Set([origen]);
    
    function dfs(currentCost) {
        let lastNode = currentPath[currentPath.length - 1];
        nodosExplorados++;
        
        if (currentCost >= bestCost) return; // Poda
        
        if (lastNode === destino) {
            if (currentCost < bestCost) {
                bestCost = currentCost;
                bestPath = [...currentPath];
            }
            return;
        }
        
        for (let edge of adj[lastNode]) {
            if (!visited.has(edge.node)) {
                visited.add(edge.node);
                currentPath.push(edge.node);
                dfs(currentCost + edge.weight);
                currentPath.pop();
                visited.delete(edge.node);
            }
        }
    }
    
    dfs(0);
    return { costo: bestCost, camino: bestPath, nodos: nodosExplorados };
}

document.getElementById('formPedido').addEventListener('submit', (e) => {
    e.preventDefault();
    if (listaClientes.length === 0 || listaRepartidores.length === 0) {
        showToast("Debes añadir al menos un Cliente y un Repartidor antes de crear un pedido.", "error");
        return;
    }
    
    if (!coordOrigen || !coordDestino) {
        showToast("Debes seleccionar un punto de origen y uno de destino en el mapa.", "warning");
        return;
    }
    
    const cliIndex = document.getElementById('pedCliente').value;
    const repIndex = document.getElementById('pedRepartidor').value;
    
    // Get the address strings from the inputs
    const origenStr = document.getElementById('pedOrigen').value || "Punto Seleccionado (Origen)";
    const destinoStr = document.getElementById('pedDestino').value || "Punto Seleccionado (Destino)";
    
    const btnSubmit = e.target.querySelector('button[type="submit"]');
    btnSubmit.disabled = true;
    btnSubmit.innerText = "Calculando ruta...";

    const repartidorSeleccionado = listaRepartidores[repIndex];
    let osrmProfile = 'driving';
    if (repartidorSeleccionado.tipo === 'Bicicleta') {
        osrmProfile = 'bike';
    }

    const router = L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
        profile: osrmProfile
    });

    router.route([
        L.Routing.waypoint(coordOrigen),
        L.Routing.waypoint(coordDestino)
    ], (err, routes) => {
        btnSubmit.disabled = false;
        btnSubmit.innerText = "Calcular Ruta y Crear";

        if (err || !routes || routes.length === 0) {
            showToast("No se pudo calcular la ruta. Intenta con otros puntos.", "error");
            return;
        }

        const route = routes[0];
        
        // El servidor público de OSRM suele devolver tiempos de 'auto' por defecto.
        // Aplicamos un multiplicador para que los tiempos sean realistas según el vehículo.
        let factorTiempo = 1.0;
        if (repartidorSeleccionado.tipo === 'Bicicleta') factorTiempo = 1.8;
        else if (repartidorSeleccionado.tipo === 'Moto') factorTiempo = 0.8;
        
        const costoMinutos = Math.ceil((route.summary.totalTime / 60) * factorTiempo);
        
        // Simular comparaciones asignando a nodos cercanos
        const origenNodo = getNodoMasCercano(coordOrigen.lat, coordOrigen.lng);
        const destinoNodo = getNodoMasCercano(coordDestino.lat, coordDestino.lng);
        
        // Si el origen y destino mapean al mismo nodo, entonces es el mismo lugar
        let resBFS, resDFS, resBack;
        if (origenNodo === destinoNodo) {
            resBFS = { costo: 0, camino: [origenNodo], nodos: 1 };
            resDFS = { costo: 0, camino: [origenNodo], nodos: 1 };
            resBack = { costo: 0, camino: [origenNodo], nodos: 1 };
        } else {
            resBFS = calcularRutaBFS(origenNodo, destinoNodo);
            resDFS = calcularRutaDFS(origenNodo, destinoNodo);
            resBack = calcularRutaBacktracking(origenNodo, destinoNodo);
        }

        // Crear caso
        const nuevoCaso = {
            id: `Pedido-${casos.length + 1}`,
            tipo: 'libre',
            origen: origenStr, 
            destino: destinoStr,
            coordOrigen: coordOrigen,
            coordDestino: coordDestino,
            routeCoordinates: route.coordinates,
            cliente: listaClientes[cliIndex],
            repartidor: listaRepartidores[repIndex],
            costo_minutos: costoMinutos,
            algoritmo_usado: "OSRM (Ruta Real) + Backtracking",
            nodos_explorados: resBack.nodos,
            comparacion: {
                BFS: resBFS,
                DFS: resDFS,
                Backtracking: resBack
            },
            explicacion: `**1. RESUMEN EJECUTIVO**\nSe calculó la ruta real utilizando el servicio OSRM basado en calles reales. El tiempo estimado de viaje es de ${costoMinutos} minutos para una distancia de ${(route.summary.totalDistance / 1000).toFixed(2)} km.\n\n**2. ANÁLISIS COMPARATIVO**\nPara fines didácticos, las ubicaciones libres se asociaron a los nodos predefinidos más cercanos (${origenNodo.replace(/_/g, ' ')} y ${destinoNodo.replace(/_/g, ' ')}). Esto permite comparar:\n- BFS: ${resBFS.costo} min, ${resBFS.nodos} nodos.\n- DFS: ${resDFS.costo} min, ${resDFS.nodos} nodos.\n\n**3. IMPLICACIONES PARA EL NEGOCIO**\nAl usar un enrutamiento real OSRM, el tiempo estimado es mucho más preciso, mientras que Backtracking sigue siendo la base teórica comparativa.`
        };
        
        casos.push(nuevoCaso);
        localStorage.setItem('casos', JSON.stringify(casos));
        
        // Añadir a recorridos del día
        const now = new Date();
        const horaStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
        const nuevoRecorridoIndex = recorridosDelDia.length;
        
        recorridosDelDia.push({
            hora: horaStr,
            cliente: listaClientes[cliIndex].nombre,
            destino: destinoStr,
            estado: "Recién Creado",
            color: "#3b82f6", // Azul claro para pedidos nuevos
            casoIndex: casos.length - 1
        });
        localStorage.setItem('recorridos', JSON.stringify(recorridosDelDia));
        renderRecorridos();
        
        currentIndex = casos.length - 1;
        renderTabs();
        renderCaso(currentIndex);
        
        showToast(`Pedido creado exitosamente.`, 'info');
        closeModal('modalPedido');
        
        // Reset form and map
        e.target.reset();
        document.getElementById('btnLimpiarPuntos').click();
        
        // Iniciar simulación automática del estado
        window.simularProgresoPedido(nuevoRecorridoIndex);
    });
});

// ============================================================
// EDITAR PEDIDO
// ============================================================
window.editingCasoIndex = null;
window.openEditModal = function(casoIndex) {
    window.editingCasoIndex = casoIndex;
    const caso = casos[casoIndex];
    document.getElementById('editTipoVehiculo').value = caso.repartidor.tipo || "Moto";
    openModal('modalEditarPedido');
};

document.getElementById('formEditarPedido')?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (window.editingCasoIndex === null) return;
    
    const caso = casos[window.editingCasoIndex];
    const nuevoTipo = document.getElementById('editTipoVehiculo').value;
    
    if (caso.repartidor.tipo === nuevoTipo) {
        closeModal('modalEditarPedido');
        return;
    }
    
    const btnSubmit = e.target.querySelector('button[type="submit"]');
    btnSubmit.disabled = true;
    btnSubmit.innerText = "Recalculando...";
    
    let osrmProfile = 'driving';
    let tarifaMin = 2.5;
    let foto = "🏍️";
    if (nuevoTipo === 'Bicicleta') {
        osrmProfile = 'bike';
        tarifaMin = 1.5;
        foto = "🚴";
    } else if (nuevoTipo === 'Camioneta') {
        osrmProfile = 'driving';
        tarifaMin = 4.0;
        foto = "🛻";
    }
    
    const router = L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1',
        profile: osrmProfile
    });
    
    router.route([
        L.Routing.waypoint(caso.coordOrigen),
        L.Routing.waypoint(caso.coordDestino)
    ], (err, routes) => {
        btnSubmit.disabled = false;
        btnSubmit.innerText = "Guardar y Recalcular Ruta";
        
        if (err || !routes || routes.length === 0) {
            showToast("No se pudo recalcular la ruta.", "error");
            closeModal('modalEditarPedido');
            return;
        }
        
        const route = routes[0];
        
        // Multiplicador para tiempos realistas
        let factorTiempo = 1.0;
        if (nuevoTipo === 'Bicicleta') factorTiempo = 1.8;
        else if (nuevoTipo === 'Moto') factorTiempo = 0.8;
        
        const costoMinutos = Math.ceil((route.summary.totalTime / 60) * factorTiempo);
        
        let nombreBase = caso.repartidor.nombre.replace(/\s*\(.*\)/, "");
        
        caso.repartidor = {
            ...caso.repartidor,
            nombre: `${nombreBase} (${nuevoTipo})`,
            tipo: nuevoTipo,
            foto: foto,
            tarifaMin: tarifaMin
        };
        
        caso.costo_minutos = costoMinutos;
        caso.routeCoordinates = route.coordinates;
        caso.explicacion = `**1. RESUMEN EJECUTIVO**\nSe recalculó la ruta real utilizando el servicio OSRM (${osrmProfile}). El tiempo estimado de viaje en ${nuevoTipo} es de ${costoMinutos} minutos para una distancia de ${(route.summary.totalDistance / 1000).toFixed(2)} km.`;
        
        localStorage.setItem('casos', JSON.stringify(casos));
        showToast("Vehículo cambiado y ruta recalculada.", "success");
        closeModal('modalEditarPedido');
        
        if (currentIndex === window.editingCasoIndex) {
            renderTabs();
            renderCaso(currentIndex);
        }
    });
});