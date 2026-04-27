import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, FileText, Lock, Scale, Info } from 'lucide-react';

const TerminosPage = () => {
    const navigate = useNavigate();

    const termsContent = `TÉRMINOS Y CONDICIONES DE USO — LEADBOOK

1. ACEPTACIÓN DE LOS TÉRMINOS
Al acceder o utilizar LeadBook, usted acepta estar sujeto a estos Términos y Condiciones. Si no está de acuerdo, no utilice el servicio.

2. DESCRIPCIÓN DEL SERVICIO
LeadBook es una plataforma SaaS que utiliza inteligencia artificial para generar contenido de marketing automatizado (PDFs, posts, videos, emails y más) para negocios y profesionales.

3. REGISTRO Y CUENTAS
El usuario es responsable de mantener la confidencialidad de sus credenciales. Debe proporcionar información veraz al registrarse. LeadBook puede suspender cuentas con información falsa.

4. USO PERMITIDO Y PROHIBIDO
Permitido: uso comercial legítimo, generación de contenido propio.
Prohibido: spam, contenido ilegal, ingeniería inversa, reventa sin autorización.

5. PROPIEDAD INTELECTUAL
El usuario retiene los derechos sobre el contenido que sube. LeadBook retiene los derechos sobre la plataforma, algoritmos y diseño. El contenido generado por IA puede ser usado libremente por el usuario dentro del plan contratado.

6. PAGOS Y SUSCRIPCIONES
Los planes se cobran mensual o anualmente según lo elegido. Los pagos son procesados de forma segura. No se realizan reembolsos por períodos ya utilizados.

7. CANCELACIÓN
El usuario puede cancelar su suscripción en cualquier momento desde su perfil. El acceso continúa hasta el fin del período pagado.

8. LIMITACIÓN DE RESPONSABILIDAD
LeadBook no garantiza resultados específicos. El servicio se provee "tal cual". No nos responsabilizamos por pérdidas derivadas del uso del contenido generado.

9. USO DE INTELIGENCIA ARTIFICIAL
El contenido generado por IA puede contener errores. El usuario es responsable de revisar y validar el contenido antes de publicarlo.

10. MODIFICACIONES
LeadBook puede modificar estos términos con previo aviso de 30 días. El uso continuado implica aceptación.`;

    const privacyContent = `POLÍTICA DE PRIVACIDAD — LEADBOOK

1. INFORMACIÓN QUE RECOPILAMOS
Recopilamos: nombre, email, datos de la empresa, imágenes subidas, contenido generado e información de uso de la plataforma.

2. USO DE LA INFORMACIÓN
Utilizamos sus datos para: proveer el servicio, mejorar la plataforma, enviar comunicaciones relevantes y cumplir obligaciones legales.

3. PROTECCIÓN DE DATOS
Implementamos medidas técnicas y organizativas para proteger su información. Los datos se almacenan en servidores seguros con cifrado.

4. COMPARTIR DATOS
No vendemos sus datos. Podemos compartirlos con proveedores de servicio necesarios para operar la plataforma (hosting, pagos, emails) bajo acuerdos de confidencialidad.

5. COOKIES
Usamos cookies para recordar su sesión y preferencias. Puede desactivarlas en su navegador, aunque esto puede afectar la funcionalidad.

6. RETENCIÓN DE DATOS
Conservamos sus datos mientras la cuenta esté activa. Al cancelar, los datos se eliminan en 90 días salvo obligación legal.

7. SUS DERECHOS
Tiene derecho a: acceder, corregir o eliminar sus datos personales. Para ejercerlos, contáctenos en privacidad@leadbook.app`;

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
                        Términos y Privacidad
                    </h1>
                    <p className="text-zinc-500 text-lg">
                        Última actualización: Abril 2026
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-16">
                    {/* Terms Section */}
                    <section id="terminos" className="relative p-8 md:p-10 rounded-3xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                                <FileText className="w-5 h-5 text-blue-400" />
                            </div>
                            <h2 className="text-2xl font-semibold text-zinc-100">
                                Términos de Servicio
                            </h2>
                        </div>
                        <div className="space-y-6 text-zinc-400 leading-relaxed whitespace-pre-line">
                            {termsContent}
                        </div>
                    </section>

                    {/* Privacy Section */}
                    <section id="privacidad" className="relative p-8 md:p-10 rounded-3xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-2.5 rounded-xl bg-zinc-950 border border-zinc-800">
                                <Shield className="w-5 h-5 text-emerald-400" />
                            </div>
                            <h2 className="text-2xl font-semibold text-zinc-100">
                                Política de Privacidad
                            </h2>
                        </div>
                        <div className="space-y-6 text-zinc-400 leading-relaxed whitespace-pre-line">
                            {privacyContent}
                        </div>
                    </section>
                </div>

                {/* Footer Disclaimer */}
                <div className="mt-20 pt-10 border-t border-zinc-800/50 text-center">
                    <p className="text-zinc-500 text-sm mb-2">
                        © 2026 LeadBook. Todos los derechos reservados.
                    </p>
                    <p className="text-zinc-600 text-xs">
                        Si tienes dudas, contáctanos en legal@leadbook.app o privacidad@leadbook.app
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TerminosPage;
