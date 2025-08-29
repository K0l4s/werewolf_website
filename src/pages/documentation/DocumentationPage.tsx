import { useState } from "react";
import mascot from "../../assets/images/mascot.png";

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
                arguments: [
                ],
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
                arguments: [
                ],
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
            ,
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
                arguments: [
                ],
                example: "/spirit information"
            },
            {
                name: "/hunt",
                description: "Hunt spirit soul from random spirit beast (1->99.999.999 years)!",
                usage: "/hunt",
                arguments: [
                ],
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
        ]
    },
];

const DocumentationPage = () => {
    const [activeGroup, setActiveGroup] = useState(0);
    const [activeCommand, setActiveCommand] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");

    // Filter commands based on search query
    const filteredGroups = commandGroups.map(group => ({
        ...group,
        commands: group.commands.filter(command =>
            command?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            command?.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(group => group.commands.length > 0);

    return (
        <div className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950 text-white">
            {/* HERO SECTION */}
            <section className="max-w-6xl mx-auto px-6 py-16">
                <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-1">
                        <div className="inline-flex items-center mb-4 px-4 py-2 rounded-full bg-violet-900/30 text-violet-300 text-sm border border-violet-700/50">
                            <span className="w-2 h-2 bg-violet-400 rounded-full mr-2 animate-pulse"></span>
                            Command Documentation
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-violet-300 to-violet-200 bg-clip-text text-transparent">
                            Werewolf Bot <br />
                            <span className="text-white">Commands Guide</span>
                        </h1>
                        <p className="text-zinc-300 text-lg max-w-xl mb-8">
                            Learn how to use all of Werewolf Bot's commands and features to enhance your Discord experience.
                        </p>

                        {/* SEARCH BAR */}
                        <div className="relative max-w-md mb-8">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-zinc-400" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                            <input
                                type="text"
                                placeholder="Search commands..."
                                className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex-1 flex justify-center relative">
                        <div className="relative">
                            <div className="absolute -inset-6 bg-violet-600/20 rounded-full blur-xl"></div>
                            <img
                                src={mascot}
                                alt="Werewolf Bot Mascot"
                                className="relative w-64 h-64 rounded-full bg-zinc-800 border-4 border-violet-500 shadow-2xl object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* COMMANDS SECTION */}
            <section className="max-w-6xl mx-auto px-6 py-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* SIDEBAR - COMMAND GROUPS */}
                    <div className="lg:w-1/4">
                        <div className="sticky top-24 bg-zinc-800/50 backdrop-blur-sm rounded-xl p-4 border border-zinc-700">
                            <h3 className="text-lg font-semibold mb-4 text-violet-300">Command Categories</h3>
                            <ul className="space-y-2">
                                {filteredGroups.map((group, index) => (
                                    <li key={group.name}>
                                        <button
                                            className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center gap-2 ${activeGroup === index
                                                ? "bg-violet-600 text-white"
                                                : "bg-zinc-700/50 hover:bg-zinc-700"
                                                }`}
                                            onClick={() => {
                                                setActiveGroup(index);
                                                setActiveCommand(0);
                                            }}
                                        >
                                            <span className="text-xl">{group.icon}</span>
                                            <span>{group.name}</span>
                                            <span className="ml-auto text-zinc-400 text-sm bg-zinc-800 px-2 py-1 rounded">
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

                        <div className="bg-zinc-800/50 backdrop-blur-sm rounded-xl p-6 border border-zinc-700">
                            <p className="text-gray-400 font-bold mb-6 text-center">Note:  You can use prefix command instead of splash command. Default: w[command]</p>

                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <span className="text-2xl">{filteredGroups[activeGroup]?.icon}</span>
                                {filteredGroups[activeGroup]?.name} Commands
                            </h2>

                            {filteredGroups[activeGroup]?.commands.length > 0 ? (
                                <div className="space-y-6">
                                    {/* COMMAND LIST */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                        {filteredGroups[activeGroup]?.commands.map((command, index) => (
                                            <button
                                                key={command?.name}
                                                className={`text-left p-4 rounded-lg transition-colors ${activeCommand === index
                                                    ? "bg-violet-600/30 border border-violet-500"
                                                    : "bg-zinc-700/30 hover:bg-zinc-700 border border-zinc-700"
                                                    }`}
                                                onClick={() => setActiveCommand(index)}
                                            >
                                                <h3 className="font-semibold text-violet-300">{command?.name}</h3>
                                                <p className="text-sm text-zinc-400 mt-1">{command?.description}</p>
                                            </button>
                                        ))}
                                    </div>

                                    {/* COMMAND DETAIL */}
                                    {filteredGroups[activeGroup]?.commands[activeCommand] && (
                                        <div className="bg-zinc-900/80 rounded-xl p-6 border border-zinc-700">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-xl font-bold text-violet-300">
                                                    {filteredGroups[activeGroup]?.commands[activeCommand].name}
                                                </h3>
                                                <button
                                                    className="px-3 py-1 bg-violet-600 hover:bg-violet-700 rounded text-sm"
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(
                                                            (filteredGroups as any)?.[activeGroup]?.commands[activeCommand].example ?? ""
                                                        );
                                                    }}
                                                >
                                                    Copy Example
                                                </button>

                                            </div>

                                            <p className="text-zinc-300 mb-6">
                                                {filteredGroups[activeGroup]?.commands[activeCommand].description}
                                            </p>

                                            <div className="mb-6">
                                                <h4 className="font-semibold text-zinc-200 mb-2">Usage</h4>
                                                <div className="bg-zinc-800 p-4 rounded-lg font-mono text-sm">
                                                    {filteredGroups[activeGroup]?.commands[activeCommand].usage}
                                                </div>
                                            </div>

                                            {filteredGroups[activeGroup]?.commands[activeCommand].arguments.length > 0 && (
                                                <div className="mb-6">
                                                    <h4 className="font-semibold text-zinc-200 mb-2">Arguments</h4>
                                                    <div className="space-y-3">
                                                        {filteredGroups[activeGroup]?.commands[activeCommand].arguments.map((arg, index) => (
                                                            <div key={index} className="bg-zinc-800/50 p-3 rounded-lg">
                                                                <div className="flex items-center gap-2 mb-1">
                                                                    <span className="font-semibold text-violet-300">{arg.name}</span>
                                                                    <span className="text-xs bg-zinc-700 px-2 py-1 rounded">{arg.type}</span>
                                                                </div>
                                                                <p className="text-sm text-zinc-400">{arg.description}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div>
                                                <h4 className="font-semibold text-zinc-200 mb-2">Example</h4>
                                                <div className="bg-zinc-800 p-4 rounded-lg font-mono text-sm">
                                                    {filteredGroups[activeGroup]?.commands[activeCommand].example}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-10">
                                    <div className="text-5xl mb-4">🔍</div>
                                    <h3 className="text-xl font-semibold mb-2">No commands found</h3>
                                    <p className="text-zinc-400">
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