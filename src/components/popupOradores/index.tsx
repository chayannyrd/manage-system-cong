"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AddOradores } from "@/components"; // Importe o componente AddOradores

interface Orador {
    id: string;
    nome: string;
    telefone: string;
    email: string;
    congregacao: string;
}

interface PopupOradoresProps {
    onClose: () => void;
}

export const PopupOradores: React.FC<PopupOradoresProps> = ({ onClose }) => {
    const [addOradoresAberto, setAddOradoresAberto] = useState(false); // Adicione um estado para controlar a abertura do popup AddOradores
    const [oradores, setOradores] = useState<Orador[]>([]); // Estado para armazenar os dados dos oradores

    useEffect(() => {
        fetchOradores(); // Ao montar o componente, faça a requisição para buscar os oradores
    }, []);

    const fetchOradores = async () => {
        try {
            const response = await axios.get<Orador[]>(
                "http://localhost:3000/oradores"
            );
            setOradores(response.data); // Atualiza o estado com os dados recebidos do servidor
        } catch (error) {
            console.error("Erro ao buscar oradores:", error);
        }
    };

    const abrirAddOradores = () => {
        setAddOradoresAberto(true);
    };

    const fecharAddOradores = () => {
        setAddOradoresAberto(false);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-md p-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-900">
                    Oradores de Congregações
                </h2>
                <div className="mb-4">
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-gray-800">
                                    Nome
                                </th>
                                <th className="px-4 py-2 text-gray-800">
                                    Telefone
                                </th>
                                <th className="px-4 py-2 text-gray-800">
                                    Email
                                </th>
                                <th className="px-4 py-2 text-gray-800">
                                    Congregação
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {oradores.map((orador) => (
                                <tr key={orador.id}>
                                    <td className="px-4 py-2 text-gray-800">
                                        {orador.nome}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800">
                                        {orador.telefone}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800">
                                        {orador.email}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800">
                                        {orador.congregacao}
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
                        onClick={abrirAddOradores} // Chame a função abrirAddOradores ao clicar no botão "Adicionar"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Adicionar
                    </button>
                </div>
            </div>
            {addOradoresAberto && <AddOradores onClose={fecharAddOradores} />}{" "}
            {/* Renderize o componente AddOradores se addOradoresAberto for verdadeiro */}
        </div>
    );
};
