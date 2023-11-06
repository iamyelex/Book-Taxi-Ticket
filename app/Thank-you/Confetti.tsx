"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const ConfettiComponent = () => {
  const [isConfettiActive, setConfettiActive] = useState(false);

  // Function to trigger the confetti effect
  useEffect(() => {
    const activateConfetti = () => {
      setConfettiActive(true);

      // After a duration, you can turn off the confetti
      setTimeout(() => {
        setConfettiActive(false);
      }, 7000); // 5000 milliseconds (5 seconds) in this example
    };

    activateConfetti();
  }, []);

  return (
    <div>
      {/* <button onClick={activateConfetti}>Activate Confetti</button> */}
      {isConfettiActive && <Confetti />}
    </div>
  );
};

export default ConfettiComponent;
