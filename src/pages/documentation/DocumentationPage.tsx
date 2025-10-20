import { useState } from "react";
import mascot from "../../assets/images/mascot.png";
import { Search, Copy, CheckCircle } from "lucide-react";

const commandGroups = [
    {
        name: "Economy",
        icon: "💰",
        commands: [
            {
                name: "/donate",
                description: "Buy me a coffee ☕!",
                usage: "/donate",
                arguments: [],
                example: "/donate"
            },
            {
                name: "/wallet",
                description: "Check your current coin balance",
                usage: "/wallet",
                arguments: [],
                example: "/wallet"
            },
            {
                name: "/daily",
                description: "Claim your daily coins reward",
                usage: "/daily",
                arguments: [],
                example: "/daily"
            },
            {
                name: "/give",
                description: "Transfer coins to another user",
                usage: "/give <user: @username> <amount: number>",
                arguments: [
                    {
                        name: "user",
                        type: "Mention (required)",
                        description: "The user you want to send coins to"
                    },
                    {
                        name: "amount",
                        type: "Number (required)",
                        description: "The number of coins to transfer"
                    }
                ],
                example: "/give @Kolas 100"
            },
            {
                name: "/shop",
                description: "See information in shop!",
                usage: "/shop",
                arguments: [],
                example: "/shop"
            },
            {
                name: "/buy",
                description: "Buy item in shop!",
                usage: "/buy <itemRef:String> <quantity:Number>",
                arguments: [
                    {
                        name: "itemRef",
                        type: "String (required)",
                        description: "The item Ref"
                    },
                    {
                        name: "quantity",
                        type: "Number",
                        description: "The quantity of items want to buy."
                    }
                ],
                example: "/buy SPI1 5"
            },
            {
                name: "/sell",
                description: "See item for shop!",
                usage: "/sell <itemRef:String> <quantity:Number>",
                arguments: [
                    {
                        name: "itemRef",
                        type: "String (required)",
                        description: "The item Ref"
                    },
                    {
                        name: "quantity",
                        type: "Number",
                        description: "The quantity of items want to sell."
                    }
                ],
                example: "/sell SPI1 5"
            },
        ]
    },
    {
        name: "Streak",
        icon: "🔥",
        commands: [
            {
                name: "wset streak",
                description: "Set your streak",
                usage: "wset streak [streak:number]",
                arguments: [
                    {
                        name: "streak value",
                        type: "String (required)",
                        description: "The value of streak to set"
                    }
                ],
                example: "wset streak on"
            },
        ]
    },
    {
        name: "Mini Games",
        icon: "🎮",
        commands: [
            {
                name: "/baucua",
                description: "Tranditional Vietnam games in Tet Holiday!",
                usage: "/baucua [bet:number]",
                arguments: [
                    {
                        name: "bet",
                        type: "Number (required)",
                        description: "The amount of coins to wager"
                    }
                ],
                example: "/baucua 5000"
            },
            {
                name: "/jackpot",
                description: "Jackpot games",
                usage: "/jackpot [bet: number]",
                arguments: [
                    {
                        name: "bet",
                        type: "Number (required)",
                        description: "The amount of coins to wager"
                    }
                ],
                example: "/jackpot 30"
            },
            {
                name: "/keoco",
                description: "Physical games",
                usage: "/keoco [bet: number]",
                arguments: [
                    {
                        name: "bet",
                        type: "Number (required)",
                        description: "The amount of coins to wager"
                    }
                ],
                example: "/keoco 30"
            },
            {
                name: "/keobuabao",
                description: "One Two Three games",
                usage: "/keobuabao [bet: number]",
                arguments: [
                    {
                        name: "bet",
                        type: "Number (required)",
                        description: "The amount of coins to wager"
                    }
                ],
                example: "/keobuabao 30"
            },
            {
                name: "/baicao",
                description: "The card games",
                usage: "/baicao [bet: number]",
                arguments: [
                    {
                        name: "bet",
                        type: "Number (required)",
                        description: "The amount of coins to wager"
                    }
                ],
                example: "/baicao 30"
            }
        ]
    },
    {
        name: "Soul Land",
        icon: "🌌",
        commands: [
            {
                name: "/awake",
                description: "Awake random spirit!",
                usage: "/awake",
                arguments: [],
                example: "/awake"
            },
            {
                name: "/spirit information",
                description: "See your Spirit!",
                usage: "/spirit information",
                arguments: [],
                example: "/spirit information"
            },
            {
                name: "/hunt",
                description: "Hunt spirit soul from random spirit beast (1->99.999.999 years)!",
                usage: "/hunt",
                arguments: [],
                example: "/hunt"
            },
            {
                name: "/spirit attach",
                description: "Attach Spirit Soul to your Spirit",
                usage: "/soulland attach [spiritRef: String] [ringRef: String]",
                arguments: [
                    {
                        name: "spiritRef",
                        type: "String (require)",
                        description: "Spirit ref"
                    },
                    {
                        name: "ringRef",
                        type: "String (require)",
                        description: "Ring ref"
                    }
                ],
                example: "/spirit attach LNT1 DKW21SDX"
            }, {
                name: "/battle  ",
                description: "Battle with other Spirit Master!",
                usage: "/battle <user: @mention>",
                arguments: [
                    {
                        name: "user",
                        type: "Mention (optional)",
                        description: "The user whose you want to send battle invtite!"
                    }
                ],
                example: "/battle @WerewolfBot"
            }
        ]
    },
    {
        name: "Werewolf",
        icon: "🐺",
        commands: [
            {
                name: "/new",
                description: "Create a new Werewolf game",
                usage: "/new",
                arguments: [],
                example: "/new"
            },
            {
                name: "/join",
                description: "Join an existing Werewolf game",
                usage: "/join",
                arguments: [],
                example: "/join"
            },
            {
                name: "/start",
                description: "Start the Werewolf game",
                usage: "/start",
                arguments: [],
                example: "/start"
            }
        ]
    }, {
        name: "Systems",
        icon: "⚙️",
        commands: [
            {
                name: "/set prefix",
                description: "[Admin - Manager] Set default prefix of the server!",
                usage: "/set prefix <custom prefix: String>",
                arguments: [
                    {
                        name: "custom prefix",
                        type: "String (required)",
                        description: "Custom prefix want to change in the server. Default is w"
                    }
                ],
                example: "/set prefix w"
            },
            {
                name: "/set lang",
                description: "[Admin - Manager] Set default language of the server!",
                usage: "/set lang <lang: String>",
                arguments: [
                    {
                        name: "lang",
                        type: "Enum: [en,vi] (required)",
                        description: "Language want to change in the server. Default is en"
                    }
                ],
                example: "/set lang en"
            },
            {
                name: "/set voice",
                description: "[Admin - Manager] Set default voice channel of the server!",
                usage: "/set voice true|false",
                arguments: [
                    {
                        name: "enabled",
                        type: "Boolean (required)",
                        description: "Whether to enable or disable join voice notifications for the voice channel. Default is false"
                    }
                ],
                example: "/set voice true"
            },
            {
                name: "/set embed",
                description: "[Admin - Manager] Set default embed messages of the server!",
                usage: "/set embed true|false",
                arguments: [
                    {
                        name: "enabled",
                        type: "Boolean (required)",
                        description: "Whether to enable or disable embed (for voice join notification) messages for the server. Default is false"
                    }
                ],
                example: "/set embed true"
            },
            {
                name: "/set streak",
                description: "[Admin - Manager] Set default streak messages of the server!",
                usage: "/set streak on|off",
                arguments: [
                    {
                        name: "on|off",
                        type: "String (required)",
                        description: "Whether to enable or disable streak messages for the server. Default is off"
                    }
                ],
                example: "/set streak on"
            },
        ]
    },
];

const DocumentationPage = () => {
    const [activeGroup, setActiveGroup] = useState(0);
    const [activeCommand, setActiveCommand] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [copiedCommand, setCopiedCommand] = useState("");

    // Filter commands based on search query
    const filteredGroups = commandGroups.map(group => ({
        ...group,
        commands: group.commands.filter(command =>
            command?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            command?.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(group => group.commands.length > 0);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedCommand(text);
        setTimeout(() => setCopiedCommand(""), 2000);
    };

    return (
        <div className="min-h-screen overflow-x-hidden">
            {/* HERO SECTION */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1">
                        <div className="inline-flex items-center mb-4 px-4 py-2 rounded-full bg-cyan-100 border-2 border-black text-black text-sm font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <span className="w-2 h-2 bg-cyan-400 border border-black rounded-full mr-2 animate-pulse"></span>
                            Command Documentation
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black mb-6 text-black">
                            Keldo Bot <br />
                            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Commands Guide</span>
                        </h1>
                        <p className="text-gray-700 text-lg max-w-xl mb-8 font-medium">
                            Learn how to use all of Keldo Bot's commands and features to enhance your Discord experience.
                        </p>

                        {/* SEARCH BAR */}
                        <div className="relative max-w-md mb-8">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Search size={20} className="text-gray-600" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search commands..."
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
                            <h3 className="text-xl font-black mb-6 text-black border-b-2 border-black pb-3">Command Categories</h3>
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
                                    💡 Note: You can use prefix command instead of slash command. Default: w[command]
                                </p>
                            </div>

                            <h2 className="text-3xl font-black mb-8 flex items-center gap-4 text-black border-b-2 border-black pb-4">
                                <span className="text-3xl">{filteredGroups[activeGroup]?.icon}</span>
                                {filteredGroups[activeGroup]?.name} Commands
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
                                                    {copiedCommand === filteredGroups[activeGroup]?.commands[activeCommand].example ? "Copied!" : "Copy Example"}
                                                </button>
                                            </div>

                                            <p className="text-gray-700 mb-8 text-lg font-medium leading-relaxed">
                                                {filteredGroups[activeGroup]?.commands[activeCommand].description}
                                            </p>

                                            <div className="mb-8">
                                                <h4 className="font-black text-black mb-4 text-xl">Usage</h4>
                                                <div className="bg-black text-white p-4 rounded-xl font-mono text-lg border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] overflow-x-auto">
                                                    {filteredGroups[activeGroup]?.commands[activeCommand].usage}
                                                </div>
                                            </div>

                                            {filteredGroups[activeGroup]?.commands[activeCommand].arguments.length > 0 && (
                                                <div className="mb-8">
                                                    <h4 className="font-black text-black mb-4 text-xl">Arguments</h4>
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
                                                <h4 className="font-black text-black mb-4 text-xl">Example</h4>
                                                <div className="bg-gray-100 border-2 border-black p-4 rounded-xl font-mono text-lg font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] overflow-x-auto">
                                                    {filteredGroups[activeGroup]?.commands[activeCommand].example}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <div className="text-6xl mb-6">🔍</div>
                                    <h3 className="text-2xl font-black mb-4 text-black">No commands found</h3>
                                    <p className="text-gray-700 font-medium text-lg">
                                        Try a different search term or browse through other categories.
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