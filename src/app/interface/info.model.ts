export interface Iinfo {
    firstName: string;
    lastName: string;
    userEmail: string;
    userPeselorPassport: string;
    address: {
        inputAddress: string;
        inputAddress2: string;
        inputCountry: string;
        inputState: string;
        inputCity: string;
        inputZip: string;
        inputPhone: string;
    },
    isStudent: string,
    ageCheck: string,
    isAlreadyEmployed: string,
    contractType: string,
    isWageAboveThreshold: string,
    netWage: string,
    iAgreePP: string
  }