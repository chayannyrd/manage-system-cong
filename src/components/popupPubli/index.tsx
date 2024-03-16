"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AddPubli } from "@/components";

interface Publicador {
    id: string;
    nome: string;
    dataNascimento: string;
    sexo: string;
    telefone: string;
    grupoCampo: string;
    funcaoNoGrupo: string; // Adicione a propriedade de função no grupo
    batizado: boolean; // Adicione a propriedade de batizado
    pioneiroRegular: boolean; // Adicione a propriedade de pioneiro regular
    funcao: string; // Adicione a propriedade de função
    foto?: string;
}

interface Grupo {
    id: string;
    nome: string;
}

interface PopupPubliProps {
    onClose: () => void;
}

export const PopupPubli: React.FC<PopupPubliProps> = ({ onClose }) => {
    const [addPubliAberto, setAddPubliAberto] = useState(false);
    const [publicadores, setPublicadores] = useState<Publicador[]>([]);
    const [grupos, setGrupos] = useState<Grupo[]>([]);

    useEffect(() => {
        fetchPublicadores();
        fetchGrupos();
    }, []);

    const fetchPublicadores = async () => {
        try {
            const response = await axios.get<Publicador[]>(
                "http://localhost:3000/publi"
            );
            setPublicadores(response.data);
        } catch (error) {
            console.error("Erro ao buscar publicadores:", error);
        }
    };

    const fetchGrupos = async () => {
        try {
            const response = await axios.get<Grupo[]>(
                "http://localhost:3000/grupos"
            );
            setGrupos(response.data);
        } catch (error) {
            console.error("Erro ao buscar grupos:", error);
        }
    };

    const adicionarPublicadorLocalmente = (novoPublicador: Publicador) => {
        setPublicadores([...publicadores, novoPublicador]);
    };

    const abrirAddPubli = () => {
        setAddPubliAberto(true);
    };

    const fecharAddPubli = () => {
        setAddPubliAberto(false);
    };

    const handleAdicionarPublicador = (novoPublicador: Publicador) => {
        adicionarPublicadorLocalmente(novoPublicador);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-md p-4 max-h-96 overflow-y-auto">
                <h2 className="text-lg font-semibold mb-2 text-gray-900">
                    Publicadores
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
                                    Data de Nascimento
                                </th>
                                <th className="text-gray-800 px-4 py-2">
                                    Sexo
                                </th>
                                <th className="text-gray-800 px-4 py-2">
                                    Telefone
                                </th>
                                <th className="text-gray-800 px-4 py-2">
                                    Grupo de Campo
                                </th>
                                <th className="text-gray-800 px-4 py-2">
                                    Função no Grupo
                                </th>
                                <th className="text-gray-800 px-4 py-2">
                                    Batizado
                                </th>
                                <th className="text-gray-800 px-4 py-2">
                                    Pioneiro Regular
                                </th>
                                <th className="text-gray-800 px-4 py-2">
                                    Função
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {publicadores.map((publicador) => (
                                <tr key={publicador.id}>
                                    <td className="border text-gray-800 px-4 py-2">
                                        {publicador.id}
                                    </td>
                                    <td className="border text-gray-800 px-4 py-2">
                                        {publicador.nome}
                                    </td>
                                    <td className="border text-gray-800 px-4 py-2">
                                        {publicador.dataNascimento}
                                    </td>
                                    <td className="border text-gray-800 px-4 py-2">
                                        {publicador.sexo}
                                    </td>
                                    <td className="border text-gray-800 px-4 py-2">
                                        {publicador.telefone}
                                    </td>
                                    <td className="border text-gray-800 px-4 py-2">
                                        {publicador.grupoCampo}
                                    </td>
                                    <td className="border text-gray-800 px-4 py-2">
                                        {publicador.funcaoNoGrupo}
                                    </td>
                                    <td className="border text-gray-800 px-4 py-2">
                                        {publicador.batizado ? "Sim" : "Não"}
                                    </td>
                                    <td className="border text-gray-800 px-4 py-2">
                                        {publicador.pioneiroRegular
                                            ? "Sim"
                                            : "Não"}
                                    </td>
                                    <td className="border text-gray-800 px-4 py-2">
                                        {publicador.funcao}
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
                        onClick={abrirAddPubli}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Adicionar
                    </button>
                </div>
            </div>
            {addPubliAberto && (
                <AddPubli
                    onClose={fecharAddPubli}
                    onAdicionarPublicador={handleAdicionarPublicador}
                />
            )}
        </div>
    );
};
