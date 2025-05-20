const serviciosMeteorologicos = [
  {
    proveedor: "OpenMeteo",
    endpoint: "https://api.open-meteo.com/v1/forecast?latitude=6.25184&longitude=-75.56359&current_weather=true",
    extraerDatos: (respuesta) => {
      const clima = respuesta.current_weather;
      return `Información de OpenMeteo: Temperatura ${clima.temperature}°C con vientos de ${clima.windspeed} km/h`;
    }
  },
  {
    proveedor: "Met.no",
    endpoint: "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=6.25184&lon=-75.56359",
    extraerDatos: (respuesta) => {
      const detalles = respuesta.properties.timeseries[0].data.instant.details;
      return `Información de Met.no: Temperatura ${detalles.air_temperature}°C con humedad del ${detalles.relative_humidity}%`;
    }
  }
];

function consultarPronosticoDelTiempo() {
  console.log("⏳ Consultando servicios meteorológicos...");

  const solicitudes = serviciosMeteorologicos.map(servicio => {
    return fetch(servicio.endpoint, {
      headers: { 
        'User-Agent': 'PronosticoApp/2.0'
      }
    })
    .then(respuesta => respuesta.json())
    .then(datos => servicio.extraerDatos(datos))
    .catch(error => `Error con ${servicio.proveedor}: ${error.message}`);
  });

  Promise.race(solicitudes)
    .then(informacionClima => {
      console.log("🌤️ PRONÓSTICO RECIBIDO:");
      console.log("------------------------");
      console.log(informacionClima);
      console.log("------------------------");
    })
    .catch(error => {
      console.error("❌ No fue posible obtener el pronóstico:");
      console.error(error);
    });
}

consultarPronosticoDelTiempo();