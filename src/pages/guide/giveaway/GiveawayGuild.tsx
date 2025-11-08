import { useState } from "react";
import {
  GiftIcon,
  CheckCircle,
  Megaphone,
  Clock,
  Crown,
  ClipboardList,
  Users,
  AlertTriangle,
  ChevronRight,
  Shield,
  MessageSquare,
} from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";

// Props interface for the component


const GiveawayGuide = () => {
  const [activeSection, setActiveSection] = useState("flow");
  const { language } = useLanguage()
  const t = language.GAGuide;

  const sections = [
    { id: "flow", label: t.sections.flow, icon: ClipboardList },
    { id: "requirements", label: t.sections.requirements, icon: Shield },
    { id: "tips", label: t.sections.tips, icon: Crown },
    { id: "support", label: t.sections.support, icon: MessageSquare },
  ];

  const flowSteps = [
    {
      title: t.flowSteps.initiate,
      icon: GiftIcon,
      details: t.flowDetails.initiate,
    },
    {
      title: t.flowSteps.approval,
      icon: CheckCircle,
      details: t.flowDetails.approval,
    },
    {
      title: t.flowSteps.announcement,
      icon: Megaphone,
      details: t.flowDetails.announcement,
    },
    {
      title: t.flowSteps.participation,
      icon: Users,
      details: t.flowDetails.participation,
    },
    {
      title: t.flowSteps.completion,
      icon: Clock,
      details: t.flowDetails.completion,
    },
    {
      title: t.flowSteps.results,
      icon: Crown,
      details: t.flowDetails.results,
    },
  ];

  const requirements = [
    {
      title: t.requirementSections.host,
      points: t.hostRequirements,
    },
    {
      title: t.requirementSections.participant,
      points: t.participantRequirements,
    },
  ];

  const tips = t.tips;
  const support = t.supportMessages;

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 relative bg-white border-3 border-black rounded-2xl shadow-brutal-lg p-10">
          <div className="absolute top-4 left-4 w-5 h-5 bg-pink-400 border-2 border-black rounded-full"></div>
          <div className="absolute top-4 right-4 w-4 h-4 bg-yellow-400 border-2 border-black rotate-45"></div>
          <div className="absolute bottom-4 left-4 w-4 h-4 bg-green-400 border-2 border-black rounded-sm"></div>
          <div className="absolute bottom-4 right-4 w-3 h-3 bg-blue-400 border-2 border-black rounded-full"></div>

          <h1 className="text-5xl md:text-6xl font-black text-black mb-4">
            {t.title}
          </h1>
          <p className="text-lg text-gray-700 font-medium">
            {t.subtitle}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {sections.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`relative group flex items-center gap-2 px-6 py-3 font-black border-3 border-black rounded-xl transition-all duration-300 hover:translate-x-1 hover:translate-y-1 ${activeSection === item.id
                ? "bg-gradient-to-r from-yellow-300 to-orange-400 text-black shadow-brutal"
                : "bg-white text-black shadow-brutal hover:bg-gray-50"
                }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
              {activeSection === item.id && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-yellow-400 border border-black rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Process Flow Section */}
        {activeSection === "flow" && (
          <div className="space-y-8">
            <h2 className="text-4xl font-black text-center mb-10 text-black">
              🎯 {t.processTitle}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {flowSteps.map((step, index) => (
                <div
                  key={index}
                  className="relative bg-white border-3 border-black rounded-2xl p-6 shadow-brutal transition-all duration-300 hover:-translate-y-1 hover:shadow-brutal-lg"
                >
                  <div className="absolute top-2 left-2 right-2 bottom-2 bg-gradient-to-br from-yellow-300/20 to-orange-300/20 rounded-xl -z-10"></div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-yellow-400 border-2 border-black rounded-full flex items-center justify-center font-black text-white">
                      {index + 1}
                    </div>
                    <h3 className="text-2xl font-black text-black">
                      {step.title}
                    </h3>
                  </div>
                  <div className="flex items-start gap-3 text-gray-700 font-medium leading-relaxed">
                    <ChevronRight size={16} className="text-black flex-shrink-0 mt-1" />
                    {step.details}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Requirements Section */}
        {activeSection === "requirements" && (
          <div className="space-y-8">
            <h2 className="text-4xl font-black text-center mb-10 text-black">
              🧩 {t.requirementsTitle}
            </h2>
            {requirements.map((req, index) => (
              <div
                key={index}
                className="relative bg-white border-3 border-black rounded-2xl p-6 shadow-brutal"
              >
                <div className="absolute top-2 left-2 right-2 bottom-2 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-xl -z-10"></div>
                <h3 className="text-2xl font-black text-black mb-4">
                  {req.title}
                </h3>
                <ul className="space-y-2 text-gray-700 font-medium">
                  {req.points.map((p: any, i: any) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle
                        size={18}
                        className="text-green-500 flex-shrink-0 mt-1"
                      />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Best Practices Section */}
        {activeSection === "tips" && (
          <div className="space-y-8">
            <h2 className="text-4xl font-black text-center mb-10 text-black">
              💡 {t.tipsTitle}
            </h2>
            <div className="bg-white border-3 border-black rounded-2xl p-8 shadow-brutal-lg relative">
              <div className="absolute top-2 left-2 right-2 bottom-2 bg-gradient-to-br from-green-300/10 to-blue-300/10 rounded-xl -z-10"></div>
              <ul className="space-y-4 text-gray-800 font-medium">
                {tips.map((tip: any, i: any) => (
                  <li key={i} className="flex items-start gap-3">
                    <AlertTriangle
                      size={18}
                      className="text-orange-500 flex-shrink-0 mt-1"
                    />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Support Section */}
        {activeSection === "support" && (
          <div className="space-y-8 text-center">
            <h2 className="text-4xl font-black text-center mb-10 text-black">
              💬 {t.supportTitle}
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {support.map((msg: any, i: any) => (
                <div
                  key={i}
                  className="bg-white border-3 border-black rounded-2xl p-6 shadow-brutal hover:-translate-y-1 hover:shadow-brutal-lg transition-all duration-300"
                >
                  <p className="text-gray-700 font-medium">{msg}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default GiveawayGuide;