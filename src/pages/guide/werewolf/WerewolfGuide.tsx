import  { useState } from 'react';
import { ChevronRight, Users, GamepadIcon, Clock, AlertTriangle, CheckCircle, Moon } from 'lucide-react';

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
            nightAction: 'Choose one player to eliminate'
        },
        {
            role: 'Seer',
            team: 'Villagers',
            description: 'Can check one player\'s role each night to determine if they are werewolf or not.',
            nightAction: 'Investigate one player\'s alignment'
        },
        {
            role: 'Villager',
            team: 'Villagers',
            description: 'No special abilities. Use discussion and voting to find werewolves.',
            nightAction: 'No action'
        },
        {
            role: 'Bodyguard',
            team: 'Villagers',
            description: 'Can protect one player each night from werewolf attacks.',
            nightAction: 'Protect one player'
        }
    ];

    return (
        <div className="min-h-screen text-white py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-4">
                        Werewolf Game Guide
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Complete guide to playing Werewolf on Discord server
                    </p>
                </div>

                {/* Navigation */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    <button
                        onClick={() => setActiveSection('commands')}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                            activeSection === 'commands' 
                                ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg' 
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                    >
                        <GamepadIcon size={20} />
                        Commands
                    </button>
                    <button
                        onClick={() => setActiveSection('flow')}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                            activeSection === 'flow' 
                                ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg' 
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                    >
                        <Clock size={20} />
                        Game Flow
                    </button>
                    <button
                        onClick={() => setActiveSection('roles')}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                            activeSection === 'roles' 
                                ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg' 
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                    >
                        <Users size={20} />
                        Roles
                    </button>
                    <button
                        onClick={() => setActiveSection('tips')}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                            activeSection === 'tips' 
                                ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg' 
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                    >
                        <AlertTriangle size={20} />
                        Important Tips
                    </button>
                </div>

                {/* Commands Section */}
                {activeSection === 'commands' && (
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-center mb-8 text-yellow-400">
                            📋 Command List
                        </h2>
                        
                        <div className="grid gap-6 md:grid-cols-2">
                            {commands.map((cmd, index) => (
                                <div 
                                    key={index}
                                    className={`bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border-2 transition-all duration-300 hover:scale-105 ${
                                        cmd.important 
                                            ? 'border-yellow-500/50 hover:border-yellow-400' 
                                            : 'border-gray-700/50 hover:border-gray-600'
                                    }`}
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            {cmd.important && (
                                                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                                            )}
                                            <code className="text-xl font-bold text-yellow-400 bg-gray-900 px-3 py-1 rounded-lg">
                                                {cmd.command}
                                            </code>
                                        </div>
                                        {cmd.important && (
                                            <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                                                IMPORTANT
                                            </span>
                                        )}
                                    </div>
                                    
                                    <p className="text-gray-300 mb-3 leading-relaxed">
                                        {cmd.description}
                                    </p>
                                    
                                    <div className="space-y-2">
                                        <div>
                                            <span className="text-yellow-400 font-semibold">Usage:</span>
                                            <p className="text-gray-300 ml-2">{cmd.usage}</p>
                                        </div>
                                        <div>
                                            <span className="text-yellow-400 font-semibold">Example:</span>
                                            <code className="block bg-gray-900 text-green-400 px-3 py-2 rounded-lg mt-1 font-mono">
                                                {cmd.example}
                                            </code>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Command Sequence Guide */}
                        <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-2xl p-6 mt-8 border border-red-500/30">
                            <h3 className="text-2xl font-bold text-center mb-6 text-yellow-400">
                                🎯 Command Execution Sequence
                            </h3>
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center">
                                <div className="flex-1">
                                    <div className="text-3xl mb-2">1️⃣</div>
                                    <code className="text-lg font-bold text-yellow-400 bg-gray-900 px-4 py-2 rounded-lg">
                                        Wnew
                                    </code>
                                    <p className="text-gray-300 mt-2">Create new room</p>
                                </div>
                                <ChevronRight className="text-yellow-400 mx-4 hidden md:block" size={32} />
                                <div className="flex-1">
                                    <div className="text-3xl mb-2">2️⃣</div>
                                    <code className="text-lg font-bold text-yellow-400 bg-gray-900 px-4 py-2 rounded-lg">
                                        Wjoin
                                    </code>
                                    <p className="text-gray-300 mt-2">Join game</p>
                                </div>
                                <ChevronRight className="text-yellow-400 mx-4 hidden md:block" size={32} />
                                <div className="flex-1">
                                    <div className="text-3xl mb-2">3️⃣</div>
                                    <code className="text-lg font-bold text-yellow-400 bg-gray-900 px-4 py-2 rounded-lg">
                                        Wstart
                                    </code>
                                    <p className="text-gray-300 mt-2">Start game</p>
                                </div>
                            </div>
                            
                            <div className="mt-6 p-4 bg-gray-900/50 rounded-lg">
                                <h4 className="text-lg font-semibold text-yellow-400 mb-2">⚠️ Important Note:</h4>
                                <p className="text-gray-300">
                                    After finishing a game, you must use <code className="text-yellow-400">Wnew</code> again to create a new game session. 
                                    The previous room becomes inactive once the game ends.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Game Flow Section */}
                {activeSection === 'flow' && (
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-center mb-8 text-yellow-400">
                            🔄 Game Flow
                        </h2>
                        
                        {gameFlow.map((phase, index) => (
                            <div key={index} className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border-2 border-gray-700/50">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center font-bold text-white">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-2xl font-bold text-yellow-400">
                                        {phase.phase}
                                    </h3>
                                </div>
                                
                                <div className="space-y-3">
                                    {phase.steps.map((step, stepIndex) => (
                                        <div key={stepIndex} className="flex items-start gap-3">
                                            <ChevronRight className="text-green-400 mt-1 flex-shrink-0" size={20} />
                                            <p className="text-gray-300 leading-relaxed">
                                                {step}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {/* Day/Night Cycle */}
                        <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-6 border border-purple-500/30">
                            <h3 className="text-2xl font-bold text-center mb-6 text-yellow-400">
                                🌙🌞 Day & Night Cycle
                            </h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="text-center">
                                    <div className="text-4xl mb-4">🌙</div>
                                    <h4 className="text-xl font-bold text-red-400 mb-3">NIGHT PHASE</h4>
                                    <ul className="text-gray-300 space-y-2 text-left">
                                        <li>• Werewolves choose target</li>
                                        <li>• Seer investigates players</li>
                                        <li>• Bodyguard protects players</li>
                                        <li>• Other special roles perform actions</li>
                                        <li>• Actions happen ONE AT A TIME</li>
                                    </ul>
                                </div>
                                <div className="text-center">
                                    <div className="text-4xl mb-4">🌞</div>
                                    <h4 className="text-xl font-bold text-green-400 mb-3">DAY PHASE</h4>
                                    <ul className="text-gray-300 space-y-2 text-left">
                                        <li>• Public discussion</li>
                                        <li>• Vote to eliminate someone</li>
                                        <li>• Announce voting results</li>
                                        <li>• Eliminated player leaves game</li>
                                        <li>• Majority vote decides</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Roles Section */}
                {activeSection === 'roles' && (
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-center mb-8 text-yellow-400">
                            👥 Game Roles
                        </h2>
                        
                        <div className="grid gap-6 md:grid-cols-2">
                            {roleExamples.map((role, index) => (
                                <div 
                                    key={index}
                                    className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border-2 border-gray-700/50 hover:border-yellow-500/30 transition-all duration-300"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold text-yellow-400">
                                            {role.role}
                                        </h3>
                                        <span className={`text-xs px-2 py-1 rounded-full ${
                                            role.team === 'Werewolves' 
                                                ? 'bg-red-500 text-white' 
                                                : 'bg-green-500 text-white'
                                        }`}>
                                            {role.team}
                                        </span>
                                    </div>
                                    
                                    <p className="text-gray-300 mb-4 leading-relaxed">
                                        {role.description}
                                    </p>
                                    
                                    <div className="bg-gray-900/50 rounded-lg p-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Moon size={16} className="text-blue-400" />
                                            <span className="text-blue-400 font-semibold">Night Action:</span>
                                        </div>
                                        <p className="text-gray-300 text-sm">
                                            {role.nightAction}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Tips Section */}
                {activeSection === 'tips' && (
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-center mb-8 text-yellow-400">
                            ⚠️ Important Tips & Best Practices
                        </h2>
                        
                        <div className="grid gap-4">
                            {tips.map((tip, index) => (
                                <div 
                                    key={index}
                                    className="flex items-start gap-4 bg-gray-800/50 backdrop-blur-lg rounded-2xl p-4 border border-gray-700/50 hover:border-yellow-500/30 transition-all duration-300"
                                >
                                    <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <CheckCircle size={14} className="text-white" />
                                    </div>
                                    <p className="text-gray-300 leading-relaxed">
                                        {tip}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Critical Warning */}
                        <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-2xl p-6 border border-red-500/30 mt-8">
                            <div className="flex items-center gap-3 mb-4">
                                <AlertTriangle className="text-red-400" size={24} />
                                <h3 className="text-xl font-bold text-red-400">
                                    CRITICAL: Avoid Game Errors
                                </h3>
                            </div>
                            <div className="space-y-3 text-gray-300">
                                <p>🚫 <strong>DO NOT spam commands</strong> - wait for bot responses</p>
                                <p>🚫 <strong>DO NOT perform actions simultaneously</strong> - go one by one</p>
                                <p>🚫 <strong>DO NOT ignore bot instructions</strong> - follow the sequence</p>
                                <p>✅ <strong>DO wait for your turn</strong> during night phases</p>
                                <p>✅ <strong>DO use Wnew</strong> to reset if game gets stuck</p>
                                <p>✅ <strong>DO be patient</strong> during role assignments</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WerewolfGuide;