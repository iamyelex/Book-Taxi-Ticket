// import Confetti from "react-confetti/dist/react-confetti";

import ConfettiComponent from "./Confetti";

export default function page() {
  return (
    <>
      <ConfettiComponent />
      <div className="flex h-96 items-center justify-center">
        <p className="text-4xl font-bold text-yellow-400">
          Thank you for choosing us. we hope to see you soon
        </p>
      </div>
    </>
  );
}
