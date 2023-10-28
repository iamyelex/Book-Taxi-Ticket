import Image from "next/image";
import { useState } from "react";

import { CardsData } from "@/data/cardsData";

export default function Card() {
  const [selectPayment, setSelectPayment] = useState(0);

  return (
    <div>
      <h2 className="text-sm font-medium">Payment Methods</h2>

      <div className="mt-2 grid grid-cols-5 pl-2 ">
        {CardsData.map((card, i) => (
          <div
            key={card.name}
            className={`flex w-[50px] cursor-pointer items-center justify-center rounded-md border transition-all hover:scale-110 hover:border-yellow-400 ${
              i === selectPayment ? "border-2 border-yellow-400" : ""
            }`}
            onClick={() => setSelectPayment(i)}
          >
            <Image src={card.image} alt={card.name} width={30} height={50} />
          </div>
        ))}
      </div>
    </div>
  );
}
