import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import VerificationLayout from '../components/verification/VerificationLayout';
import StepWelcome from '../components/verification/StepWelcome';
import StepBasicDetails from '../components/verification/StepBasicDetails';
import StepIdentity from '../components/verification/StepIdentity';
import StepDuplicateCheck from '../components/verification/StepDuplicateCheck';
import StepGuardian from '../components/verification/StepGuardian';
import StepDevice from '../components/verification/StepDevice';
import StepPaymentPin from '../components/verification/StepPaymentPin';
import { useWallet } from '../context/WalletContext';

export default function VerificationPortal() {
  const location = useLocation();
  const { updateUser } = useWallet();
  const phoneNumber = location.state?.phoneNumber || '9876543210';

  // Current step: 1–7
  const [currentStep, setCurrentStep] = useState(1);

  // User data collected across steps
  const [userData, setUserData] = useState({});
  const [userAge, setUserAge] = useState(null);

  // Whether guardian verification is required (set dynamically in Step 2)
  const [requiresGuardian, setRequiresGuardian] = useState(false);

  const handleAgeChange = (age) => {
    setUserAge(age);
    setRequiresGuardian(age !== null && age >= 13 && age < 18);
  };

  const goNext = (data = {}) => {
    setUserData(prev => {
      const merged = { ...prev, ...data };
      const updates = {};
      if (merged.fullName) updates.name = merged.fullName;
      if (merged.email) updates.email = merged.email;
      if (phoneNumber) updates.mobile = phoneNumber;
      updateUser(updates);
      return merged;
    });

    let next = currentStep + 1;

    // Skip Step 5 (Guardian) if not a minor
    if (next === 5 && !requiresGuardian) {
      next = 6;
    }

    setCurrentStep(Math.min(next, 7));
  };

  const goBack = () => {
    let prev = currentStep - 1;

    // Skip back over Step 5 if not a minor
    if (prev === 5 && !requiresGuardian) {
      prev = 4;
    }

    setCurrentStep(Math.max(prev, 1));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepWelcome phoneNumber={phoneNumber} onNext={() => goNext()} />;
      case 2:
        return (
          <StepBasicDetails
            onNext={goNext}
            onBack={goBack}
            onAgeChange={handleAgeChange}
          />
        );
      case 3:
        return (
          <StepIdentity
            onNext={() => goNext()}
            onBack={goBack}
            isMinor={requiresGuardian}
          />
        );
      case 4:
        return <StepDuplicateCheck onNext={() => goNext()} />;
      case 5:
        return (
          <StepGuardian
            onNext={() => goNext()}
            onBack={goBack}
            userAge={userAge}
          />
        );
      case 6:
        return <StepDevice onNext={() => goNext()} onBack={goBack} />;
      case 7:
        return <StepPaymentPin onBack={goBack} />;
      default:
        return null;
    }
  };

  return (
    <VerificationLayout
      currentStep={currentStep}
      phoneNumber={phoneNumber}
      requiresGuardian={requiresGuardian}
    >
      {renderStep()}
    </VerificationLayout>
  );
}
