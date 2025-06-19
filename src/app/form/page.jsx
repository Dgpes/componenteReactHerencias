"use client";

import { useState } from "react";
import { Typography, Card, CardHeader, CardBody, Input } from "@/components/ui";
import { Button } from "@material-tailwind/react";

export default function Form() {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        id: "",
        phone: "",
        email: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);

        if (!emailValid) {
            alert("Please enter a valid email address.");
            return;
        }

        setSubmitted(true);

        console.log("Form submitted:", formData);
    };

    return (
        <div className="p-4 flex justify-center">
            <Card className="w-full max-w-2xl">
                <CardHeader variant="gradient" color="blue" className="mb-4 p-4">
                    <Typography variant="h2">Información personal</Typography>
                </CardHeader>
                <CardBody>
                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <Input
                                label="Nombre"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                label="Apellidos"
                                name="surname"
                                value={formData.surname}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                label="DNI"
                                name="id"
                                value={formData.id}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                label="Número de teléfono"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <Button type="submit" color="blue">
                                Enviar
                            </Button>
                        </form>
                    ) : (
                        <div className="text-center text-green-600">
                            <Typography variant="h4" className="mb-2">✅ Información enviada correctamente</Typography>
                            <Typography variant="paragraph">
                                Gracias, {formData.name}! Hemos recibido tu información.
                            </Typography>
                        </div>
                    )}
                </CardBody>
            </Card>
        </div>
    );
}
