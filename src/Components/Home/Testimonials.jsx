import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Méndez",
    comment:
      "Excelente servicio. Lleve mi moto para mantenimiento y quedó como nueva. Muy recomendados.",
    rating: 5,
  },
  {
    name: "Luis Herrera",
    comment:
      "Compré repuestos originales y accesorios. Buena atención y precios justos.",
    rating: 5,
  },
  {
    name: "Marvin López",
    comment:
      "Rápido diagnóstico y solución inmediata. Se nota la experiencia en mecánica.",
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-slate-100 py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-4">
          Lo que dicen nuestros clientes
        </h2>
        <p className="text-slate-600 mb-12">
          En Moto Parts J&J trabajamos con compromiso y calidad en cada servicio.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="flex justify-center mb-4">
                {[...Array(item.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              <p className="text-slate-600 mb-4 text-sm italic">
                “{item.comment}”
              </p>

              <h4 className="font-semibold text-slate-800">
                {item.name}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;