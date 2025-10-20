import { useState } from 'react';
import { ChevronRight, Users, GamepadIcon, Clock, AlertTriangle, CheckCircle, Moon, Crown, Shield, Swords } from 'lucide-react';

const WerewolfGuide = () => {
    const [activeSection, setActiveSection] = useState('commands');

    const commands = [
        {
            command: 'Wnew',
            description: 'Create a new game room',
            usage: 'Use when you want to start a new game session',
            example: 'Wnew',
            important: true
        },
        {
            command: 'Wjoin',
            description: 'Join the current game room',
            usage: 'Use after someone has created a room with Wnew',
            example: 'Wjoin',
            important: true
        },
        {
            command: 'Wleave',
            description: 'Leave the game room',
            usage: 'Use when you want to exit the game before it starts',
            example: 'Wleave',
            important: false
        },
        {
            command: 'Wstart',
            description: 'Start the game',
            usage: 'Use when enough players have joined',
            example: 'Wstart',
            important: true
        }
    ];

    const gameFlow = [
        {
            phase: 'SETUP PHASE',
            steps: [
                'Game master or any player uses **Wnew** to create a new room',
                'Other players use **Wjoin** to join the game',
                'When enough players have joined, use **Wstart** to begin the game'
            ]
        },
        {
            phase: 'NIGHT - DAY CYCLE',
            steps: [
                '🔴 **Night Phase**: Special roles (Werewolves, Seer, Bodyguard...) perform their actions',
                '🟢 **Day Phase**: All players discuss and vote to eliminate someone',
                'Game automatically progresses when all actions are completed'
            ]
        },
        {
            phase: 'END GAME',
            steps: [
                'Villagers win when all Werewolves are eliminated',
                'Werewolves win when their numbers equal or exceed the Villagers',
                'Use **Wnew** to create a new game after completion'
            ]
        }
    ];

    const tips = [
        'Perform actions SLOWLY and ONE PLAYER AT A TIME',
        'Wait for bot confirmation before the next player takes action',
        'Avoid spamming commands to prevent game errors',
        'Follow bot instructions carefully in each phase',
        'If errors occur, use Wnew to create a new game',
        'Be patient during role assignments and phase transitions',
        'Pay attention to private messages from the bot for your role instructions'
    ];

    const roleExamples = [
        {
            role: 'Werewolf',
            team: 'Werewolves',
            description: 'Kill one villager each night. Work with other werewolves to eliminate villagers.',
            nightAction: 'Choose one player to eliminate',
            icon: '🐺',
            color: 'bg-red-400'
        },
        {
            role: 'Seer',
            team: 'Villagers',
            description: 'Can check one player\'s role each night to determine if they are werewolf or not.',
            nightAction: 'Investigate one player\'s alignment',
            icon: '🔮',
            color: 'bg-purple-400'
        },
        {
            role: 'Villager',
            team: 'Villagers',
            description: 'No special abilities. Use discussion and voting to find werewolves.',
            nightAction: 'No action',
            icon: '👨‍🌾',
            color: 'bg-green-400'
        },
        {
            role: 'Bodyguard',
            team: 'Villagers',
            description: 'Can protect one player each night from werewolf attacks.',
            nightAction: 'Protect one player',
            icon: '🛡️',
            color: 'bg-blue-400'
        }
    ];

    const navItems = [
        { id: 'commands', label: 'Commands', icon: GamepadIcon },
        { id: 'flow', label: 'Game Flow', icon: Clock },
        { id: 'roles', label: 'Roles', icon: Users },
        { id: 'tips', label: 'Tips', icon: AlertTriangle }
    ];

    return (
        <div className="min-h-screen  py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="relative bg-white border-3 border-black rounded-2xl shadow-brutal-lg p-8 md:p-12 mb-8">
                        <div className="absolute top-4 left-4 w-6 h-6 bg-red-400 border-2 border-black rounded-full"></div>
                        <div className="absolute top-4 right-4 w-4 h-4 bg-orange-400 border-2 border-black rotate-45"></div>
                        <div className="absolute bottom-4 left-4 w-5 h-5 bg-yellow-400 border-2 border-black rounded-sm"></div>
                        <div className="absolute bottom-4 right-4 w-3 h-3 bg-green-400 border-2 border-black rounded-full"></div>
                        
                        <h1 className="text-5xl md:text-6xl font-black text-black mb-4">
                            Werewolf Game Guide
                        </h1>
                        <p className="text-xl text-gray-700 font-medium max-w-2xl mx-auto">
                            Complete guide to playing Werewolf on Discord server
                        </p>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={`
                                relative group flex items-center gap-2 px-6 py-3 font-black border-3 border-black rounded-xl
                                transition-all duration-300 hover:translate-x-1 hover:translate-y-1
                                ${activeSection === item.id 
                                    ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-black shadow-brutal' 
                                    : 'bg-white text-black shadow-brutal hover:bg-gray-50'
                                }
                            `}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                            {activeSection === item.id && (
                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-cyan-400 border border-black rounded-full"></div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Commands Section */}
                {activeSection === 'commands' && (
                    <div className="space-y-8">
                        <h2 className="text-4xl font-black text-center mb-8 text-black">
                            📋 Command List
                        </h2>
                        
                        <div className="grid gap-6 md:grid-cols-2">
                            {commands.map((cmd, index) => (
                                <div 
                                    key={index}
                                    className={`
                                        relative group bg-white border-3 rounded-2xl p-6 shadow-brutal
                                        transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg
                                        ${cmd.important ? 'border-red-500' : 'border-black'}
                                    `}
                                >
                                    {/* Background gradient for important cards */}
                                    {cmd.important && (
                                        <div className="absolute top-2 left-2 right-2 bottom-2 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl -z-10"></div>
                                    )}
                                    
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            {cmd.important && (
                                                <div className="w-3 h-3 bg-red-400 border-2 border-black rounded-full animate-pulse"></div>
                                            )}
                                            <code className="text-xl font-black text-white bg-black px-3 py-1 rounded-lg shadow-brutal-sm">
                                                {cmd.command}
                                            </code>
                                        </div>
                                        {cmd.important && (
                                            <span className="bg-red-400 border-2 border-black text-white px-3 py-1 rounded-full text-xs font-black shadow-brutal-xs">
                                                IMPORTANT
                                            </span>
                                        )}
                                    </div>
                                    
                                    <p className="text-gray-700 mb-4 leading-relaxed font-medium">
                                        {cmd.description}
                                    </p>
                                    
                                    <div className="space-y-3">
                                        <div>
                                            <span className="text-black font-black">Usage:</span>
                                            <p className="text-gray-700 ml-2 font-medium">{cmd.usage}</p>
                                        </div>
                                        <div>
                                            <span className="text-black font-black">Example:</span>
                                            <code className="block bg-gray-100 border-2 border-black text-gray-800 px-3 py-2 rounded-lg mt-1 font-mono font-bold shadow-brutal-xs">
                                                {cmd.example}
                                            </code>
                                        </div>
                                    </div>

                                    {/* Hover decoration */}
                                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 border-2 border-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            ))}
                        </div>

                        {/* Command Sequence Guide */}
                        <div className="relative bg-white border-3 border-black rounded-2xl p-8 shadow-brutal-lg">
                            <div className="absolute top-3 left-3 right-3 bottom-3 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl -z-10"></div>
                            
                            <h3 className="text-3xl font-black text-center mb-8 text-black">
                                🎯 Command Execution Sequence
                            </h3>
                            <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center">
                                {[
                                    { step: '1️⃣', command: 'Wnew', desc: 'Create new room' },
                                    { step: '2️⃣', command: 'Wjoin', desc: 'Join game' },
                                    { step: '3️⃣', command: 'Wstart', desc: 'Start game' }
                                ].map((item, index) => (
                                    <div key={index} className="flex-1">
                                        <div className="text-4xl mb-3">{item.step}</div>
                                        <code className="text-2xl font-black text-white bg-black px-4 py-2 rounded-xl shadow-brutal">
                                            {item.command}
                                        </code>
                                        <p className="text-gray-700 mt-2 font-black">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-6 p-4 bg-yellow-50 border-2 border-black rounded-xl shadow-brutal-sm">
                                <h4 className="text-xl font-black text-black mb-3">⚠️ Important Note:</h4>
                                <p className="text-gray-700 font-medium">
                                    After finishing a game, you must use <code className="bg-gray-100 border border-black px-2 py-1 rounded font-mono font-bold">Wnew</code> again to create a new game session. 
                                    The previous room becomes inactive once the game ends.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Game Flow Section */}
                {activeSection === 'flow' && (
                    <div className="space-y-8">
                        <h2 className="text-4xl font-black text-center mb-8 text-black">
                            🔄 Game Flow
                        </h2>
                        
                        {gameFlow.map((phase, index) => (
                            <div key={index} className="relative bg-white border-3 border-black rounded-2xl p-6 shadow-brutal">
                                <div className="absolute top-2 left-2 right-2 bottom-2 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl -z-10"></div>
                                
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 border-2 border-black rounded-full flex items-center justify-center font-black text-white shadow-brutal-sm">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-2xl font-black text-black">
                                        {phase.phase}
                                    </h3>
                                </div>
                                
                                <div className="space-y-4">
                                    {phase.steps.map((step, stepIndex) => (
                                        <div key={stepIndex} className="flex items-start gap-4">
                                            <div className="bg-white border-2 border-black rounded-lg p-2 shadow-brutal-xs flex-shrink-0">
                                                <ChevronRight size={16} className="text-black" />
                                            </div>
                                            <p className="text-gray-700 leading-relaxed font-medium">
                                                {step}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Day/Night Cycle */}
                        <div className="relative bg-white border-3 border-black rounded-2xl p-8 shadow-brutal-lg">
                            <div className="absolute top-3 left-3 right-3 bottom-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl -z-10"></div>
                            
                            <h3 className="text-3xl font-black text-center mb-8 text-black">
                                🌙🌞 Day & Night Cycle
                            </h3>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="text-center">
                                    <div className="text-5xl mb-4">🌙</div>
                                    <h4 className="text-2xl font-black text-red-600 mb-4 border-2 border-red-400 bg-red-50 px-4 py-2 rounded-xl shadow-brutal-sm">NIGHT PHASE</h4>
                                    <ul className="text-gray-700 space-y-3 text-left font-medium">
                                        <li className="flex items-center gap-2">• <Swords size={16} className="text-red-600" /> Werewolves choose target</li>
                                        <li className="flex items-center gap-2">• <Moon size={16} className="text-purple-600" /> Seer investigates players</li>
                                        <li className="flex items-center gap-2">• <Shield size={16} className="text-blue-600" /> Bodyguard protects players</li>
                                        <li className="flex items-center gap-2">• <Crown size={16} className="text-yellow-600" /> Other special roles act</li>
                                        <li className="flex items-center gap-2">• ⏰ Actions happen ONE AT A TIME</li>
                                    </ul>
                                </div>
                                <div className="text-center">
                                    <div className="text-5xl mb-4">🌞</div>
                                    <h4 className="text-2xl font-black text-green-600 mb-4 border-2 border-green-400 bg-green-50 px-4 py-2 rounded-xl shadow-brutal-sm">DAY PHASE</h4>
                                    <ul className="text-gray-700 space-y-3 text-left font-medium">
                                        <li className="flex items-center gap-2">• 💬 Public discussion</li>
                                        <li className="flex items-center gap-2">• 🗳️ Vote to eliminate someone</li>
                                        <li className="flex items-center gap-2">• 📢 Announce voting results</li>
                                        <li className="flex items-center gap-2">• 🚪 Eliminated player leaves</li>
                                        <li className="flex items-center gap-2">• ✅ Majority vote decides</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Roles Section */}
                {activeSection === 'roles' && (
                    <div className="space-y-8">
                        <h2 className="text-4xl font-black text-center mb-8 text-black">
                            👥 Game Roles
                        </h2>
                        
                        <div className="grid gap-6 md:grid-cols-2">
                            {roleExamples.map((role, index) => (
                                <div 
                                    key={index}
                                    className="relative group bg-white border-3 border-black rounded-2xl p-6 shadow-brutal transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg"
                                >
                                    <div className="absolute top-2 left-2 right-2 bottom-2 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl -z-10"></div>
                                    
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl">{role.icon}</span>
                                            <h3 className="text-xl font-black text-black">
                                                {role.role}
                                            </h3>
                                        </div>
                                        <span className={`
                                            border-2 border-black px-3 py-1 rounded-full text-xs font-black shadow-brutal-xs
                                            ${role.team === 'Werewolves' ? 'bg-red-400 text-black' : 'bg-green-400 text-black'}
                                        `}>
                                            {role.team}
                                        </span>
                                    </div>
                                    
                                    <p className="text-gray-700 mb-4 leading-relaxed font-medium">
                                        {role.description}
                                    </p>
                                    
                                    <div className="bg-gray-50 border-2 border-black rounded-lg p-4 shadow-brutal-xs">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Moon size={18} className="text-blue-600" />
                                            <span className="text-blue-600 font-black">Night Action:</span>
                                        </div>
                                        <p className="text-gray-700 text-sm font-medium">
                                            {role.nightAction}
                                        </p>
                                    </div>

                                    {/* Role color accent */}
                                    <div className={`absolute top-4 right-4 w-3 h-3 ${role.color} border-2 border-black rounded-full`}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tips Section */}
                {activeSection === 'tips' && (
                    <div className="space-y-6">
                        <h2 className="text-4xl font-black text-center mb-8 text-black">
                            ⚠️ Important Tips & Best Practices
                        </h2>
                        
                        <div className="grid gap-4">
                            {tips.map((tip, index) => (
                                <div 
                                    key={index}
                                    className="relative group bg-white border-2 border-black rounded-xl p-4 shadow-brutal-sm transition-all duration-300 hover:translate-x-1 hover:shadow-brutal"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="bg-green-400 border-2 border-black rounded-lg p-2 shadow-brutal-xs flex-shrink-0">
                                            <CheckCircle size={16} className="text-black" />
                                        </div>
                                        <p className="text-gray-700 leading-relaxed font-medium flex-1">
                                            {tip}
                                        </p>
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 border border-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            ))}
                        </div>

                        {/* Critical Warning */}
                        <div className="relative bg-white border-3 border-red-500 rounded-2xl p-6 shadow-brutal-lg">
                            <div className="absolute top-2 left-2 right-2 bottom-2 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-xl -z-10"></div>
                            
                            <div className="flex items-center gap-3 mb-4">
                                <AlertTriangle className="text-red-600" size={24} />
                                <h3 className="text-2xl font-black text-red-600">
                                    CRITICAL: Avoid Game Errors
                                </h3>
                            </div>
                            <div className="grid gap-3 text-gray-700 font-medium">
                                <div className="flex items-center gap-2">🚫 <strong>DO NOT spam commands</strong> - wait for bot responses</div>
                                <div className="flex items-center gap-2">🚫 <strong>DO NOT perform actions simultaneously</strong> - go one by one</div>
                                <div className="flex items-center gap-2">🚫 <strong>DO NOT ignore bot instructions</strong> - follow the sequence</div>
                                <div className="flex items-center gap-2">✅ <strong>DO wait for your turn</strong> during night phases</div>
                                <div className="flex items-center gap-2">✅ <strong>DO use Wnew</strong> to reset if game gets stuck</div>
                                <div className="flex items-center gap-2">✅ <strong>DO be patient</strong> during role assignments</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WerewolfGuide;