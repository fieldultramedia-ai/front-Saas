import { Link } from 'react-router-dom';

export default function FooterSection() {
  return (
    <footer className="bg-[#0a0e17] py-10 sm:py-14 md:py-20 px-4 sm:px-6 md:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 sm:gap-10 md:gap-12 mb-10 sm:mb-16">
          <div className="max-w-xs">
            <div className="text-xl font-headline text-white mb-6">LeadBook</div>
            <p className="text-slate-500 text-sm leading-relaxed">Revolucionando el marketing inmobiliario con inteligencia artificial generativa de alto nivel.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            {[
              { title: 'Producto', links: [{ name: 'Funciones', href: '#' }, { name: 'Formatos', href: '#' }, { name: 'Precios', href: '#' }] },
              { title: 'Empresa', links: [{ name: 'Nosotros', href: '#' }, { name: 'Blog', href: '#' }, { name: 'Carreras', href: '#' }] },
              { title: 'Legal', links: [{ name: 'Privacy Policy', href: '/terminos' }, { name: 'Terms of Service', href: '/terminos' }, { name: 'Status', href: '#' }] },
            ].map((col, i) => (
              <div key={i}>
                <h5 className="text-white text-xs font-label uppercase tracking-widest mb-6">{col.title}</h5>
                <ul className="space-y-4 text-sm text-slate-500">
                  {col.links.map((l, j) => (
                    <li key={j}>
                      {l.href.startsWith('/') ? (
                        <Link className="hover:text-[#00D4FF] transition-colors" to={l.href}>{l.name}</Link>
                      ) : (
                        <a className="hover:text-[#00D4FF] transition-colors" href={l.href}>{l.name}</a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 sm:pt-12 border-t border-white/5 gap-4">
          <p className="text-xs font-body text-slate-500">© 2025 LeadBook. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
