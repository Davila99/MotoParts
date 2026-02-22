import { Link } from "react-router-dom";
import { Phone, MapPin, Wrench, ShoppingCart } from "lucide-react";
import logo from "/logo.png";

const Footer = () => {
  const linkSections = [
    {
      title: "SERVICIOS",
      links: [
        { text: "Mantenimiento preventivo", path: "/", icon: Wrench },
        { text: "Reparación general", path: "/", icon: Wrench },
        { text: "Cambio de aceite", path: "/", icon: Wrench },
        { text: "Diagnóstico técnico", path: "/", icon: Wrench },
      ],
    },
    {
      title: "PRODUCTOS",
      links: [
        { text: "Repuestos originales", path: "/", icon: ShoppingCart },
        { text: "Accesorios para moto", path: "/", icon: ShoppingCart },
        { text: "Cascos y protección", path: "/", icon: ShoppingCart },
        { text: "Lubricantes y baterías", path: "/", icon: ShoppingCart },
      ],
    },
    {
      title: "CONTACTO",
      links: [
        { text: "Claro: 8203-0726", path: "/", icon: Phone },
        { text: "Tigo: 8183-6031", path: "/", icon: Phone },
        { text: "Ubicación disponible por llamada", path: "/", icon: MapPin },
      ],
    },
  ];

  return (
    <footer className="mx-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-slate-500/30 text-slate-500">

          {/* Logo y descripción */}
          <div>
            <Link to="/" className="flex items-center gap-2">
              <img
                src={logo}
                alt="Moto Parts J&J"
                className="h-12 transition-transform duration-300 hover:scale-105"
              />
            </Link>

            <p className="max-w-102.5 mt-6 text-sm">
              En <strong>Moto Parts J&J</strong> ofrecemos servicio profesional de 
              <strong> mantenimiento, reparación y venta de repuestos y accesorios para motocicletas</strong>.
              Calidad, confianza y atención personalizada para que tu moto siempre esté en óptimas condiciones.
            </p>
          </div>

          {/* Secciones */}
          <div className="flex flex-wrap justify-between w-full md:w-[50%] gap-6 text-sm">
            {linkSections.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-slate-700 md:mb-5 mb-3">
                  {section.title}
                </h3>
                <ul className="space-y-2.5">
                  {section.links.map((link, i) => (
                    <li key={i} className="flex items-center gap-2">
                      {link.icon && (
                        <link.icon className="w-4 h-4 text-red-600" />
                      )}
                      <Link to={link.path} className="hover:text-red-600 transition">
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="py-4 text-sm text-slate-500 text-center">
          © {new Date().getFullYear()} Moto Parts J&J. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;