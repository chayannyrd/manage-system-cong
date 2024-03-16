"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AddArranjo } from "@/components";

interface Arranjo {
    id: string;
    data: string;
    tema: string;
    orador: string;
    presencial: boolean;
    transmissao: boolean;
    arranjoConfirmado: string;
}

interface PopupArranjoProps {
    onClose: () => void;
}

export const PopupArranjo: React.FC<PopupArranjoProps> = ({ onClose }) => {
    const [adicionarAberto, setAdicionarAberto] = useState(false);
    const [arranjos, setArranjos] = useState<Arranjo[]>([]);

    useEffect(() => {
        fetchArranjos();
    }, []);

    const fetchArranjos = async () => {
        try {
            const response = await axios.get<Arranjo[]>(
                "http://localhost:3000/arranjo"
            );
            setArranjos(response.data);
        } catch (error) {
            console.error("Erro ao buscar arranjos:", error);
        }
    };

    const abrirAdicionar = () => {
        setAdicionarAberto(true);
    };

    const fecharAdicionar = () => {
        setAdicionarAberto(false);
    };

    const handleAdicionarArranjo = async (arranjoData: Arranjo) => {
        try {
            await axios.post("http://localhost:3000/arranjo", arranjoData);
            fecharAdicionar();
            fetchArranjos(); // Atualiza a lista de arranjos
        } catch (error) {
            console.error("Erro ao adicionar arranjo de discurso:", error);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-md p-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-900">
                    Arranjo de Discursos Públicos
                </h2>
                <div className="mb-4">
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-gray-800">
                                    Data
                                </th>
                                <th className="px-4 py-2 text-gray-800">
                                    Tema
                                </th>
                                <th className="px-4 py-2 text-gray-800">
                                    Orador
                                </th>
                                <th className="px-4 py-2 text-gray-800">
                                    Presencial
                                </th>
                                <th className="px-4 py-2 text-gray-800">
                                    Transmissão
                                </th>
                                <th className="px-4 py-2 text-gray-800">
                                    Arranjo Confirmado
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {arranjos.map((arranjo) => (
                                <tr key={arranjo.id}>
                                    <td className="px-4 py-2 text-gray-800">
                                        {arranjo.data}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800">
                                        {arranjo.tema}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800">
                                        {arranjo.orador}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800">
                                        {arranjo.presencial ? "Sim" : "Não"}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800">
                                        {arranjo.transmissao ? "Sim" : "Não"}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800">
                                        {arranjo.arranjoConfirmado}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="mr-2 px-4 py-2 bg-gray-800 text-white rounded-md"
                    >
                        Fechar
                    </button>
                    <button
                        onClick={abrirAdicionar}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Adicionar
                    </button>
                </div>
            </div>
            {adicionarAberto && <AddArranjo onClose={fecharAdicionar} />}
        </div>
    );
};
