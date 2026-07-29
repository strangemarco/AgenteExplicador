import csv
import random

vehiculos = ["Moto", "Bicicleta", "Camioneta"]

with open("entregas_camba.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["distancia_km", "tiempo_osrm_min", "vehiculo", "hora", "dia_semana", "lluvia", "trafico", "zonas_bloqueadas", "tiempo_real_min"])
    
    for _ in range(500):
        vehiculo = random.choice(vehiculos)
        distancia = round(random.uniform(1.0, 15.0), 1)
        
        # Base OSRM time
        if vehiculo == "Bicicleta":
            tiempo_osrm = int(distancia * 4) 
        elif vehiculo == "Moto":
            tiempo_osrm = int(distancia * 2.5)
        else:
            tiempo_osrm = int(distancia * 3)
            
        hora = random.randint(8, 22)
        dia = random.randint(0, 6)
        lluvia = 1 if random.random() < 0.2 else 0
        trafico = 1 if (17 <= hora <= 19 or 7 <= hora <= 9) or random.random() < 0.3 else 0
        zonas = random.randint(0, 3) if random.random() < 0.4 else 0
        
        tiempo_real = tiempo_osrm
        
        if trafico:
            tiempo_real += random.randint(5, 15)
        if lluvia:
            tiempo_real += random.randint(4, 12)
        if zonas > 0:
            tiempo_real += zonas * random.randint(2, 5)
            
        # Add some random noise
        tiempo_real += random.randint(-2, 3)
        if tiempo_real < tiempo_osrm:
            tiempo_real = tiempo_osrm + random.randint(0, 2)
            
        writer.writerow([distancia, tiempo_osrm, vehiculo, hora, dia, lluvia, trafico, zonas, tiempo_real])
