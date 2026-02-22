import { ourSpecsData } from "../../assets/assets";
import Title from "../Common/Title";

const OurSpecs = () => {
  return (
    <div className="px-6 my-20 max-w-6xl mx-auto">

      <Title
        visibleButton={false}
        title="¿Por qué elegirnos?"
        description="En TecnoMarket GT te ofrecemos productos originales, envíos rápidos y un soporte confiable para garantizarte una experiencia de compra segura y moderna."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 gap-y-10 mt-26">
        {ourSpecsData.map((spec, index) => (
          <div
            key={index}
            className="relative h-44 px-8 flex flex-col items-center justify-center w-full text-center border rounded-lg group"
            style={{
              backgroundColor: spec.accent + "10",
              borderColor: spec.accent + "30",
            }}
          >
            <h3 className="text-slate-800 font-medium">{spec.title}</h3>
            <p className="text-sm text-slate-600 mt-3">{spec.description}</p>

            <div
              className="absolute -top-5 text-white size-10 flex items-center justify-center rounded-md group-hover:scale-105 transition"
              style={{ backgroundColor: spec.accent }}
            >
              <spec.icon size={20} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurSpecs;
