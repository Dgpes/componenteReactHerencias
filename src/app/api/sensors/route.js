// GET /api/sensors

import { NextResponse } from "next/server";

export async function GET() {
  // Datos de sensores simulados
  const sensorData = [
    { id: 1, nombre: "Sensor de Temperatura", valor: 25.3 },
    { id: 2, nombre: "Sensor de Humedad", valor: 60.2 },
    { id: 3, nombre: "Sensor de Luz", valor: 300 },
  ];

  const subsData = [
    { id: 1, nombre: "Ainoa", subscribed: "No" },
    { id: 2, nombre: "Bianca", subscribed: "Yes" },
    { id: 3, nombre: "Clara", subscribed: "No" },
  ]

  return NextResponse.json({ sensorData, subsData });
}
