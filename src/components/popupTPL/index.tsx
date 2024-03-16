"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AddTPL } from "@/components"; // Importe o componente AddTPL

interface TPLItem {
    id: string;
    horario: string;
    diaSemana: string;
    titulo: string;
    autor: string;
    carrinho: boolean;
    display: boolean;
    publicadores: string[];
}

interface PopupTPLProps {
    onClose: () => void;
}

export const PopupTPL: React.FC<PopupTPLProps> = ({ onClose }) => {
    const [addTPLAberto, setAddTPLAberto] = useState(false); // Adicione um estado para controlar a abertura do AddTPL
    const [tplItems, setTplItems] = useState<TPLItem[]>([]); // Estado para armazenar os itens do TPL

    useEffect(() => {
        fetchTplItems(); // Ao montar o componente, faça a requisição para buscar os itens do TPL
    }, []);

    const fetchTplItems = async () => {
        try {
            const response = await axios.get<TPLItem[]>(
                "http://localhost:3000/TPL"
            );
            setTplItems(response.data); // Atualiza o estado com os dados recebidos do servidor
        } catch (error) {
            console.error("Erro ao buscar itens do TPL:", error);
        }
    };

    const abrirAddTPL = () => {
        setAddTPLAberto(true);
    };

    const fecharAddTPL = () => {
        setAddTPLAberto(false);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-md p-4">
                <h2 className="text-lg font-semibold mb-2 text-gray-900">
                    Testemunho Público Local
                </h2>
                <div className="mb-4">
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-gray-800">
                                    Horário
                                </th>
                                <th className="px-4 py-2 text-gray-800">
                                    Dia da semana
                                </th>
                                <th className="px-4 py-2 text-gray-800">
                                    Título
                                </th>
                                <th className="px-4 py-2 text-gray-800">
                                    Autor
                                </th>
                                <th className="px-4 py-2 text-gray-800">
                                    Carrinho
                                </th>
                                <th className="px-4 py-2 text-gray-800">
                                    Display
                                </th>
                                <th className="px-4 py-2 text-gray-800">
                                    Publicadores
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tplItems.map((item) => (
                                <tr key={item.id}>
                                    <td className="px-4 py-2 text-gray-800">
                                        {item.horario}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800">
                                        {item.diaSemana}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800">
                                        {item.titulo}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800">
                                        {item.autor}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800">
                                        {item.carrinho ? "Sim" : "Não"}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800">
                                        {item.display ? "Sim" : "Não"}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800">
                                        {item.publicadores.join(", ")}
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
                        onClick={abrirAddTPL} // Chame a função abrirAddTPL ao clicar no botão "Adicionar"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Adicionar
                    </button>
                </div>
            </div>
            {addTPLAberto && <AddTPL onClose={fecharAddTPL} />}{" "}
            {/* Renderize o componente AddTPL se addTPLAberto for verdadeiro */}
        </div>
    );
};
