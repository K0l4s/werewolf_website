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

    return (
        <div className="min-h-screen  text-white py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <Settings className="text-purple-400" size={48} />
                        <Crown className="text-yellow-400" size={48} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                        Server Settings Guide
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Complete administrator guide for server configuration and management
                    </p>
                </div>

                {/* Permission Warning */}
                <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-2xl p-6 border border-yellow-500/30 mb-8">
                    <div className="flex items-center gap-3">
                        <Shield className="text-yellow-400" size={24} />
                        <h3 className="text-lg font-bold text-yellow-400">Administrator Only</h3>
                    </div>
                    <p className="text-gray-300 mt-2">
                        All commands on this page require <strong>Administrator</strong> or <strong>Manage Server</strong> permissions. 
                        Regular members cannot access these settings.
                    </p>
                </div>

                {/* Navigation */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {[
                        { id: 'language', icon: Languages, label: 'Language' },
                        { id: 'prefix', icon: Hash, label: 'Prefix' },
                        { id: 'notifications', icon: Bell, label: 'Welcome' },
                        { id: 'voice', icon: Volume2, label: 'Voice' },
                        { id: 'streak', icon: Award, label: 'Streak' },
                        { id: 'permissions', icon: Shield, label: 'Permissions' }
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveSection(item.id)}
                            className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                                activeSection === item.id 
                                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' 
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                            }`}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Language Settings */}
                {activeSection === 'language' && (
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-center mb-8 text-purple-400">
                            🌐 Server Language Settings
                        </h2>
                        
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Command Info */}
                            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border-2 border-purple-500/30">
                                <h3 className="text-2xl font-bold text-purple-400 mb-4">Command Information</h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <code className="text-lg font-bold text-yellow-400 bg-gray-900 px-3 py-2 rounded-lg block">
                                            {languageSettings.command}
                                        </code>
                                        <p className="text-gray-300 mt-2">{languageSettings.description}</p>
                                    </div>
                                    
                                    <div>
                                        <h4 className="text-yellow-400 font-semibold mb-2">Usage:</h4>
                                        <p className="text-gray-300">{languageSettings.usage}</p>
                                    </div>
                                    
                                    <div>
                                        <h4 className="text-yellow-400 font-semibold mb-2">Examples:</h4>
                                        <div className="space-y-2">
                                            {languageSettings.examples.map((example, index) => (
                                                <code key={index} className="block bg-gray-900 text-green-400 px-3 py-2 rounded-lg font-mono">
                                                    {example}
                                                </code>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Supported Languages */}
                            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border-2 border-blue-500/30">
                                <h3 className="text-2xl font-bold text-blue-400 mb-4">Supported Languages</h3>
                                
                                <div className="grid gap-4">
                                    {languageSettings.supportedLanguages.map((lang) => (
                                        <div key={lang.code} className="flex items-center gap-4 p-4 bg-gray-900/50 rounded-lg">
                                            <span className="text-2xl">{lang.flag}</span>
                                            <div>
                                                <div className="font-semibold text-white">{lang.name}</div>
                                                <code className="text-sm text-gray-400">Code: {lang.code}</code>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 p-4 bg-gray-900/30 rounded-lg">
                                    <h4 className="text-yellow-400 font-semibold mb-2">Important Notes:</h4>
                                    <ul className="text-gray-300 space-y-2">
                                        {languageSettings.notes.map((note, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <Zap size={16} className="text-yellow-400 mt-1 flex-shrink-0" />
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
                        <h2 className="text-3xl font-bold text-center mb-8 text-purple-400">
                            #️⃣ Custom Prefix Settings
                        </h2>
                        
                        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border-2 border-purple-500/30 mb-6">
                            <div className="space-y-4">
                                <div>
                                    <code className="text-lg font-bold text-yellow-400 bg-gray-900 px-3 py-2 rounded-lg block">
                                        {prefixSettings.command}
                                    </code>
                                    <p className="text-gray-300 mt-2">{prefixSettings.description}</p>
                                </div>
                                
                                <div>
                                    <h4 className="text-yellow-400 font-semibold mb-2">Usage:</h4>
                                    <p className="text-gray-300">{prefixSettings.usage}</p>
                                </div>
                                
                                <div>
                                    <h4 className="text-yellow-400 font-semibold mb-2">Examples:</h4>
                                    <div className="space-y-2">
                                        {prefixSettings.examples.map((example, index) => (
                                            <code key={index} className="block bg-gray-900 text-green-400 px-3 py-2 rounded-lg font-mono">
                                                {example}
                                            </code>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Critical Warning */}
                        <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-2xl p-6 border border-red-500/30">
                            <h3 className="text-2xl font-bold text-red-400 mb-4">⚠️ Critical Information</h3>
                            <ul className="text-gray-300 space-y-3">
                                {prefixSettings.importantNotes.map((note, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <Shield size={18} className="text-red-400 mt-1 flex-shrink-0" />
                                        {note}
                                    </li>
                                ))}
                            </ul>
                            
                            <div className="mt-4 p-4 bg-gray-900/50 rounded-lg">
                                <h4 className="text-yellow-400 font-semibold mb-2">Recovery Command:</h4>
                                <p className="text-gray-300">
                                    If you forget your custom prefix, use the slash command:
                                </p>
                                <code className="block bg-gray-800 text-green-400 px-3 py-2 rounded-lg mt-2 font-mono">
                                    /set prefix [character]
                                </code>
                            </div>
                        </div>
                    </div>
                )}

                {/* Notification Settings */}
                {activeSection === 'notifications' && (
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-center mb-8 text-purple-400">
                            🔔 Welcome & Farewell Notifications
                        </h2>
                        
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Command Section */}
                            <div className="space-y-6">
                                <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border-2 border-purple-500/30">
                                    <h3 className="text-2xl font-bold text-purple-400 mb-4">Slash Commands</h3>
                                    
                                    {notificationSettings.commands.map((cmd, index) => (
                                        <div key={index} className="space-y-3">
                                            <code className="text-lg font-bold text-yellow-400 bg-gray-900 px-3 py-2 rounded-lg block">
                                                {cmd.command}
                                            </code>
                                            <p className="text-gray-300">{cmd.description}</p>
                                            <div>
                                                <span className="text-yellow-400 font-semibold">Usage:</span>
                                                <p className="text-gray-300">{cmd.usage}</p>
                                            </div>
                                            <div>
                                                <span className="text-yellow-400 font-semibold">Example:</span>
                                                <code className="block bg-gray-900 text-green-400 px-3 py-2 rounded-lg mt-1 font-mono">
                                                    {cmd.example}
                                                </code>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Important Notes */}
                                <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 rounded-2xl p-6 border border-yellow-500/30">
                                    <h4 className="text-yellow-400 font-semibold mb-3">Important Notes:</h4>
                                    <ul className="text-gray-300 space-y-2">
                                        {notificationSettings.importantNotes.map((note, index) => (
                                            <li key={index} className="flex items-start gap-2">
                                                <Zap size={16} className="text-yellow-400 mt-1 flex-shrink-0" />
                                                {note}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Features & Dashboard */}
                            <div className="space-y-6">
                                <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border-2 border-blue-500/30">
                                    <h3 className="text-2xl font-bold text-blue-400 mb-4">Features</h3>
                                    <ul className="text-gray-300 space-y-3">
                                        {notificationSettings.features.map((feature, index) => (
                                            <li key={index} className="flex items-center gap-3">
                                                <Bell size={16} className="text-green-400" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-6 border border-purple-500/30">
                                    <h3 className="text-2xl font-bold text-pink-400 mb-4">Dashboard Features</h3>
                                    <p className="text-gray-300 mb-4">
                                        For advanced customization, visit the Dashboard:
                                    </p>
                                    <a 
                                        href="/dashboard" 
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold transition-colors"
                                    >
                                        Go to Dashboard <ExternalLink size={16} />
                                    </a>
                                    <ul className="text-gray-300 space-y-2 mt-4">
                                        {notificationSettings.dashboardFeatures.map((feature, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
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
                        <h2 className="text-3xl font-bold text-center mb-8 text-purple-400">
                            🔊 Voice Chat Notifications
                        </h2>
                        
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Voice Settings */}
                            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border-2 border-purple-500/30">
                                <h3 className="text-2xl font-bold text-purple-400 mb-4">Voice Notifications</h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <code className="text-lg font-bold text-yellow-400 bg-gray-900 px-3 py-2 rounded-lg block">
                                            {voiceSettings.command}
                                        </code>
                                        <p className="text-gray-300 mt-2">{voiceSettings.description}</p>
                                    </div>
                                    
                                    <div>
                                        <h4 className="text-yellow-400 font-semibold mb-2">Usage:</h4>
                                        <p className="text-gray-300">{voiceSettings.usage}</p>
                                    </div>
                                    
                                    <div>
                                        <h4 className="text-yellow-400 font-semibold mb-2">Examples:</h4>
                                        <div className="space-y-2">
                                            {voiceSettings.examples.map((example, index) => (
                                                <code key={index} className="block bg-gray-900 text-green-400 px-3 py-2 rounded-lg font-mono">
                                                    {example}
                                                </code>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-yellow-400 font-semibold mb-2">Tracks:</h4>
                                        <ul className="text-gray-300 space-y-2">
                                            {voiceSettings.notificationTypes.map((type, index) => (
                                                <li key={index} className="flex items-center gap-2">
                                                    <Volume2 size={16} className="text-blue-400" />
                                                    {type}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Embed Settings */}
                            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border-2 border-blue-500/30">
                                <h3 className="text-2xl font-bold text-blue-400 mb-4">Embed Notifications</h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <code className="text-lg font-bold text-yellow-400 bg-gray-900 px-3 py-2 rounded-lg block">
                                            {voiceSettings.embedSettings.command}
                                        </code>
                                        <p className="text-gray-300 mt-2">{voiceSettings.embedSettings.description}</p>
                                    </div>
                                    
                                    <div>
                                        <h4 className="text-yellow-400 font-semibold mb-2">Usage:</h4>
                                        <p className="text-gray-300">{voiceSettings.embedSettings.usage}</p>
                                    </div>
                                    
                                    <div>
                                        <h4 className="text-yellow-400 font-semibold mb-2">Examples:</h4>
                                        <div className="space-y-2">
                                            {voiceSettings.embedSettings.examples.map((example, index) => (
                                                <code key={index} className="block bg-gray-900 text-green-400 px-3 py-2 rounded-lg font-mono">
                                                    {example}
                                                </code>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-4 bg-gray-900/30 rounded-lg">
                                        <h4 className="text-green-400 font-semibold mb-2">Embed Features:</h4>
                                        <ul className="text-gray-300 space-y-2 text-sm">
                                            <li>• Beautiful colored borders</li>
                                            <li>• Member information</li>
                                            <li>• Channel names and links</li>
                                            <li>• Timestamps and activity details</li>
                                            {/* <li>• Customizable colors and styles</li> */}
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
                        <h2 className="text-3xl font-bold text-center mb-8 text-purple-400">
                            🔥 Streak System Settings
                        </h2>
                        
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Command Info */}
                            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border-2 border-purple-500/30">
                                <h3 className="text-2xl font-bold text-purple-400 mb-4">Streak Configuration</h3>
                                
                                <div className="space-y-4">
                                    <div>
                                        <code className="text-lg font-bold text-yellow-400 bg-gray-900 px-3 py-2 rounded-lg block">
                                            {streakSettings.command}
                                        </code>
                                        <p className="text-gray-300 mt-2">{streakSettings.description}</p>
                                    </div>
                                    
                                    <div>
                                        <h4 className="text-yellow-400 font-semibold mb-2">Usage:</h4>
                                        <p className="text-gray-300">{streakSettings.usage}</p>
                                    </div>
                                    
                                    <div>
                                        <h4 className="text-yellow-400 font-semibold mb-2">Examples:</h4>
                                        <div className="space-y-2">
                                            {streakSettings.examples.map((example, index) => (
                                                <code key={index} className="block bg-gray-900 text-green-400 px-3 py-2 rounded-lg font-mono">
                                                    {example}
                                                </code>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-yellow-400 font-semibold mb-2">Features:</h4>
                                        <ul className="text-gray-300 space-y-2">
                                            {streakSettings.features.map((feature, index) => (
                                                <li key={index} className="flex items-center gap-2">
                                                    <Award size={16} className="text-yellow-400" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Learn More */}
                            <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-2xl p-6 border border-orange-500/30">
                                <h3 className="text-2xl font-bold text-orange-400 mb-4">Learn More About Streaks</h3>
                                
                                <p className="text-gray-300 mb-4">
                                    {streakSettings.learnMore.text}
                                </p>
                                
                                <a 
                                    href={streakSettings.learnMore.link}
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-lg text-white font-semibold transition-colors mb-4"
                                >
                                    Visit Streak Details <ExternalLink size={16} />
                                </a>

                                <h4 className="text-yellow-400 font-semibold mb-2">Detailed Information:</h4>
                                <ul className="text-gray-300 space-y-2">
                                    {streakSettings.learnMore.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <Zap size={16} className="text-orange-400 mt-1 flex-shrink-0" />
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
                        <h2 className="text-3xl font-bold text-center mb-8 text-purple-400">
                            🛡️ Permissions & Requirements
                        </h2>
                        <div className="grid lg:grid-cols-2 gap-8">
                            {/* Required Roles */}
                            <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl p-6 border-2 border-purple-500/30">
                                <h3 className="text-2xl font-bold text-purple-400 mb-4">Required Roles</h3>
                                <ul className="text-gray-300 space-y-3">
                                    {permissionInfo.requiredRoles.map((role, index) => (
                                        <li key={index} className="flex items-center gap-3">
                                            <Shield size={16} className="text-blue-400" />
                                            {role}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/* Limitations & Requirements */}
                            <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 rounded-2xl p-6 border border-red-500/30">
                                <h3 className="text-2xl font-bold text-red-400 mb-4">Limitations & Requirements</h3>
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-yellow-400 font-semibold mb-2">User Limitations:</h4>
                                        <ul className="text-gray-300 space-y-2">
                                            {permissionInfo.userLimitations.map((limitation, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <Zap size={16} className="text-yellow-400 mt-1 flex-shrink-0" />
                                                    {limitation}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-yellow-400 font-semibold mb-2">Bot Requirements:</h4>
                                        <ul className="text-gray-300 space-y-2">
                                            {permissionInfo.botRequirements.map((requirement, index) => (
                                                <li key={index} className="flex items-start gap-2">
                                                    <Zap size={16} className="text-yellow-400 mt-1 flex-shrink-0" />
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