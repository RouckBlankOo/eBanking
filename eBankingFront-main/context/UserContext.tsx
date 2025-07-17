import React, { createContext, ReactNode, useContext, useState } from "react";

export interface Card {
  id: string;
  type: string;
  name?: string;
  balance: string;
  cardNumber: string;
  gradient: string[];
  isFrozen?: boolean;
  isInfoHidden?: boolean;
  limit?: number;
  cardType?: "virtual" | "premium";
  pattern?: number;
}

interface User {
  fullName: string;
  email: string;
  phone: string;
  isAuthenticated: boolean;
  profileCompletionStatus: {
    personalInformation: boolean;
    addressInformation: boolean;
    identityVerification: boolean;
  };
}

interface UserContextType {
  user: User | null;
  cards: Card[];
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
  updateProfileStatus: (
    step: keyof User["profileCompletionStatus"],
    completed: boolean
  ) => void;
  isProfileComplete: () => boolean;
  addCard: (card: Omit<Card, "id">) => void;
  updateCard: (cardId: string, updates: Partial<Card>) => void;
  deleteCard: (cardId: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [cards, setCards] = useState<Card[]>([
    {
      id: "1",
      type: "Card",
      balance: "0.00",
      cardNumber: "4466 •••• •••• 7659",
      gradient: ["#667eea", "#764ba2"],
      isFrozen: false,
      isInfoHidden: true,
      limit: 1000,
    },
    {
      id: "2",
      type: "Card",
      balance: "0.00",
      cardNumber: "4466 •••• •••• 7659",
      gradient: ["#f093fb", "#f5576c"],
      isFrozen: false,
      isInfoHidden: true,
      limit: 2000,
    },
    {
      id: "3",
      type: "Card",
      balance: "0.00",
      cardNumber: "4466 •••• •••• 7659",
      gradient: ["#4facfe", "#00f2fe"],
      isFrozen: false,
      isInfoHidden: true,
      limit: 1500,
    },
  ]);

  const setUser = (userData: User | null) => {
    setUserState(userData);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUserState({ ...user, ...updates });
    }
  };

  const updateProfileStatus = (
    step: keyof User["profileCompletionStatus"],
    completed: boolean
  ) => {
    if (user) {
      setUserState({
        ...user,
        profileCompletionStatus: {
          ...user.profileCompletionStatus,
          [step]: completed,
        },
      });
    }
  };

  const isProfileComplete = () => {
    if (!user) return false;
    const { personalInformation, addressInformation, identityVerification } =
      user.profileCompletionStatus;
    return personalInformation && addressInformation && identityVerification;
  };

  const addCard = (cardData: Omit<Card, "id">) => {
    const newCard: Card = {
      ...cardData,
      id: Date.now().toString(),
    };
    setCards((prevCards) => [...prevCards, newCard]);
  };

  const updateCard = (cardId: string, updates: Partial<Card>) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId ? { ...card, ...updates } : card
      )
    );
  };

  const deleteCard = (cardId: string) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

  const logout = () => {
    setUserState(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        cards,
        setUser,
        updateUser,
        updateProfileStatus,
        isProfileComplete,
        addCard,
        updateCard,
        deleteCard,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
