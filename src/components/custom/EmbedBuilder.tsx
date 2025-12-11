import { useState, useRef } from "react";
import DiscordEmbedPreview from "./DiscordEmbedPreview";
import type { EmbedData, Field } from "../../models/Embed";
interface Props {
    embed: EmbedData,
    setEmbed: (embed: EmbedData) => void
}
export default function EmbedBuilder({ embed, setEmbed }: Props) {

    // const [botIcon] = useState("https://cdn.discordapp.com/embed/avatars/1.png");
    const descRef = useRef<HTMLTextAreaElement>(null);

    const [newField, setNewField] = useState<Field>({
        name: "",
        value: "",
        inline: false,
    });

    const insertMarkdown = (syntax: string) => {
        const el = descRef.current;
        if (!el) return;
        const start = el.selectionStart;
        const end = el.selectionEnd;
        const text = el.value;
        const selected = text.slice(start, end);
        let formatted = selected;

        switch (syntax) {
            case "bold":
                formatted = `**${selected || "text"}**`;
                break;
            case "italic":
                formatted = `*${selected || "text"}*`;
                break;
            case "underline":
                formatted = `__${selected || "text"}__`;
                break;
            case "strike":
                formatted = `~~${selected || "text"}~~`;
                break;
            case "hide":
                formatted = `||${selected || "text"}||`;
                break;
        }

        const newText = text.slice(0, start) + formatted + text.slice(end);
        setEmbed({ ...embed, description: newText });

        // restore cursor
        setTimeout(() => {
            el.focus();
            el.selectionStart = el.selectionEnd = start + formatted.length;
        }, 0);
    };

    const addField = () => {
        if (newField.name.trim() && newField.value.trim()) {
            setEmbed({
                ...embed,
                fields: [...embed.fields || [], { ...newField }],
            });
            setNewField({ name: "", value: "", inline: false });
        }
    };

    const removeField = (index: number) => {
        const updatedFields = embed.fields?.filter((_: Field, i: number) => i !== index);
        setEmbed({ ...embed, fields: updatedFields });
    };

    const clearAll = () => {
        setEmbed({
            // author: "",
            title: "",
            description: "",
            color: "#5865F2",
            footer: "",
            footerIcon: "",
            timestamp: false,
            image: "",
            thumbnail: "",
            fields: [],
        });
    };

    return (
        <div className="min-h-screen text-white flex flex-col md:flex-row items-start justify-center p-6 gap-8">
            {/* Form */}
            <div className="bg-gray-800 rounded-xl p-6 w-full md:w-1/3 space-y-4">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold">Embed Builder</h2>
                    <button
                        onClick={clearAll}
                        className="px-3 py-1 bg-red-600 rounded hover:bg-red-700 text-sm"
                    >
                        Clear All
                    </button>
                </div>

                {/* Author */}
                {/* <div>
                    <label className="block text-sm font-medium mb-1">Author</label>
                    <input
                        type="text"
                        value={embed.author}
                        onChange={(e) => setEmbed({ ...embed, author: e.target.value })}
                        placeholder="Author name"
                        className="w-full bg-gray-700 rounded-lg p-2 outline-none"
                    />
                </div> */}

                {/* Title */}
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        value={embed.title}
                        onChange={(e) => setEmbed({ ...embed, title: e.target.value })}
                        placeholder="Embed title"
                        className="w-full bg-gray-700 rounded-lg p-2 outline-none"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>

                    {/* Toolbar */}
                    <div className="flex gap-2 mb-2">
                        <button onClick={() => insertMarkdown("bold")} className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600">B</button>
                        <button onClick={() => insertMarkdown("italic")} className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 italic">I</button>
                        <button onClick={() => insertMarkdown("underline")} className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 underline">U</button>
                        <button onClick={() => insertMarkdown("strike")} className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 line-through">S</button>
                        <button onClick={() => insertMarkdown("hide")} className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600">H</button>
                    </div>

                    <textarea
                        ref={descRef}
                        value={embed.description}
                        onChange={(e) => setEmbed({ ...embed, description: e.target.value })}
                        placeholder="Embed description"
                        className="w-full bg-gray-700 rounded-lg p-2 outline-none h-32"
                    />
                </div>

                {/* Color */}
                <div>
                    <label className="block text-sm font-medium mb-1">Color</label>
                    <input
                        type="color"
                        value={embed.color}
                        onChange={(e) => setEmbed({ ...embed, color: e.target.value })}
                        className="w-full h-10 bg-gray-700 rounded-lg cursor-pointer"
                    />
                </div>

                {/* Footer */}
                <div>
                    <label className="block text-sm font-medium mb-1">Footer</label>
                    <input
                        type="text"
                        value={embed.footer}
                        onChange={(e) => setEmbed({ ...embed, footer: e.target.value })}
                        placeholder="Footer text"
                        className="w-full bg-gray-700 rounded-lg p-2 outline-none mb-2"
                    />
                    <input
                        type="text"
                        value={embed.footerIcon}
                        onChange={(e) => setEmbed({ ...embed, footerIcon: e.target.value })}
                        placeholder="Footer icon URL"
                        className="w-full bg-gray-700 rounded-lg p-2 outline-none"
                    />
                </div>

                {/* Image & Thumbnail */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Image URL</label>
                        <input
                            type="text"
                            value={embed.image}
                            onChange={(e) => setEmbed({ ...embed, image: e.target.value })}
                            placeholder="Image URL"
                            className="w-full bg-gray-700 rounded-lg p-2 outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Thumbnail URL</label>
                        <input
                            type="text"
                            value={embed.thumbnail}
                            onChange={(e) => setEmbed({ ...embed, thumbnail: e.target.value })}
                            placeholder="Thumbnail URL"
                            className="w-full bg-gray-700 rounded-lg p-2 outline-none"
                        />
                    </div>
                </div>

                {/* Timestamp */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="timestamp"
                        checked={embed.timestamp}
                        onChange={(e) => setEmbed({ ...embed, timestamp: e.target.checked })}
                        className="w-4 h-4"
                    />
                    <label htmlFor="timestamp" className="text-sm font-medium">
                        Show Timestamp
                    </label>
                </div>

                {/* Fields */}
                <div className="border-t border-gray-700 pt-4">
                    <h3 className="text-lg font-medium mb-3">Fields</h3>

                    {/* Add New Field */}
                    <div className="space-y-3 mb-4 p-3 bg-gray-750 rounded-lg">
                        <input
                            type="text"
                            value={newField.name}
                            onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                            placeholder="Field name"
                            className="w-full bg-gray-700 rounded-lg p-2 outline-none"
                        />
                        <textarea
                            value={newField.value}
                            onChange={(e) => setNewField({ ...newField, value: e.target.value })}
                            placeholder="Field value"
                            className="w-full bg-gray-700 rounded-lg p-2 outline-none h-20"
                        />
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="inline"
                                    checked={newField.inline}
                                    onChange={(e) => setNewField({ ...newField, inline: e.target.checked })}
                                    className="w-4 h-4"
                                />
                                <label htmlFor="inline" className="text-sm font-medium">
                                    Inline
                                </label>
                            </div>
                            <button
                                onClick={addField}
                                className="px-3 py-1 bg-green-600 rounded hover:bg-green-700 text-sm"
                            >
                                Add Field
                            </button>
                        </div>
                    </div>

                    {/* Existing Fields */}
                    {embed.fields &&
                    embed.fields.length>0 && (
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                            {embed.fields.map((field: Field, index: number) => (
                                <div key={index} className="bg-gray-750 rounded-lg p-3">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="font-medium text-sm">{field.name}</span>
                                        <button
                                            onClick={() => removeField(index)}
                                            className="text-red-400 hover:text-red-300 text-sm"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-300 mb-1">{field.value}</p>
                                    {field.inline && (
                                        <span className="text-xs bg-blue-600 px-2 py-1 rounded">Inline</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Preview */}
            <div className="bg-gray-800 rounded-xl p-6 w-full md:w-2/3">
                <h2 className="text-xl font-semibold mb-4">Preview</h2>
                <DiscordEmbedPreview embed={embed} />

                {/* JSON Output */}
                {/* <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">JSON Output</h3>
          <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm">
            {JSON.stringify(embed, null, 2)}
          </pre>
        </div> */}
            </div>
        </div>
    );
}