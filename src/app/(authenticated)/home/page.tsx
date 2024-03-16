"use client";

import React, { useState } from "react";
import Head from "next/head";
import {
    NavBar,
    PopupArranjo,
    PopupCong,
    PopupDesignacao,
    PopupDiscursos,
    PopupGrupos,
    PopupOradores,
    PopupPartVM,
    PopupPubli,
    PopupSaidas,
    PopupTPL,
    PopupUsuarios,
} from "@/components";

function HomePage() {
    const [selectedActivity, setSelectedActivity] = useState<string>("");

    const gestaoAtividades = [
        "Arranjo de discursos públicos",
        "Designação para as reuniões congregacionais",
        "Saídas para o serviço de campo",
        "Testemunho público local",
        "Participações nas reuniões Vida e Ministério",
    ];

    const cadastros = [
        "Usuários",
        "Grupos de serviço de campo",
        "Publicadores",
        "Congregações",
        "Oradores de Congregações",
        "Discursos públicos",
    ];

    const handleActivityClick = (activity: string) => {
        setSelectedActivity(activity);
    };

    return (
        <div>
            <Head>
                <title>SGC - Sistema de Gestão de Congregação</title>
            </Head>
            <div style={{ marginTop: "0px" }}>
                <NavBar />
            </div>
            <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex justify-center items-start">
                <div className="flex">
                    <div className="max-w-4xl w-full mx-auto p-4 md:p-8 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Cartão 1: GESTÃO DE ATIVIDADES */}
                        <div className="bg-white rounded-md text-gray-900">
                            <h2 className="text-lg font-semibold mb-2 px-4 pt-4">
                                GESTÃO DE ATIVIDADES
                            </h2>
                            <ul className="px-4">
                                {gestaoAtividades.map((activity, index) => (
                                    <li
                                        key={index}
                                        className={
                                            index ===
                                            gestaoAtividades.length - 1
                                                ? "mb-4 cursor-pointer hover:underline"
                                                : "cursor-pointer hover:underline"
                                        }
                                        onClick={() =>
                                            handleActivityClick(activity)
                                        }
                                    >
                                        {activity}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        {/* Cartão 2: LISTAS DE CADASTROS */}
                        <div className="bg-white rounded-md text-gray-900">
                            <h2 className="text-lg font-semibold mb-2 px-4 pt-4">
                                LISTAS DE CADASTROS
                            </h2>
                            <ul className="px-4">
                                {cadastros.map((activity, index) => (
                                    <li
                                        key={index}
                                        className={
                                            index === cadastros.length - 1
                                                ? "mb-4 cursor-pointer hover:underline"
                                                : "cursor-pointer hover:underline"
                                        }
                                        onClick={() =>
                                            handleActivityClick(activity)
                                        }
                                    >
                                        {activity}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {/* Renderizar o pop-up correspondente à atividade selecionada */}
            {selectedActivity && (
                <>
                    {selectedActivity === "Arranjo de discursos públicos" && (
                        <PopupArranjo onClose={() => setSelectedActivity("")} />
                    )}
                    {selectedActivity ===
                        "Designação para as reuniões congregacionais" && (
                        <PopupDesignacao
                            onClose={() => setSelectedActivity("")}
                        />
                    )}
                    {selectedActivity === "Saídas para o serviço de campo" && (
                        <PopupSaidas onClose={() => setSelectedActivity("")} />
                    )}
                    {selectedActivity === "Testemunho público local" && (
                        <PopupTPL onClose={() => setSelectedActivity("")} />
                    )}
                    {selectedActivity ===
                        "Participações nas reuniões Vida e Ministério" && (
                        <PopupPartVM onClose={() => setSelectedActivity("")} />
                    )}
                    {selectedActivity === "Usuários" && (
                        <PopupUsuarios
                            onClose={() => setSelectedActivity("")}
                        />
                    )}
                    {selectedActivity === "Grupos de serviço de campo" && (
                        <PopupGrupos onClose={() => setSelectedActivity("")} />
                    )}
                    {selectedActivity === "Publicadores" && (
                        <PopupPubli onClose={() => setSelectedActivity("")} />
                    )}
                    {selectedActivity === "Congregações" && (
                        <PopupCong onClose={() => setSelectedActivity("")} />
                    )}
                    {selectedActivity === "Oradores de Congregações" && (
                        <PopupOradores
                            onClose={() => setSelectedActivity("")}
                        />
                    )}
                    {selectedActivity === "Discursos públicos" && (
                        <PopupDiscursos
                            onClose={() => setSelectedActivity("")}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default HomePage;
