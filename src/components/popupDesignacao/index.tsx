"usa client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AddDesignacao } from "@/components";

interface Designacao {
    id: string;
    dia: string;
    mes: string;
    presidente: string;
    leitor: string;
    indicadores: string;
    microfones1: string;
    microfones2: string;
    grupoLimpeza: string;
}

interface PopupDesignacaoProps {
    onClose: () => void;
}

export const PopupDesignacao: React.FC<PopupDesignacaoProps> = ({
    onClose,
}) => {
    const [adicionarAberto, setAdicionarAberto] = useState(false);
    const [designacoes, setDesignacoes] = useState<Designacao[]>([]);

    useEffect(() => {
        fetchDesignacoes();
    }, []);

    const fetchDesignacoes = async () => {
        try {
            const response = await axios.get<Designacao[]>(
                "http://localhost:3000/designacao"
            );
            setDesignacoes(response.data);
        } catch (error) {
            console.error("Erro ao buscar designações:", error);
        }
    };

    const abrirAdicionar = () => {
        setAdicionarAberto(true);
    };

    const fecharAdicionar = () => {
        setAdicionarAberto(false);
    };

    const handleAdicionarDesignacao = async (designacaoData: Designacao) => {
        try {
            await axios.post(
                "http://localhost:3000/designacao",
                designacaoData
            );
            fecharAdicionar();
            fetchDesignacoes(); // Atualiza a lista de designações
        } catch (error) {
            console.error("Erro ao adicionar designação:", error);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-md p-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-900">
                    Designação para as Reuniões Congregacionais
                </h2>
                <div className="mb-4">
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-gray-800">Dia</th>
                                <th className="px-4 py-2 text-gray-800">Mês</th>
                                <th className="px-4 py-2 text-gray-800">
                                    Presidente
                                </th>
                                <th className="px-4 py-2 text-gray-800">
                                    Leitor
                                </th>
                                <th className="px-4 py-2 text-gray-800">
                                    Indicadores
                                </th>
                                <th className="px-4 py-2 text-gray-800">
                                    Microfones 1
                                </th>
                                <th className="px-4 py-2 text-gray-800">
                                    Microfones 2
                                </th>
                                <th className="px-4 py-2 text-gray-800">
                                    Grupo de Limpeza
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {designacoes.map((designacao) => (
                                <tr key={designacao.id}>
                                    <td className="px-4 py-2 text-gray-800">
                                        {designacao.dia}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800">
                                        {designacao.mes}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800">
                                        {designacao.presidente}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800">
                                        {designacao.leitor}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800">
                                        {designacao.indicadores}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800">
                                        {designacao.microfones1}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800">
                                        {designacao.microfones2}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800">
                                        {designacao.grupoLimpeza}
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
            {adicionarAberto && (
                <AddDesignacao
                    onClose={fecharAdicionar}
                    onAdicionarDesignacao={handleAdicionarDesignacao}
                />
            )}
        </div>
    );
};
