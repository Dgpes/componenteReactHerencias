"use client";

import { useState } from "react";
import { Typography, Card, CardHeader, CardBody } from "@/components/ui";
import { Button } from "@material-tailwind/react";

export default function FileUploader() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setTimeout(() => {
                setUploadSuccess(true);
            }, 500);
        }
    };

    const resetUpload = () => {
        setSelectedFile(null);
        setUploadSuccess(false);
    };

    return (
        <div className="p-4 flex justify-center">
            <Card className="w-full max-w-xl">
                <CardHeader variant="gradient" color="blue" className="mb-4 p-4">
                    <Typography variant="h2">
                        Subida de documentos legales
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Typography variant="h5">
                        Sube el documento para revisión legal:
                    </Typography>

                    <label className="flex flex-col items-center justify-center w-full p-6 border-2 border-dashed border-blue-300 rounded-xl cursor-pointer hover:border-blue-500 transition duration-300 bg-blue-50">
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            disabled={uploadSuccess}
                        />
                        {uploadSuccess ? (
                            <div className="flex flex-col items-center text-green-600">
                                <span className="text-4xl">✅</span>
                                <Typography variant="h6" className="mt-2">
                                    {selectedFile.name}
                                </Typography>
                                <Typography variant="small">
                                    Archivo subido exitosamente
                                </Typography>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-blue-500">
                                <span className="text-4xl">💾</span>
                                <Typography variant="h6" className="mt-2">
                                    Click para seleccionar un archivo
                                </Typography>
                                <Typography variant="small" className="text-gray-600">
                                    Tipo de archivo aceptado: PDF, DOCX
                                </Typography>
                            </div>
                        )}
                    </label>

                    {uploadSuccess && (
                        <div className="flex justify-end gap-2">
                            <Button color="red" onClick={resetUpload}>
                                Remover archivo
                            </Button>
                            <Button color="green">
                                Firmar documento
                            </Button>
                        </div>
                    )}
                </CardBody>
            </Card>
        </div>
    );
}
