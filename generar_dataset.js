const fs = require('fs');

const vehiculos = ["Moto", "Bicicleta", "Camioneta"];
let csvContent = "distancia_km,tiempo_osrm_min,vehiculo,hora,dia_semana,lluvia,trafico,zonas_bloqueadas,tiempo_real_min\n";

for (let i = 0; i < 500; i++) {
    const vehiculo = vehiculos[Math.floor(Math.random() * vehiculos.length)];
    const distancia = parseFloat((Math.random() * 14 + 1).toFixed(1));
    
    let tiempo_osrm = 0;
    if (vehiculo === "Bicicleta") tiempo_osrm = Math.floor(distancia * 4);
    else if (vehiculo === "Moto") tiempo_osrm = Math.floor(distancia * 2.5);
    else tiempo_osrm = Math.floor(distancia * 3);
    
    const hora = Math.floor(Math.random() * 15) + 8; // 8 to 22
    const dia = Math.floor(Math.random() * 7); // 0 to 6
    const lluvia = Math.random() < 0.2 ? 1 : 0;
    const trafico = ((hora >= 17 && hora <= 19) || (hora >= 7 && hora <= 9) || Math.random() < 0.3) ? 1 : 0;
    const zonas = Math.random() < 0.4 ? Math.floor(Math.random() * 4) : 0;
    
    let tiempo_real = tiempo_osrm;
    if (trafico) tiempo_real += Math.floor(Math.random() * 11) + 5;
    if (lluvia) tiempo_real += Math.floor(Math.random() * 9) + 4;
    if (zonas > 0) tiempo_real += zonas * (Math.floor(Math.random() * 4) + 2);
    
    tiempo_real += Math.floor(Math.random() * 6) - 2;
    if (tiempo_real < tiempo_osrm) tiempo_real = tiempo_osrm + Math.floor(Math.random() * 3);
    
    csvContent += `${distancia},${tiempo_osrm},${vehiculo},${hora},${dia},${lluvia},${trafico},${zonas},${tiempo_real}\n`;
}

fs.writeFileSync('entregas_camba.csv', csvContent, 'utf-8');
console.log("entregas_camba.csv generado con éxito.");
