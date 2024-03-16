"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AddDiscursos } from "@/components";

interface PopupDiscursosProps {
    onClose: () => void;
}

interface Discurso {
    id: string;
    numero: string;
    tema: string;
}

export const PopupDiscursos: React.FC<PopupDiscursosProps> = ({ onClose }) => {
    const [addDiscursosAberto, setAddDiscursosAberto] = useState(false);
    const [discursos, setDiscursos] = useState<Discurso[]>([]);

    useEffect(() => {
        fetchDiscursos();
    }, []);

    const fetchDiscursos = async () => {
        try {
            const response = await axios.get<Discurso[]>(
                "http://localhost:3000/discursos"
            );
            setDiscursos(response.data);
        } catch (error) {
            console.error("Erro ao buscar discursos:", error);
        }
    };

    const abrirAddDiscursos = () => {
        setAddDiscursosAberto(true);
    };

    const fecharAddDiscursos = () => {
        setAddDiscursosAberto(false);
        // Atualiza a lista após adicionar um novo discurso
        fetchDiscursos();
    };

    const adicionarNovoDiscurso = (novoDiscurso: Discurso) => {
        setDiscursos([...discursos, novoDiscurso]);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-md p-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-900">
                    Discursos na Reunião Congregacional
                </h2>
                <div className="mb-4">
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th className="text-gray-800 px-4 py-2">
                                    Número
                                </th>
                                <th className="text-gray-800 px-4 py-2">
                                    Tema do Discurso
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {discursos.map((discurso) => (
                                <tr key={discurso.id}>
                                    <td className="border px-4 py-2 text-gray-800">
                                        {discurso.numero}
                                    </td>
                                    <td className="border px-4 py-2 text-gray-800">
                                        {discurso.tema}
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
                        onClick={abrirAddDiscursos}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Adicionar
                    </button>
                </div>
            </div>
            {addDiscursosAberto && (
                <AddDiscursos
                    onClose={fecharAddDiscursos}
                    onAdicionarDiscurso={adicionarNovoDiscurso}
                />
            )}
        </div>
    );
};
