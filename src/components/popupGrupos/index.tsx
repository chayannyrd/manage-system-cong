"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AddGrupos } from "@/components";

interface PopupGruposProps {
    onClose: () => void;
}

export const PopupGrupos: React.FC<PopupGruposProps> = ({ onClose }) => {
    const [addGruposAberto, setAddGruposAberto] = useState(false);
    const [grupos, setGrupos] = useState<Grupo[]>([]);

    useEffect(() => {
        fetchGrupos(); // Buscar os grupos existentes ao montar o componente
    }, []);

    const fetchGrupos = async () => {
        try {
            const response = await axios.get<Grupo[]>(
                "http://localhost:3000/grupos"
            );
            setGrupos(response.data); // Atualizar o estado com os grupos existentes no servidor
        } catch (error) {
            console.error("Erro ao buscar grupos:", error);
        }
    };

    const abrirAddGrupos = () => {
        setAddGruposAberto(true);
    };

    const fecharAddGrupos = () => {
        setAddGruposAberto(false);
    };

    const adicionarNovoGrupo = (novoGrupo: Grupo) => {
        setGrupos([...grupos, novoGrupo]);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-md p-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-900">
                    Grupos de Serviço de Campo
                </h2>
                <div className="mb-4">
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th className="text-gray-800 px-4 py-2">ID</th>
                                <th className="text-gray-800 px-4 py-2">
                                    Nome do Grupo
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {grupos.map((grupo) => (
                                <tr key={grupo.id}>
                                    <td className="border text-gray-800 px-4 py-2">
                                        {grupo.id}
                                    </td>
                                    <td className="border text-gray-800 px-4 py-2">
                                        {grupo.nome}
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
                        onClick={abrirAddGrupos}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Adicionar
                    </button>
                </div>
            </div>
            {addGruposAberto && (
                <AddGrupos
                    onClose={fecharAddGrupos}
                    onAdicionarGrupo={adicionarNovoGrupo}
                />
            )}
        </div>
    );
};

interface Grupo {
    id: string;
    nome: string;
}
