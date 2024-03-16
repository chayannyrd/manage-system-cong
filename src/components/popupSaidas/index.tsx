"use Client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AddSaidas } from "@/components";

interface Saida {
    id: string;
    horario: string;
    diaSemana: string;
    local: string;
    dirigente: string;
    grupo: string;
}

interface PopupSaidasProps {
    onClose: () => void;
}

export const PopupSaidas: React.FC<PopupSaidasProps> = ({ onClose }) => {
    const [addSaidasAberto, setAddSaidasAberto] = useState(false);
    const [saidas, setSaidas] = useState<Saida[]>([]);

    useEffect(() => {
        fetchSaidas();
    }, []);

    const fetchSaidas = async () => {
        try {
            const response = await axios.get<Saida[]>(
                "http://localhost:3000/saidas"
            );
            setSaidas(response.data);
        } catch (error) {
            console.error("Erro ao buscar saídas:", error);
        }
    };

    const abrirAddSaidas = () => {
        setAddSaidasAberto(true);
    };

    const fecharAddSaidas = () => {
        setAddSaidasAberto(false);
    };

    const adicionarNovaSaida = (novaSaida: Saida) => {
        setSaidas([...saidas, novaSaida]);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-md p-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-900">
                    Saídas para o Serviço de Campo
                </h2>
                <div className="mb-4">
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th className="text-gray-800 px-4 py-2">
                                    Horário
                                </th>
                                <th className="text-gray-800 px-4 py-2">
                                    Dia da Semana
                                </th>
                                <th className="text-gray-800 px-4 py-2">
                                    Local
                                </th>
                                <th className="text-gray-800 px-4 py-2">
                                    Dirigente
                                </th>
                                <th className="text-gray-800 px-4 py-2">
                                    Grupo
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {saidas.map((saida) => (
                                <tr key={saida.id}>
                                    <td className="border text-gray-800 px-4 py-2">
                                        {saida.horario}
                                    </td>
                                    <td className="border text-gray-800 px-4 py-2">
                                        {saida.diaSemana}
                                    </td>
                                    <td className="border text-gray-800 px-4 py-2">
                                        {saida.local}
                                    </td>
                                    <td className="border text-gray-800 px-4 py-2">
                                        {saida.dirigente}
                                    </td>
                                    <td className="border text-gray-800 px-4 py-2">
                                        {saida.grupo}
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
                        onClick={abrirAddSaidas}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Adicionar
                    </button>
                </div>
            </div>
            {addSaidasAberto && (
                <AddSaidas
                    onClose={fecharAddSaidas}
                    onAdicionarSaida={adicionarNovaSaida}
                />
            )}
        </div>
    );
};
