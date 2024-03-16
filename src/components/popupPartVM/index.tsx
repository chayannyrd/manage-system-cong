"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AddPartVM } from "@/components";

interface PopupPartVMProps {
    onClose: () => void;
}

export const PopupPartVM: React.FC<PopupPartVMProps> = ({ onClose }) => {
    const [addPartVMAberto, setAddPartVMAberto] = useState(false);
    const [participantes, setParticipantes] = useState<Participante[]>([]);

    useEffect(() => {
        fetchParticipantes(); // Buscar os participantes existentes ao montar o componente
    }, []);

    const fetchParticipantes = async () => {
        try {
            const response = await axios.get<Participante[]>(
                "http://localhost:3000/partVM"
            );
            setParticipantes(response.data); // Atualizar o estado com os participantes existentes no servidor
        } catch (error) {
            console.error("Erro ao buscar participantes:", error);
        }
    };

    const abrirAddPartVM = () => {
        setAddPartVMAberto(true);
    };

    const fecharAddPartVM = () => {
        setAddPartVMAberto(false);
    };

    const adicionarNovoParticipante = (novoParticipante: Participante) => {
        setParticipantes([...participantes, novoParticipante]);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-md p-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-900">
                    Participantes - Reunião Vida e Ministério
                </h2>
                <div className="mb-4">
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th className="text-gray-800 px-4 py-2">
                                    Publicador
                                </th>
                                <th className="text-gray-800 px-4 py-2">
                                    Ajudante
                                </th>
                                <th className="text-gray-800 px-4 py-2">Dia</th>
                                <th className="text-gray-800 px-4 py-2">
                                    Semana
                                </th>
                                <th className="text-gray-800 px-4 py-2">
                                    Número da Parte
                                </th>
                                <th className="text-gray-800 px-4 py-2">
                                    Sala Principal
                                </th>
                                <th className="text-gray-800 px-4 py-2">
                                    Sala B
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {participantes.map((participante) => (
                                <tr key={participante.id}>
                                    <td className="border text-gray-800 px-4 py-2">
                                        {participante.nome}
                                    </td>
                                    <td className="border text-gray-800 px-4 py-2">
                                        {participante.ajudante}
                                    </td>
                                    <td className="border text-gray-800 px-4 py-2">
                                        {participante.dia}
                                    </td>
                                    <td className="border text-gray-800 px-4 py-2">
                                        {participante.semana}
                                    </td>
                                    <td className="border text-gray-800 px-4 py-2">
                                        {participante.numeroParte}
                                    </td>
                                    <td className="border text-gray-800 px-4 py-2">
                                        {participante.salaPrincipal
                                            ? "Sim"
                                            : "Não"}
                                    </td>
                                    <td className="border text-gray-800 px-4 py-2">
                                        {participante.salaB ? "Sim" : "Não"}
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
                        onClick={abrirAddPartVM}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Adicionar
                    </button>
                </div>
            </div>
            {addPartVMAberto && (
                <AddPartVM
                    onClose={fecharAddPartVM}
                    onAdicionarParticipante={adicionarNovoParticipante}
                />
            )}
        </div>
    );
};

interface Participante {
    id: string;
    nome: string;
    ajudante: string;
    dia: string;
    semana: string;
    numeroParte: string;
    salaPrincipal: boolean;
    salaB: boolean;
}
