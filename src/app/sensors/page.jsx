"use client";

import { useState, useEffect } from "react";
import { Typography, Card, CardHeader, CardBody } from "@/components/ui";
import TableHeadCell from "@/components/Table/TableHeadCell";
import TableCell from "@/components/Table/TableCell";

export default function SensorsPage() {
  const [sensors, setSensors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSensorData = async () => {
      try {
        const response = await fetch("/api/sensors");
        const data = await response.json();
        setSensors(data.sensorData);
      } catch (error) {
        console.error("Error al obtener los datos de sensores:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSensorData();

    const intervalId = setInterval(() => {
      fetchSensorData();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);
  
  return (
    <div className="p-4 flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader variant="gradient" color="blue" className="mb-4 p-4">
          <Typography variant="h2" color="white">
            Datos de Sensores
          </Typography>
        </CardHeader>
        <CardBody>
          {loading && <Typography>Cargando datos de sensores...</Typography>}
          {!loading && sensors.length === 0 && (
            <Typography>No hay datos de sensores disponibles.</Typography>
          )}
          {!loading && sensors.length > 0 && (
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {/* <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      ID
                    </Typography>
                  </th> */}
                  <TableHeadCell>ID</TableHeadCell>
                  <TableHeadCell>Nombre</TableHeadCell>
                  <TableHeadCell>Valor</TableHeadCell>
                </tr>
              </thead>
              <tbody>
                {sensors.map((sensor) => (
                  <tr key={sensor.id} className="even:bg-blue-gray-50/50">
                    {/* <td className="p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {sensor.id}
                      </Typography>
                    </td> */}
                    <TableCell>{sensor.id}</TableCell>
                    <TableCell>{sensor.nombre}</TableCell>
                    <TableCell>{sensor.valor}</TableCell>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
