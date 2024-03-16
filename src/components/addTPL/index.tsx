"use client";
import React, { useState } from "react";
import axios from "axios";

interface AddTPLProps {
    onClose: () => void;
}

export const AddTPL: React.FC<AddTPLProps> = ({ onClose }) => {
    const [horario, setHorario] = useState("");
    const [diaSemana, setDiaSemana] = useState("");
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [carrinhoChecked, setCarrinhoChecked] = useState(false);
    const [displayChecked, setDisplayChecked] = useState(false);
    const [publicador1, setPublicador1] = useState("");
    const [publicador2, setPublicador2] = useState("");

    const diasSemana = [
        "Domingo",
        "Segunda-feira",
        "Terça-feira",
        "Quarta-feira",
        "Quinta-feira",
        "Sexta-feira",
        "Sábado",
    ];

    const handleCarrinhoChange = () => {
        setCarrinhoChecked(!carrinhoChecked);
        setDisplayChecked(false);
    };

    const handleDisplayChange = () => {
        setDisplayChecked(!displayChecked);
        setCarrinhoChecked(false);
    };

    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:3000/TPL", {
                horario,
                diaSemana,
                titulo,
                autor,
                carrinho: carrinhoChecked,
                display: displayChecked,
                publicadores: [publicador1, publicador2],
            });
            onClose();
        } catch (error) {
            console.error("Erro ao adicionar TPL:", error);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-md p-4 text-center">
                <h2 className="text-lg font-semibold mb-2 text-gray-900">
                    Adicionar horário
                </h2>
                <div className="mb-4">
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Dia da semana:
                        </label>
                        <select
                            value={diaSemana}
                            onChange={(e) => setDiaSemana(e.target.value)}
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                        >
                            <option value="">Selecione</option>
                            {diasSemana.map((dia, index) => (
                                <option key={index} value={dia}>
                                    {dia}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Horário:
                        </label>
                        <input
                            type="text"
                            value={horario}
                            onChange={(e) => setHorario(e.target.value)}
                            placeholder="00:00-23:59"
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                        />
                    </div>
                    <div className="flex justify-between mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Carrinho:
                            <input
                                type="checkbox"
                                checked={carrinhoChecked}
                                onChange={handleCarrinhoChange}
                                className="ml-2"
                            />
                        </label>
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Display:
                            <input
                                type="checkbox"
                                checked={displayChecked}
                                onChange={handleDisplayChange}
                                className="ml-2"
                            />
                        </label>
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Publicadores participantes:
                        </label>
                        <input
                            type="text"
                            value={publicador1}
                            onChange={(e) => setPublicador1(e.target.value)}
                            placeholder="Nome do publicador"
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300 mb-2"
                        />
                        <input
                            type="text"
                            value={publicador2}
                            onChange={(e) => setPublicador2(e.target.value)}
                            placeholder="Nome do publicador"
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                        />
                    </div>
                </div>
                <div className="flex justify-center">
                    <button
                        onClick={onClose}
                        className="mr-2 px-4 py-2 bg-gray-800 text-white rounded-md"
                    >
                        Fechar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                    >
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    );
};
