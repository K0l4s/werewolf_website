import { useState } from 'react';
import { Settings, Languages, Hash, Bell, Volume2, Award, Shield, ExternalLink, Crown, Zap } from 'lucide-react';

const ServerSettingsGuide = () => {
    const [activeSection, setActiveSection] = useState('language');

    const languageSettings = {
        command: 'wset lang [language]',
        description: 'Change server language for bot responses',
        usage: 'Set the preferred language for all bot messages and interactions',
        examples: [
            'wset lang vi - Set language to Vietnamese',
            'wset lang en - Set language to English'
        ],
        supportedLanguages: [
            { code: 'vi', name: 'Vietnamese', flag: '🇻🇳' },
            { code: 'en', name: 'English', flag: '🇺🇸' }
        ],
        notes: [
            'Changes apply to all bot responses server-wide',
            'Only server administrators can change this setting',
            'Default language is English'
        ]
    };

    const prefixSettings = {
        command: 'wset prefix [character]',
        description: 'Change the bot command prefix for this server',
        usage: 'Set a custom prefix for all bot commands',
        examples: [
            'wset prefix ! - Change prefix to exclamation mark',
            'wset prefix $ - Change prefix to dollar sign',
            'wset prefix . - Change prefix to dot'
        ],
        importantNotes: [
            'After changing prefix, members can check it with: wcheck prefix',
            'Once changed, the default prefix (w) will no longer work',
            'If you forget your custom prefix, use slash command: /set prefix [character] to reset',
            'Prefix must be a single character',
            'Avoid using special characters that might conflict with other bots'
        ]
    };

    const notificationSettings = {
        commands: [
            {
                command: '/set notification [#channel]',
                description: 'Set welcome/farewell notification channel',
                usage: 'Configure where welcome and goodbye messages are sent',
                example: '/set notification #welcome-channel'
            }
        ],
        features: [
            'Welcome messages for new members',
            'Farewell messages for leaving members',
            'Customizable message templates',
            'Embed-style notifications'
        ],
        importantNotes: [
            '⚠️ This feature ONLY works with SLASH COMMANDS, not prefix commands',
            '⚡ For advanced customization, use the Dashboard at /dashboard',
            '🎨 Custom backgrounds available for 15 tokens or with Premium packages',
            '👑 Premium features include animated backgrounds and custom messages'
        ],
        dashboardFeatures: [
            'Live preview of welcome messages',
            'Custom message editor',
            'Background image selection',
            'Font and color customization',
            'Test notification feature'
        ]
    };

    const voiceSettings = {
        command: 'wset voice [true/false]',
        description: 'Enable/disable voice chat notifications',
        usage: 'Toggle notifications for voice channel activities',
        examples: [
            'wset voice true - Enable voice notifications',
            'wset voice false - Disable voice notifications'
        ],
        notificationTypes: [
            'Member joining voice channels',
            'Member leaving voice channels',
            'Member moving between voice channels'
        ],
        embedSettings: {
            command: 'wset embed [true/false]',
            description: 'Toggle beautiful embed-style notifications',
            usage: 'Switch between embed and plain text notifications',
            examples: [
                'wset embed true - Enable embed notifications',
                'wset embed false - Disable embed notifications'
            ]
        }
    };

    const streakSettings = {
        command: 'wset streak [on/off]',
        description: 'Enable/disable streak tracking for the entire server',
        usage: 'Toggle daily streak functionality server-wide',
        examples: [
            'wset streak on - Enable streak system',
            'wset streak off - Disable streak system'
        ],
        features: [
            'Daily activity tracking',
            'Reward system for consistent participation',
            'Leaderboard for top streakers',
            'Bonus rewards for milestone streaks'
        ],
        learnMore: {
            text: 'Visit the streak details page for in-depth information',
            link: '/guild/streak',
            features: [
                'How streaks are calculated',
                'Reward tiers and benefits',
                'Streak reset conditions',
                'Premium streak bonuses'
            ]
        }
    };

    const permissionInfo = {
        requiredRoles: ['Administrator', 'Server Manager', 'Manage Server permission'],
        userLimitations: [
            'Regular members CANNOT use these settings commands',
            'Commands will return permission denied for non-admins',
            'Some features may require specific bot permissions'
        ],
        botRequirements: [
            'Manage Channels permission for notification setup',
            'Send Messages permission',
            'Embed Links permission for rich notifications',
            'View Channels permission for voice tracking'
        ]
    };

    const navItems = [
        { id: 'language', icon: Languages, label: 'Language' },
        { id: 'prefix', icon: Hash, label: 'Prefix' },
        { id: 'notifications', icon: Bell, label: 'Welcome' },
        { id: 'voice', icon: Volume2, label: 'Voice' },
        { id: 'streak', icon: Award, label: 'Streak' },
        { id: 'permissions', icon: Shield, label: 'Permissions' }
    ];

    return (
        <div className="min-h-screen py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <div className="bg-cyan-100 border-2 border-black rounded-xl p-3">
                            <Settings className="text-black" size={48} />
                        </div>
                        <div className="bg-yellow-100 border-2 border-black rounded-xl p-3">
                            <Crown className="text-black" size={48} />
                        </div>
                    </div>
                    <div className="bg-white border-3 border-black rounded-2xl p-8 shadow-brutal-lg mb-8">
                        <h1 className="text-4xl md:text-5xl font-black text-black mb-4">
                            Server Settings Guide
                        </h1>
                        <p className="text-xl text-gray-700 font-medium max-w-2xl mx-auto">
                            Complete administrator guide for server configuration and management
                        </p>
                    </div>
                </div>

                {/* Permission Warning */}
                <div className="bg-yellow-50 border-3 border-black rounded-2xl p-6 mb-8 shadow-brutal">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-yellow-100 border-2 border-black rounded-lg p-2">
                            <Shield className="text-black" size={24} />
                        </div>
                        <h3 className="text-xl font-black text-black">Administrator Only</h3>
                    </div>
                    <p className="text-gray-700 font-medium">
                        All commands on this page require <strong>Administrator</strong> or <strong>Manage Server</strong> permissions. 
                        Regular members cannot access these settings.
                    </p>
                </div>

                {/* Navigation */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={`group relative px-5 py-3 rounded-xl font-black border-3 transition-all duration-300 flex items-center gap-2 ${
                                activeSection === item.id 
                                    ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-black border-black shadow-brutal' 
                                    : 'bg-white text-black border-black hover:-translate-y-1 hover:shadow-brutal'
                            }`}
                        >
                            <item.icon size={18} />
                            {item.label}
                            {activeSection === item.id && (
                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-cyan-400 border border-black rounded-full"></div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Language Settings */}
                {activeSection === 'language' && (
                    <div className="space-y-6">
                        <h2 className="text-4xl font-black text-center mb-8 text-black">
                            🌐 Server Language Settings
                        </h2>
                        
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Command Info */}
                            <div className="bg-white border-3 border-cyan-400 rounded-2xl p-6 shadow-brutal group">
                                <h3 className="text-2xl font-black text-black mb-4">Command Information</h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <code className="text-lg font-black text-white bg-black px-3 py-2 rounded-lg block shadow-brutal-sm">
                                            {languageSettings.command}
                                        </code>
                                        <p className="text-gray-700 mt-2 font-medium">{languageSettings.description}</p>
                                    </div>
                                    
                                    <div>
                                        <h4 className="text-black font-black mb-2">Usage:</h4>
                                        <p className="text-gray-700 font-medium">{languageSettings.usage}</p>
                                    </div>
                                    
                                    <div>
                                        <h4 className="text-black font-black mb-2">Examples:</h4>
                                        <div className="space-y-2">
                                            {languageSettings.examples.map((example, index) => (
                                                <code key={index} className="block bg-gray-100 border-2 border-black text-gray-800 px-3 py-2 rounded-lg font-mono font-bold shadow-brutal-xs">
                                                    {example}
                                                </code>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 border-2 border-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Supported Languages */}
                            <div className="bg-white border-3 border-blue-400 rounded-2xl p-6 shadow-brutal group">
                                <h3 className="text-2xl font-black text-black mb-4">Supported Languages</h3>
                                
                                <div className="grid gap-4">
                                    {languageSettings.supportedLanguages.map((lang) => (
                                        <div key={lang.code} className="flex items-center gap-4 p-4 bg-gray-50 border-2 border-black rounded-xl shadow-brutal-xs">
                                            <span className="text-2xl">{lang.flag}</span>
                                            <div>
                                                <div className="font-black text-black">{lang.name}</div>
                                                <code className="text-sm text-gray-600 font-bold">Code: {lang.code}</code>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 p-4 bg-cyan-50 border-2 border-black rounded-lg shadow-brutal-xs">
                                    <h4 className="text-black font-black mb-2">Important Notes:</h4>
                                    <ul className="text-gray-700 space-y-2 font-medium">
                                        {languageSettings.notes.map((note, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <div className="bg-cyan-400 border border-black rounded-full p-1 mt-1 flex-shrink-0">
                                                    <Zap size={12} className="text-black" />
                                                </div>
                                                {note}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Prefix Settings */}
                {activeSection === 'prefix' && (
                    <div className="space-y-6">
                        <h2 className="text-4xl font-black text-center mb-8 text-black">
                            #️⃣ Custom Prefix Settings
                        </h2>
                        
                        <div className="bg-white border-3 border-purple-400 rounded-2xl p-6 shadow-brutal mb-6 group">
                            <div className="space-y-4">
                                <div>
                                    <code className="text-lg font-black text-white bg-black px-3 py-2 rounded-lg block shadow-brutal-sm">
                                        {prefixSettings.command}
                                    </code>
                                    <p className="text-gray-700 mt-2 font-medium">{prefixSettings.description}</p>
                                </div>
                                
                                <div>
                                    <h4 className="text-black font-black mb-2">Usage:</h4>
                                    <p className="text-gray-700 font-medium">{prefixSettings.usage}</p>
                                </div>
                                
                                <div>
                                    <h4 className="text-black font-black mb-2">Examples:</h4>
                                    <div className="space-y-2">
                                        {prefixSettings.examples.map((example, index) => (
                                            <code key={index} className="block bg-gray-100 border-2 border-black text-gray-800 px-3 py-2 rounded-lg font-mono font-bold shadow-brutal-xs">
                                                {example}
                                            </code>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Critical Warning */}
                        <div className="bg-red-50 border-3 border-red-400 rounded-2xl p-6 shadow-brutal">
                            <h3 className="text-2xl font-black text-red-600 mb-4">⚠️ Critical Information</h3>
                            <ul className="text-gray-700 space-y-3 font-medium">
                                {prefixSettings.importantNotes.map((note, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="bg-red-400 border-2 border-black rounded-lg p-1 mt-1 flex-shrink-0">
                                            <Shield size={16} className="text-black" />
                                        </div>
                                        {note}
                                    </li>
                                ))}
                            </ul>
                            
                            <div className="mt-4 p-4 bg-white border-2 border-black rounded-lg shadow-brutal-xs">
                                <h4 className="text-black font-black mb-2">Recovery Command:</h4>
                                <p className="text-gray-700 font-medium">
                                    If you forget your custom prefix, use the slash command:
                                </p>
                                <code className="block bg-gray-100 border-2 border-black text-gray-800 px-3 py-2 rounded-lg mt-2 font-mono font-bold shadow-brutal-xs">
                                    /set prefix [character]
                                </code>
                            </div>
                        </div>
                    </div>
                )}

                {/* Notification Settings */}
                {activeSection === 'notifications' && (
                    <div className="space-y-6">
                        <h2 className="text-4xl font-black text-center mb-8 text-black">
                            🔔 Welcome & Farewell Notifications
                        </h2>
                        
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Command Section */}
                            <div className="space-y-6">
                                <div className="bg-white border-3 border-purple-400 rounded-2xl p-6 shadow-brutal group">
                                    <h3 className="text-2xl font-black text-black mb-4">Slash Commands</h3>
                                    
                                    {notificationSettings.commands.map((cmd, index) => (
                                        <div key={index} className="space-y-3">
                                            <code className="text-lg font-black text-white bg-black px-3 py-2 rounded-lg block shadow-brutal-sm">
                                                {cmd.command}
                                            </code>
                                            <p className="text-gray-700 font-medium">{cmd.description}</p>
                                            <div>
                                                <span className="text-black font-black">Usage:</span>
                                                <p className="text-gray-700 font-medium">{cmd.usage}</p>
                                            </div>
                                            <div>
                                                <span className="text-black font-black">Example:</span>
                                                <code className="block bg-gray-100 border-2 border-black text-gray-800 px-3 py-2 rounded-lg mt-1 font-mono font-bold shadow-brutal-xs">
                                                    {cmd.example}
                                                </code>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Important Notes */}
                                <div className="bg-yellow-50 border-3 border-yellow-400 rounded-2xl p-6 shadow-brutal">
                                    <h4 className="text-black font-black mb-3">Important Notes:</h4>
                                    <ul className="text-gray-700 space-y-2 font-medium">
                                        {notificationSettings.importantNotes.map((note, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <div className="bg-yellow-400 border border-black rounded-full p-1 mt-1 flex-shrink-0">
                                                    <Zap size={12} className="text-black" />
                                                </div>
                                                {note}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Features & Dashboard */}
                            <div className="space-y-6">
                                <div className="bg-white border-3 border-blue-400 rounded-2xl p-6 shadow-brutal group">
                                    <h3 className="text-2xl font-black text-black mb-4">Features</h3>
                                    <ul className="text-gray-700 space-y-3 font-medium">
                                        {notificationSettings.features.map((feature, index) => (
                                            <li key={index} className="flex items-center gap-3">
                                                <div className="bg-green-400 border-2 border-black rounded-lg p-1">
                                                    <Bell size={14} className="text-black" />
                                                </div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-purple-50 border-3 border-purple-400 rounded-2xl p-6 shadow-brutal group">
                                    <h3 className="text-2xl font-black text-black mb-4">Dashboard Features</h3>
                                    <p className="text-gray-700 font-medium mb-4">
                                        For advanced customization, visit the Dashboard:
                                    </p>
                                    <a 
                                        href="/dashboard" 
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-purple-400 border-2 border-black rounded-lg text-black font-black shadow-brutal-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-brutal-xs transition-all duration-300"
                                    >
                                        Go to Dashboard <ExternalLink size={16} />
                                    </a>
                                    <ul className="text-gray-700 space-y-2 mt-4 font-medium">
                                        {notificationSettings.dashboardFeatures.map((feature, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-pink-400 border border-black rounded-full"></div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Voice Settings */}
                {activeSection === 'voice' && (
                    <div className="space-y-6">
                        <h2 className="text-4xl font-black text-center mb-8 text-black">
                            🔊 Voice Chat Notifications
                        </h2>
                        
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Voice Settings */}
                            <div className="bg-white border-3 border-purple-400 rounded-2xl p-6 shadow-brutal group">
                                <h3 className="text-2xl font-black text-black mb-4">Voice Notifications</h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <code className="text-lg font-black text-white bg-black px-3 py-2 rounded-lg block shadow-brutal-sm">
                                            {voiceSettings.command}
                                        </code>
                                        <p className="text-gray-700 mt-2 font-medium">{voiceSettings.description}</p>
                                    </div>
                                    
                                    <div>
                                        <h4 className="text-black font-black mb-2">Usage:</h4>
                                        <p className="text-gray-700 font-medium">{voiceSettings.usage}</p>
                                    </div>
                                    
                                    <div>
                                        <h4 className="text-black font-black mb-2">Examples:</h4>
                                        <div className="space-y-2">
                                            {voiceSettings.examples.map((example, index) => (
                                                <code key={index} className="block bg-gray-100 border-2 border-black text-gray-800 px-3 py-2 rounded-lg font-mono font-bold shadow-brutal-xs">
                                                    {example}
                                                </code>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-black font-black mb-2">Tracks:</h4>
                                        <ul className="text-gray-700 space-y-2 font-medium">
                                            {voiceSettings.notificationTypes.map((type, index) => (
                                                <li key={index} className="flex items-center gap-2">
                                                    <div className="bg-blue-400 border-2 border-black rounded-lg p-1">
                                                        <Volume2 size={14} className="text-black" />
                                                    </div>
                                                    {type}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Embed Settings */}
                            <div className="bg-white border-3 border-blue-400 rounded-2xl p-6 shadow-brutal group">
                                <h3 className="text-2xl font-black text-black mb-4">Embed Notifications</h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <code className="text-lg font-black text-white bg-black px-3 py-2 rounded-lg block shadow-brutal-sm">
                                            {voiceSettings.embedSettings.command}
                                        </code>
                                        <p className="text-gray-700 mt-2 font-medium">{voiceSettings.embedSettings.description}</p>
                                    </div>
                                    
                                    <div>
                                        <h4 className="text-black font-black mb-2">Usage:</h4>
                                        <p className="text-gray-700 font-medium">{voiceSettings.embedSettings.usage}</p>
                                    </div>
                                    
                                    <div>
                                        <h4 className="text-black font-black mb-2">Examples:</h4>
                                        <div className="space-y-2">
                                            {voiceSettings.embedSettings.examples.map((example, index) => (
                                                <code key={index} className="block bg-gray-100 border-2 border-black text-gray-800 px-3 py-2 rounded-lg font-mono font-bold shadow-brutal-xs">
                                                    {example}
                                                </code>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-4 bg-green-50 border-2 border-black rounded-lg shadow-brutal-xs">
                                        <h4 className="text-black font-black mb-2">Embed Features:</h4>
                                        <ul className="text-gray-700 space-y-2 text-sm font-medium">
                                            <li>• Beautiful colored borders</li>
                                            <li>• Member information</li>
                                            <li>• Channel names and links</li>
                                            <li>• Timestamps and activity details</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Streak Settings */}
                {activeSection === 'streak' && (
                    <div className="space-y-6">
                        <h2 className="text-4xl font-black text-center mb-8 text-black">
                            🔥 Streak System Settings
                        </h2>
                        
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Command Info */}
                            <div className="bg-white border-3 border-purple-400 rounded-2xl p-6 shadow-brutal group">
                                <h3 className="text-2xl font-black text-black mb-4">Streak Configuration</h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <code className="text-lg font-black text-white bg-black px-3 py-2 rounded-lg block shadow-brutal-sm">
                                            {streakSettings.command}
                                        </code>
                                        <p className="text-gray-700 mt-2 font-medium">{streakSettings.description}</p>
                                    </div>
                                    
                                    <div>
                                        <h4 className="text-black font-black mb-2">Usage:</h4>
                                        <p className="text-gray-700 font-medium">{streakSettings.usage}</p>
                                    </div>
                                    
                                    <div>
                                        <h4 className="text-black font-black mb-2">Examples:</h4>
                                        <div className="space-y-2">
                                            {streakSettings.examples.map((example, index) => (
                                                <code key={index} className="block bg-gray-100 border-2 border-black text-gray-800 px-3 py-2 rounded-lg font-mono font-bold shadow-brutal-xs">
                                                    {example}
                                                </code>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-black font-black mb-2">Features:</h4>
                                        <ul className="text-gray-700 space-y-2 font-medium">
                                            {streakSettings.features.map((feature, index) => (
                                                <li key={index} className="flex items-center gap-2">
                                                    <div className="bg-yellow-400 border-2 border-black rounded-lg p-1">
                                                        <Award size={14} className="text-black" />
                                                    </div>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Learn More */}
                            <div className="bg-orange-50 border-3 border-orange-400 rounded-2xl p-6 shadow-brutal group">
                                <h3 className="text-2xl font-black text-black mb-4">Learn More About Streaks</h3>
                                
                                <p className="text-gray-700 font-medium mb-4">
                                    {streakSettings.learnMore.text}
                                </p>
                                
                                <a 
                                    href={streakSettings.learnMore.link}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-orange-400 border-2 border-black rounded-lg text-black font-black shadow-brutal-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-brutal-xs transition-all duration-300 mb-4"
                                >
                                    Visit Streak Details <ExternalLink size={16} />
                                </a>

                                <h4 className="text-black font-black mb-2">Detailed Information:</h4>
                                <ul className="text-gray-700 space-y-2 font-medium">
                                    {streakSettings.learnMore.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <div className="bg-orange-400 border border-black rounded-full p-1 mt-1 flex-shrink-0">
                                                <Zap size={12} className="text-black" />
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                {/* Permissions Info */}
                {activeSection === 'permissions' && (
                    <div className="space-y-6">
                        <h2 className="text-4xl font-black text-center mb-8 text-black">
                            🛡️ Permissions & Requirements
                        </h2>
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Required Roles */}
                            <div className="bg-white border-3 border-purple-400 rounded-2xl p-6 shadow-brutal group">
                                <h3 className="text-2xl font-black text-black mb-4">Required Roles</h3>
                                <ul className="text-gray-700 space-y-3 font-medium">
                                    {permissionInfo.requiredRoles.map((role, index) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <div className="bg-blue-400 border-2 border-black rounded-lg p-1">
                                                <Shield size={14} className="text-black" />
                                            </div>
                                            {role}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* Limitations & Requirements */}
                            <div className="bg-red-50 border-3 border-red-400 rounded-2xl p-6 shadow-brutal group">
                                <h3 className="text-2xl font-black text-red-600 mb-4">Limitations & Requirements</h3>
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-black font-black mb-2">User Limitations:</h4>
                                        <ul className="text-gray-700 space-y-2 font-medium">
                                            {permissionInfo.userLimitations.map((limitation, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <div className="bg-yellow-400 border border-black rounded-full p-1 mt-1 flex-shrink-0">
                                                        <Zap size={12} className="text-black" />
                                                    </div>
                                                    {limitation}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-black font-black mb-2">Bot Requirements:</h4>
                                        <ul className="text-gray-700 space-y-2 font-medium">
                                            {permissionInfo.botRequirements.map((requirement, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <div className="bg-yellow-400 border border-black rounded-full p-1 mt-1 flex-shrink-0">
                                                        <Zap size={12} className="text-black" />
                                                    </div>
                                                    {requirement}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ServerSettingsGuide;