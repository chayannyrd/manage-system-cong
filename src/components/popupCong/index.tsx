"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AddCong } from "@/components";

interface Congregacao {
    id: string;
    nome: string;
    cidade: string;
    uf: string;
}

interface PopupCongProps {
    onClose: () => void;
}

export const PopupCong: React.FC<PopupCongProps> = ({ onClose }) => {
    const [adicionarAberto, setAdicionarAberto] = useState(false);
    const [congregacoes, setCongregacoes] = useState<Congregacao[]>([]);

    useEffect(() => {
        fetchCongregacoes();
    }, []);

    const fetchCongregacoes = async () => {
        try {
            const response = await axios.get<Congregacao[]>(
                "http://localhost:3000/cong"
            );
            setCongregacoes(response.data);
        } catch (error) {
            console.error("Erro ao buscar congregações:", error);
        }
    };

    const abrirAdicionar = () => {
        setAdicionarAberto(true);
    };

    const fecharAdicionar = () => {
        setAdicionarAberto(false);
        // Atualiza a lista após adicionar uma nova congregação
        fetchCongregacoes();
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-md p-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-900">
                    Lista de Congregações
                </h2>
                <div className="mb-4">
                    <table className="table-auto">
                        <thead>
                            <tr>
                                <th className="text-gray-800 px-4 py-2">ID</th>
                                <th className="text-gray-800 px-4 py-2">
                                    Nome
                                </th>
                                <th className="text-gray-800 px-4 py-2">
                                    Cidade
                                </th>
                                <th className="text-gray-800 px-4 py-2">UF</th>
                            </tr>
                        </thead>
                        <tbody>
                            {congregacoes.map((congregacao) => (
                                <tr key={congregacao.id}>
                                    <td className="border px-4 py-2 text-gray-800">
                                        {congregacao.id}
                                    </td>
                                    <td className="border px-4 py-2 text-gray-800">
                                        {congregacao.nome}
                                    </td>
                                    <td className="border px-4 py-2 text-gray-800">
                                        {congregacao.cidade}
                                    </td>
                                    <td className="border px-4 py-2 text-gray-800">
                                        {congregacao.uf}
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
            {adicionarAberto && <AddCong onClose={fecharAdicionar} />}
        </div>
    );
};
