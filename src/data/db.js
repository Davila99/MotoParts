// src/data/db.js
export const productsData = [
  {
    id: 1,
    name: "Calculadora Científica Casio",
    description: "Calculadora científica con funciones avanzadas",
    images: ["/images/calculadora.png"], // la imagen debe estar en public
    price: 20.0, // precio de oferta
    originalPrice: 25.0,
    createdAt: "2025-11-28T10:00:00Z",
    rating: [{ rating: 5 }, { rating: 4 }, { rating: 5 }]
  },
  {
    id: 2,
    name: "Cuaderno de Costura",
    description: "Cuaderno espiral tamaño carta",
    images: ["/images/cuadernocosturado.png"],
    price: 4.0,
    originalPrice: 5.0,
    createdAt: "2025-11-27T12:00:00Z",
    rating: [{ rating: 4 }, { rating: 4 }]
  },
  {
    id: 3,
    name: "Cuaderno Espiral",
    description: "Cuaderno espiral para apuntes escolares",
    images: ["/images/cuadernoespiral.png"],
    price: 3.5,
    originalPrice: 4.0,
    createdAt: "2025-11-26T15:00:00Z",
    rating: [{ rating: 3 }, { rating: 4 }, { rating: 5 }]
  },
  {
    id: 4,
    name: "Engrapadora",
    description: "Engrapadora metálica resistente",
    images: ["/images/engrapadora.png"],
    price: 6.0,
    originalPrice: 7.0,
    createdAt: "2025-11-25T09:00:00Z",
    rating: [{ rating: 5 }, { rating: 5 }]
  }
];
