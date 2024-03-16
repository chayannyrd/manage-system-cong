"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Grupo {
    id: string;
    nome: string;
}

interface AddPubliProps {
    onClose: () => void;
    onAdicionarPublicador: (novoPublicador: Publicador) => void;
}

interface Publicador {
    id: string;
    nome: string;
    dataNascimento: string;
    sexo: string;
    telefone: string;
    grupoCampo: string;
    funcaoNoGrupo: string;
    batizado: boolean;
    pioneiroRegular: boolean;
    funcao: string;
    foto?: string;
}

export const AddPubli: React.FC<AddPubliProps> = ({
    onClose,
    onAdicionarPublicador,
}) => {
    const [idPubli, setIdPubli] = useState("");
    const [nomePubli, setNomePubli] = useState("");
    const [dataNascimentoPubli, setDataNascimentoPubli] = useState("");
    const [sexoPubli, setSexoPubli] = useState("");
    const [telefonePubli, setTelefonePubli] = useState("");
    const [grupoCampoPubli, setGrupoCampoPubli] = useState("");
    const [funcaoNoGrupoPubli, setFuncaoNoGrupoPubli] = useState("");
    const [batizadoPubli, setBatizadoPubli] = useState(false);
    const [pioneiroRegularPubli, setPioneiroRegularPubli] = useState(false);
    const [funcaoPubli, setFuncaoPubli] = useState("");
    const [fotoPubli, setFotoPubli] = useState<File | null>(null);
    const [grupos, setGrupos] = useState<Grupo[]>([]);

    useEffect(() => {
        fetchGrupos();
    }, []);

    const fetchGrupos = async () => {
        try {
            const response = await axios.get<Grupo[]>(
                "http://localhost:3000/grupos"
            );
            setGrupos(response.data);
        } catch (error) {
            console.error("Erro ao buscar grupos de campo:", error);
        }
    };

    const handleAdicionarPublicador = async () => {
        try {
            const response = await axios.post<Publicador>(
                "http://localhost:3000/publi",
                {
                    id: idPubli,
                    nome: nomePubli,
                    dataNascimento: dataNascimentoPubli,
                    sexo: sexoPubli,
                    telefone: telefonePubli,
                    grupoCampo: grupoCampoPubli,
                    funcaoNoGrupo: funcaoNoGrupoPubli,
                    batizado: batizadoPubli,
                    pioneiroRegular: pioneiroRegularPubli,
                    funcao: funcaoPubli,
                    foto: fotoPubli
                        ? URL.createObjectURL(fotoPubli)
                        : undefined,
                }
            );

            onAdicionarPublicador(response.data);
            onClose();
        } catch (error) {
            console.error("Erro ao adicionar publicador:", error);
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-md p-4 text-center">
                <h2 className="text-lg font-semibold mb-2 text-gray-900">
                    Adicionar Publicador
                </h2>
                <div className="grid grid-cols-2 gap-4 mb-2">
                    <div className="flex flex-col">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            ID:
                        </label>
                        <input
                            type="text"
                            value={idPubli}
                            onChange={(e) => setIdPubli(e.target.value)}
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                        />
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Nome:
                        </label>
                        <input
                            type="text"
                            value={nomePubli}
                            onChange={(e) => setNomePubli(e.target.value)}
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-2">
                        <div className="flex flex-col">
                            <label className="bg-transparent text-slate-900 px-2 py-1">
                                Data de Nascimento:
                            </label>
                            <input
                                type="text"
                                value={dataNascimentoPubli}
                                onChange={(e) =>
                                    setDataNascimentoPubli(e.target.value)
                                }
                                placeholder="dd/mm/aaaa"
                                className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                            />
                        </div>
                        <div className="flex flex-col mb-2">
                            <label className="bg-transparent text-slate-900 px-2 py-1">
                                Sexo:
                            </label>
                            <select
                                value={sexoPubli}
                                onChange={(e) => setSexoPubli(e.target.value)}
                                className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                            >
                                <option value="">Selecione</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Feminino">Feminino</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Telefone:
                        </label>
                        <input
                            type="text"
                            value={telefonePubli}
                            onChange={(e) => setTelefonePubli(e.target.value)}
                            placeholder="(00)00000-0000"
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                        />
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Grupo de Campo:
                        </label>
                        <select
                            value={grupoCampoPubli}
                            onChange={(e) => setGrupoCampoPubli(e.target.value)}
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                        >
                            <option value="">Selecione</option>
                            {grupos.map((grupo) => (
                                <option key={grupo.id} value={grupo.nome}>
                                    {grupo.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Função no Grupo:
                        </label>
                        <select
                            value={funcaoNoGrupoPubli}
                            onChange={(e) =>
                                setFuncaoNoGrupoPubli(e.target.value)
                            }
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                        >
                            <option value="">Selecione</option>
                            <option value="Membro">Membro</option>
                            <option value="Dirigente">Dirigente</option>
                            <option value="Ajudante">Ajudante</option>
                        </select>
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Batizado:
                        </label>
                        <div>
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    checked={batizadoPubli}
                                    onChange={(e) =>
                                        setBatizadoPubli(e.target.checked)
                                    }
                                    className="form-checkbox text-blue-500"
                                />
                                <span className="ml-2 text-black">Sim</span>
                            </label>
                            <label className="inline-flex items-center ml-4">
                                <input
                                    type="checkbox"
                                    checked={!batizadoPubli}
                                    onChange={(e) =>
                                        setBatizadoPubli(!e.target.checked)
                                    }
                                    className="form-checkbox text-blue-500"
                                />
                                <span className="ml-2 text-black">Não</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Pioneiro Regular:
                        </label>
                        <div>
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    checked={pioneiroRegularPubli}
                                    onChange={(e) =>
                                        setPioneiroRegularPubli(
                                            e.target.checked
                                        )
                                    }
                                    className="form-checkbox text-blue-500"
                                />
                                <span className="ml-2 text-black">Sim</span>
                            </label>
                            <label className="inline-flex items-center ml-4">
                                <input
                                    type="checkbox"
                                    checked={!pioneiroRegularPubli}
                                    onChange={(e) =>
                                        setPioneiroRegularPubli(
                                            !e.target.checked
                                        )
                                    }
                                    className="form-checkbox text-blue-500"
                                />
                                <span className="ml-2 text-black">Não</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Função:
                        </label>
                        <select
                            value={funcaoPubli}
                            onChange={(e) => setFuncaoPubli(e.target.value)}
                            className="border rounded-md px-2 py-1 text-gray-900 bg-gray-300"
                        >
                            <option value="">Selecione</option>
                            <option value="Nenhum">Nenhum</option>
                            <option value="Ancião">Ancião</option>
                            <option value="Servo">Servo</option>
                        </select>
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="bg-transparent text-slate-900 px-2 py-1">
                            Foto:
                        </label>
                        <input
                            type="file"
                            onChange={(e) =>
                                setFotoPubli(
                                    e.target.files ? e.target.files[0] : null
                                )
                            }
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
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        onClick={handleAdicionarPublicador}
                    >
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    );
};
