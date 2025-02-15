import AttendeeDetails from "./Components/AttendeeDetails";
import Navbar from "./Components/Navbar";
import SelectTicket from "./Components/SelectTicket";
import TicketReady from "./Components/TicketReady";
import { useState, useEffect } from "react";

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    imageUrl: string;
    description: string;
  }>({
    name: "",
    email: "",
    imageUrl: "",
    description: "",
  });

  // Handle form data submission from the FirstComponent
  const handleFormData = (formData: {
    name: string;
    email: string;
    imageUrl: string;
    description: string;
  }) => {
    setFormData(formData); // Store form data in parent state
  };

  useEffect(() => {
    const storedStep = localStorage.getItem("currentStep");
    if (storedStep) {
      setCurrentStep(parseInt(storedStep));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentStep", currentStep.toString());
  }, [currentStep]);

  const goToNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1); // Move to the next step
    }
  };

  const goBackToTop = () => {
    setCurrentStep(1); // Go back to the first component
  };

  return (
    <>
      <Navbar />
      {currentStep === 1 && <SelectTicket goToNextStep={goToNextStep} />}
      {currentStep === 2 && (
        <AttendeeDetails
          handleSubmit={handleFormData}
          goToNextStep={goToNextStep}
          goBackToTop={goBackToTop}
        />
      )}
      {currentStep === 3 && (
        <TicketReady formData={formData} goBackToTop={goBackToTop} />
      )}
    </>
  );
};

export default App;
