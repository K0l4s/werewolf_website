import { useState } from "react";
import mascot from "../../assets/images/mascot.png";
import { Search, Copy, CheckCircle } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const DocumentationPage = () => {
    const [activeGroup, setActiveGroup] = useState(0);
    const [activeCommand, setActiveCommand] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [copiedCommand, setCopiedCommand] = useState("");
    const {language} = useLanguage()
    const t = language.documentation;

    // Build command groups from translation data
    const commandGroups = [
        {
            name: t.commandGroups.economy.name,
            icon: t.commandGroups.economy.icon,
            commands: [
                {
                    name: t.commandGroups.economy.commands.donate.name,
                    description: t.commandGroups.economy.commands.donate.description,
                    usage: t.commandGroups.economy.commands.donate.usage,
                    arguments: [],
                    example: t.commandGroups.economy.commands.donate.example
                },
                {
                    name: t.commandGroups.economy.commands.wallet.name,
                    description: t.commandGroups.economy.commands.wallet.description,
                    usage: t.commandGroups.economy.commands.wallet.usage,
                    arguments: [],
                    example: t.commandGroups.economy.commands.wallet.example
                },
                {
                    name: t.commandGroups.economy.commands.daily.name,
                    description: t.commandGroups.economy.commands.daily.description,
                    usage: t.commandGroups.economy.commands.daily.usage,
                    arguments: [],
                    example: t.commandGroups.economy.commands.daily.example
                },
                {
                    name: t.commandGroups.economy.commands.give.name,
                    description: t.commandGroups.economy.commands.give.description,
                    usage: t.commandGroups.economy.commands.give.usage,
                    arguments: [
                        {
                            name: t.commandGroups.economy.commands.give.arguments.user.name,
                            type: t.commandGroups.economy.commands.give.arguments.user.type,
                            description: t.commandGroups.economy.commands.give.arguments.user.description
                        },
                        {
                            name: t.commandGroups.economy.commands.give.arguments.amount.name,
                            type: t.commandGroups.economy.commands.give.arguments.amount.type,
                            description: t.commandGroups.economy.commands.give.arguments.amount.description
                        }
                    ],
                    example: t.commandGroups.economy.commands.give.example
                },
                {
                    name: t.commandGroups.economy.commands.shop.name,
                    description: t.commandGroups.economy.commands.shop.description,
                    usage: t.commandGroups.economy.commands.shop.usage,
                    arguments: [],
                    example: t.commandGroups.economy.commands.shop.example
                },
                {
                    name: t.commandGroups.economy.commands.buy.name,
                    description: t.commandGroups.economy.commands.buy.description,
                    usage: t.commandGroups.economy.commands.buy.usage,
                    arguments: [
                        {
                            name: t.commandGroups.economy.commands.buy.arguments.itemRef.name,
                            type: t.commandGroups.economy.commands.buy.arguments.itemRef.type,
                            description: t.commandGroups.economy.commands.buy.arguments.itemRef.description
                        },
                        {
                            name: t.commandGroups.economy.commands.buy.arguments.quantity.name,
                            type: t.commandGroups.economy.commands.buy.arguments.quantity.type,
                            description: t.commandGroups.economy.commands.buy.arguments.quantity.description
                        }
                    ],
                    example: t.commandGroups.economy.commands.buy.example
                },
                {
                    name: t.commandGroups.economy.commands.sell.name,
                    description: t.commandGroups.economy.commands.sell.description,
                    usage: t.commandGroups.economy.commands.sell.usage,
                    arguments: [
                        {
                            name: t.commandGroups.economy.commands.sell.arguments.itemRef.name,
                            type: t.commandGroups.economy.commands.sell.arguments.itemRef.type,
                            description: t.commandGroups.economy.commands.sell.arguments.itemRef.description
                        },
                        {
                            name: t.commandGroups.economy.commands.sell.arguments.quantity.name,
                            type: t.commandGroups.economy.commands.sell.arguments.quantity.type,
                            description: t.commandGroups.economy.commands.sell.arguments.quantity.description
                        }
                    ],
                    example: t.commandGroups.economy.commands.sell.example
                },
            ]
        },
        {
            name: t.commandGroups.streak.name,
            icon: t.commandGroups.streak.icon,
            commands: [
                {
                    name: t.commandGroups.streak.commands.streak.name,
                    description: t.commandGroups.streak.commands.streak.description,
                    usage: t.commandGroups.streak.commands.streak.usage,
                    arguments: [
                        {
                            name: t.commandGroups.streak.commands.streak.arguments.streak.name,
                            type: t.commandGroups.streak.commands.streak.arguments.streak.type,
                            description: t.commandGroups.streak.commands.streak.arguments.streak.description
                        }
                    ],
                    example: t.commandGroups.streak.commands.streak.example
                },
            ]
        },
        {
            name: t.commandGroups.minigames.name,
            icon: t.commandGroups.minigames.icon,
            commands: [
                {
                    name: t.commandGroups.minigames.commands.baucua.name,
                    description: t.commandGroups.minigames.commands.baucua.description,
                    usage: t.commandGroups.minigames.commands.baucua.usage,
                    arguments: [
                        {
                            name: t.commandGroups.minigames.commands.baucua.arguments.bet.name,
                            type: t.commandGroups.minigames.commands.baucua.arguments.bet.type,
                            description: t.commandGroups.minigames.commands.baucua.arguments.bet.description
                        }
                    ],
                    example: t.commandGroups.minigames.commands.baucua.example
                },
                {
                    name: t.commandGroups.minigames.commands.jackpot.name,
                    description: t.commandGroups.minigames.commands.jackpot.description,
                    usage: t.commandGroups.minigames.commands.jackpot.usage,
                    arguments: [
                        {
                            name: t.commandGroups.minigames.commands.jackpot.arguments.bet.name,
                            type: t.commandGroups.minigames.commands.jackpot.arguments.bet.type,
                            description: t.commandGroups.minigames.commands.jackpot.arguments.bet.description
                        }
                    ],
                    example: t.commandGroups.minigames.commands.jackpot.example
                },
                {
                    name: t.commandGroups.minigames.commands.keoco.name,
                    description: t.commandGroups.minigames.commands.keoco.description,
                    usage: t.commandGroups.minigames.commands.keoco.usage,
                    arguments: [
                        {
                            name: t.commandGroups.minigames.commands.keoco.arguments.bet.name,
                            type: t.commandGroups.minigames.commands.keoco.arguments.bet.type,
                            description: t.commandGroups.minigames.commands.keoco.arguments.bet.description
                        }
                    ],
                    example: t.commandGroups.minigames.commands.keoco.example
                },
                {
                    name: t.commandGroups.minigames.commands.keobuabao.name,
                    description: t.commandGroups.minigames.commands.keobuabao.description,
                    usage: t.commandGroups.minigames.commands.keobuabao.usage,
                    arguments: [
                        {
                            name: t.commandGroups.minigames.commands.keobuabao.arguments.bet.name,
                            type: t.commandGroups.minigames.commands.keobuabao.arguments.bet.type,
                            description: t.commandGroups.minigames.commands.keobuabao.arguments.bet.description
                        }
                    ],
                    example: t.commandGroups.minigames.commands.keobuabao.example
                },
                {
                    name: t.commandGroups.minigames.commands.baicao.name,
                    description: t.commandGroups.minigames.commands.baicao.description,
                    usage: t.commandGroups.minigames.commands.baicao.usage,
                    arguments: [
                        {
                            name: t.commandGroups.minigames.commands.baicao.arguments.bet.name,
                            type: t.commandGroups.minigames.commands.baicao.arguments.bet.type,
                            description: t.commandGroups.minigames.commands.baicao.arguments.bet.description
                        }
                    ],
                    example: t.commandGroups.minigames.commands.baicao.example
                },
            ]
        },
        {
            name: t.commandGroups.werewolf.name,
            icon: t.commandGroups.werewolf.icon,
            commands: [
                {
                    name: t.commandGroups.werewolf.commands.new.name,
                    description: t.commandGroups.werewolf.commands.new.description,
                    usage: t.commandGroups.werewolf.commands.new.usage,
                    arguments: [],
                    example: t.commandGroups.werewolf.commands.new.example
                },
                {
                    name: t.commandGroups.werewolf.commands.join.name,
                    description: t.commandGroups.werewolf.commands.join.description,
                    usage: t.commandGroups.werewolf.commands.join.usage,
                    arguments: [],
                    example: t.commandGroups.werewolf.commands.join.example
                },
                {
                    name: t.commandGroups.werewolf.commands.start.name,
                    description: t.commandGroups.werewolf.commands.start.description,
                    usage: t.commandGroups.werewolf.commands.start.usage,
                    arguments: [],
                    example: t.commandGroups.werewolf.commands.start.example
                },
            ]
        },
        {
            name: t.commandGroups.systems.name,
            icon: t.commandGroups.systems.icon,
            commands: [
                {
                    name: t.commandGroups.systems.commands.prefix.name,
                    description: t.commandGroups.systems.commands.prefix.description,
                    usage: t.commandGroups.systems.commands.prefix.usage,
                    arguments: [
                        {
                            name: t.commandGroups.systems.commands.prefix.arguments.prefix.name,
                            type: t.commandGroups.systems.commands.prefix.arguments.prefix.type,
                            description: t.commandGroups.systems.commands.prefix.arguments.prefix.description
                        }
                    ],
                    example: t.commandGroups.systems.commands.prefix.example
                },
                {
                    name: t.commandGroups.systems.commands.lang.name,
                    description: t.commandGroups.systems.commands.lang.description,
                    usage: t.commandGroups.systems.commands.lang.usage,
                    arguments: [
                        {
                            name: t.commandGroups.systems.commands.lang.arguments.lang.name,
                            type: t.commandGroups.systems.commands.lang.arguments.lang.type,
                            description: t.commandGroups.systems.commands.lang.arguments.lang.description
                        }
                    ],
                    example: t.commandGroups.systems.commands.lang.example
                },
                {
                    name: t.commandGroups.systems.commands.voice.name,
                    description: t.commandGroups.systems.commands.voice.description,
                    usage: t.commandGroups.systems.commands.voice.usage,
                    arguments: [
                        {
                            name: t.commandGroups.systems.commands.voice.arguments.enabled.name,
                            type: t.commandGroups.systems.commands.voice.arguments.enabled.type,
                            description: t.commandGroups.systems.commands.voice.arguments.enabled.description
                        }
                    ],
                    example: t.commandGroups.systems.commands.voice.example
                },
                {
                    name: t.commandGroups.systems.commands.embed.name,
                    description: t.commandGroups.systems.commands.embed.description,
                    usage: t.commandGroups.systems.commands.embed.usage,
                    arguments: [
                        {
                            name: t.commandGroups.systems.commands.embed.arguments.enabled.name,
                            type: t.commandGroups.systems.commands.embed.arguments.enabled.type,
                            description: t.commandGroups.systems.commands.embed.arguments.enabled.description
                        }
                    ],
                    example: t.commandGroups.systems.commands.embed.example
                },
                {
                    name: t.commandGroups.systems.commands.streak.name,
                    description: t.commandGroups.systems.commands.streak.description,
                    usage: t.commandGroups.systems.commands.streak.usage,
                    arguments: [
                        {
                            name: t.commandGroups.systems.commands.streak.arguments.status.name,
                            type: t.commandGroups.systems.commands.streak.arguments.status.type,
                            description: t.commandGroups.systems.commands.streak.arguments.status.description
                        }
                    ],
                    example: t.commandGroups.systems.commands.streak.example
                },
            ]
        },
    ];

    // Filter commands based on search query
    const filteredGroups = commandGroups.map(group => ({
        ...group,
        commands: group.commands.filter(command =>
            command?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            command?.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(group => group.commands.length > 0);
    const [isAds, setIsAds] = useState(false);

    const handleCopy = (text: string) => {
        if (isAds) {
            // ✅ Thực hiện copy
            navigator.clipboard.writeText(text);
            setCopiedCommand(text);
            setTimeout(() => setCopiedCommand(""), 2000);
            setIsAds(false);
        } else {
            // ✅ Lần đầu click: mở quảng cáo
            window.open(
                "https://www.effectivegatecpm.com/m8hsfmrnz?key=7e46ac93a1b5877f000273843ae1b4d0",
                "_blank"
            );
            setIsAds(true);
        }
    };

    return (
        <div className="min-h-screen overflow-x-hidden">
            {/* HERO SECTION */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1">
                        <div className="inline-flex items-center mb-4 px-4 py-2 rounded-full bg-cyan-100 border-2 border-black text-black text-sm font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <span className="w-2 h-2 bg-cyan-400 border border-black rounded-full mr-2 animate-pulse"></span>
                            {t.hero.badge}
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black mb-6 text-black">
                            {t.hero.title} <br />
                            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">{t.hero.titleHighlight}</span>
                        </h1>
                        <p className="text-gray-700 text-lg max-w-xl mb-8 font-medium">
                            {t.hero.description}
                        </p>

                        {/* SEARCH BAR */}
                        <div className="relative max-w-md mb-8">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Search size={20} className="text-gray-600" />
                            </div>
                            <input
                                type="text"
                                placeholder={t.hero.searchPlaceholder}
                                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 font-medium shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex-1 flex justify-center relative">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full blur-xl"></div>
                            <div className="relative bg-white border-2 border-black rounded-full p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                                <img
                                    src={mascot}
                                    alt="Werewolf Bot Mascot"
                                    className="w-64 h-64 rounded-full object-cover"
                                />
                                {/* Decorative elements */}
                                <div className="absolute -top-1 -left-1 w-4 h-4 bg-cyan-400 border border-black rounded-full"></div>
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 border border-black rotate-45"></div>
                                <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-yellow-400 border border-black rounded-sm"></div>
                                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-green-400 border border-black rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* COMMANDS SECTION */}
            <section className="max-w-6xl mx-auto px-6 py-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* SIDEBAR - COMMAND GROUPS */}
                    <div className="lg:w-1/4">
                        <div className="sticky top-24 bg-white border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <h3 className="text-xl font-black mb-6 text-black border-b-2 border-black pb-3">{t.commands.categories}</h3>
                            <ul className="space-y-2">
                                {filteredGroups.map((group, index) => (
                                    <li key={group.name}>
                                        <button
                                            className={`w-full text-left px-4 py-4 rounded-xl transition-all duration-300 flex items-center gap-3 group border-2 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] relative ${activeGroup === index
                                                ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                                : "bg-white text-black border-black hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                                }`}
                                            onClick={() => {
                                                setActiveGroup(index);
                                                setActiveCommand(0);
                                            }}
                                        >
                                            <span className="text-2xl">{group.icon}</span>
                                            <span className="flex-1">{group.name}</span>
                                            <span className="bg-black text-white px-2 py-1 rounded-lg text-sm font-black border border-black">
                                                {group.commands.length}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* MAIN CONTENT - COMMANDS */}
                    <div className="lg:w-3/4">
                        <div className="bg-white border-2 border-black rounded-2xl p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            {/* Note */}
                            <div className="bg-yellow-50 border-2 border-black rounded-xl p-4 mb-8 text-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                <p className="text-black font-black">
                                    {t.commands.note}
                                </p>
                            </div>

                            <h2 className="text-3xl font-black mb-8 flex items-center gap-4 text-black border-b-2 border-black pb-4">
                                <span className="text-3xl">{filteredGroups[activeGroup]?.icon}</span>
                                {filteredGroups[activeGroup]?.name} {t.commands.commands}
                            </h2>

                            {filteredGroups[activeGroup]?.commands.length > 0 ? (
                                <div className="space-y-8">
                                    {/* COMMAND LIST */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                        {filteredGroups[activeGroup]?.commands.map((command, index) => (
                                            <button
                                                key={command?.name}
                                                className={`text-left p-5 rounded-xl transition-all duration-300 group border-2 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] relative ${activeCommand === index
                                                    ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                                    : "bg-white text-black border-black hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                                    }`}
                                                onClick={() => setActiveCommand(index)}
                                            >
                                                <h3 className="font-black text-lg mb-2">{command?.name}</h3>
                                                <p className="text-gray-700 text-sm font-medium">{command?.description}</p>
                                                {/* Hover dot */}
                                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 border border-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            </button>
                                        ))}
                                    </div>

                                    {/* COMMAND DETAIL */}
                                    {filteredGroups[activeGroup]?.commands[activeCommand] && (
                                        <div className="bg-white border-2 border-black rounded-2xl p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                                            <div className="flex items-center justify-between mb-6">
                                                <h3 className="text-2xl font-black text-black">
                                                    {filteredGroups[activeGroup]?.commands[activeCommand].name}
                                                </h3>
                                                <button
                                                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ${copiedCommand === filteredGroups[activeGroup]?.commands[activeCommand].example
                                                        ? "bg-green-400 text-black hover:bg-green-500"
                                                        : "bg-cyan-400 text-black hover:bg-cyan-500"
                                                        } hover:translate-x-1 hover:translate-y-1 hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]`}
                                                    onClick={() => handleCopy(filteredGroups[activeGroup]?.commands[activeCommand].example || "")}
                                                >
                                                    {copiedCommand === filteredGroups[activeGroup]?.commands[activeCommand].example ? (
                                                        <CheckCircle size={18} />
                                                    ) : (
                                                        <Copy size={18} />
                                                    )}
                                                    {copiedCommand === filteredGroups[activeGroup]?.commands[activeCommand].example ? t.commands.commandDetails.copied : t.commands.commandDetails.copyExample}
                                                </button>
                                            </div>

                                            <p className="text-gray-700 mb-8 text-lg font-medium leading-relaxed">
                                                {filteredGroups[activeGroup]?.commands[activeCommand].description}
                                            </p>

                                            <div className="mb-8">
                                                <h4 className="font-black text-black mb-4 text-xl">{t.commands.commandDetails.usage}</h4>
                                                <div className="bg-black text-white p-4 rounded-xl font-mono text-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] overflow-x-auto">
                                                    {filteredGroups[activeGroup]?.commands[activeCommand].usage}
                                                </div>
                                            </div>

                                            {filteredGroups[activeGroup]?.commands[activeCommand].arguments.length > 0 && (
                                                <div className="mb-8">
                                                    <h4 className="font-black text-black mb-4 text-xl">{t.commands.commandDetails.arguments}</h4>
                                                    <div className="grid gap-4">
                                                        {filteredGroups[activeGroup]?.commands[activeCommand].arguments.map((arg, index) => (
                                                            <div key={index} className="bg-gray-50 border-2 border-black p-4 rounded-xl shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                                                                <div className="flex items-center gap-3 mb-2">
                                                                    <span className="font-black text-black text-lg">{arg.name}</span>
                                                                    <span className="bg-black text-white px-3 py-1 rounded-lg text-sm font-black border border-black">
                                                                        {arg.type}
                                                                    </span>
                                                                </div>
                                                                <p className="text-gray-700 font-medium">{arg.description}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div>
                                                <h4 className="font-black text-black mb-4 text-xl">{t.commands.commandDetails.example}</h4>
                                                <div className="bg-gray-100 border-2 border-black p-4 rounded-xl font-mono text-lg font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] overflow-x-auto">
                                                    {filteredGroups[activeGroup]?.commands[activeCommand].example}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <div className="text-6xl mb-6">{t.commands.noCommandsFound.icon}</div>
                                    <h3 className="text-2xl font-black mb-4 text-black">{t.commands.noCommandsFound.title}</h3>
                                    <p className="text-gray-700 font-medium text-lg">
                                        {t.commands.noCommandsFound.description}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DocumentationPage;