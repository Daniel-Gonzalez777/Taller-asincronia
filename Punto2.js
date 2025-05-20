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