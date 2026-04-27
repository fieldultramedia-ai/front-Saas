import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, FileText, Lock, Scale } from 'lucide-react';

const TerminosPage = () => {
    const navigate = useNavigate();

    const sections = [
        {
            title: "Términos de Servicio",
            icon: <FileText className="w-5 h-5 text-blue-400" />,
            content: "Bienvenido a LeadBook. Al acceder y utilizar nuestra plataforma, usted acepta cumplir y estar sujeto a los siguientes términos y condiciones de uso. Nuestra plataforma proporciona herramientas de automatización y generación de leads diseñadas para optimizar sus procesos comerciales."
        },
        {
            title: "Uso de la Plataforma",
            icon: <Shield className="w-5 h-5 text-purple-400" />,
            content: "El usuario se compromete a utilizar la plataforma de manera responsable y legal. Queda estrictamente prohibido el uso de LeadBook para actividades fraudulentas, spam o cualquier acción que viole los derechos de terceros o las leyes locales e internacionales de protección de datos."
        },
        {
            title: "Privacidad y Datos",
            icon: <Lock className="w-5 h-5 text-emerald-400" />,
            content: "Su privacidad es nuestra prioridad. Los datos recopilados se procesan de acuerdo con nuestra Política de Privacidad. LeadBook utiliza protocolos de seguridad avanzados para proteger la información de sus clientes y los leads generados a través de la plataforma."
        },
        {
            title: "Responsabilidades",
            icon: <Scale className="w-5 h-5 text-orange-400" />,
            content: "LeadBook no se hace responsable por el uso inadecuado de la información obtenida a través de nuestras herramientas. Es responsabilidad del usuario asegurar que el contacto con los leads se realice cumpliendo con las normativas vigentes (GDPR, LGPD, etc.)."
        }
    ];

    return (
        <div className="min-h-screen bg-[#030303] text-zinc-100 font-sans selection:bg-blue-500/30">
            {/* Background Decor */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            </div>

            <div className="relative max-w-4xl mx-auto px-6 py-20">
                {/* Header */}
                <button 
                    onClick={() => navigate(-1)}
                    className="group mb-12 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-200"
                >
                    <div className="p-2 rounded-full bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 group-hover:bg-zinc-800 transition-all">
                        <ArrowLeft className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium">Volver</span>
                </button>

                <div className="mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-white via-zinc-400 to-zinc-600 bg-clip-text text-transparent">
                        Términos y Condiciones
                    </h1>
                    <p className="text-zinc-500 text-lg">
                        Última actualización: 27 de abril de 2026
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-12">
                    {sections.map((section, idx) => (
                        <section key={idx} className="group relative p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm hover:bg-zinc-900/60 hover:border-zinc-700/50 transition-all duration-300">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                                    {section.icon}
                                </div>
                                <h2 className="text-xl font-semibold text-zinc-100">
                                    {section.title}
                                </h2>
                            </div>
                            <p className="text-zinc-400 leading-relaxed">
                                {section.content}
                            </p>
                        </section>
                    ))}
                </div>

                {/* Footer Disclaimer */}
                <div className="mt-20 pt-10 border-t border-zinc-800/50 text-center">
                    <p className="text-zinc-500 text-sm">
                        © 2026 LeadBook. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TerminosPage;
