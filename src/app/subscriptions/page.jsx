"use client";

import { useState, useEffect } from "react";
import { Typography, Card, CardHeader, CardBody } from "@/components/ui";
import TableHeadCell from "@/components/Table/TableHeadCell";
import TableCell from "@/components/Table/TableCell";
import { Button } from "@material-tailwind/react";
import { useRouter } from 'next/navigation';

export default function SubsPage() {
    const [subs, setSubs] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchSubsData = async () => {
            try {
                const response = await fetch("/api/sensors");
                const data = await response.json();
                setSubs(data.subsData);
            } catch (error) {
                console.error("Error al obtener los datos de sensores:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSubsData();

    }, []);

    return (
        <div className="p-4 flex justify-center">
            <Card className="w-full max-w-2xl">
                <CardHeader variant="gradient" color="blue" className="mb-4 p-4">
                    <Typography variant="h2">
                        Datos de Suscripciones
                    </Typography>
                </CardHeader>
                <CardBody>
                    {loading && <Typography>Cargando datos de suscriptores...</Typography>}
                    {!loading && subs.length === 0 && (
                        <Typography>No hay datos de sensores disponibles.</Typography>
                        
                    )}
                    {!loading && subs.length > 0 && (
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    <TableHeadCell>ID</TableHeadCell>
                                    <TableHeadCell>Nombre</TableHeadCell>
                                    <TableHeadCell>Suscrito</TableHeadCell>
                                </tr>
                            </thead>
                            <tbody>
                                {subs.map((sub) => (
                                    <tr key={sub.id} className="even:bg-blue-gray-50/50">
                                        <TableCell>{sub.id}</TableCell>
                                        <TableCell>{sub.nombre}</TableCell>
                                        <TableCell>{sub.subscribed}</TableCell>
                                        
                                    </tr>
                                ))}
                            </tbody>
                            <Button onClick={() => router.push('../video')}>Sub/Unsub</Button>
                        </table>
                    )}
                </CardBody>
            </Card>
        </div>
    );
}
