import React from "react";
import Header from "./header";

const cards = [
  {
    title: "Card 1",
    description: "Deskripsi card 1",
    imageUrl: "/card-1.jpg",
  },
  {
    title: "Card 2",
    description: "Deskripsi card 2",
    imageUrl: "/card-2.jpg",
  },
  // dan seterusnya...
];

function HomePage() {
  return (
    <div>
      <Header />
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4">
          {cards.map((card) => (
            <div className="relative rounded-lg shadow-lg">
              <img
                src={card.imageUrl}
                alt={card.title}
                className="w-full h-64 rounded-t-lg"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{card.title}</div>
                <p className="text-gray-700 text-base">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
