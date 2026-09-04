/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_USER, 
  INITIAL_WALLET, 
  INITIAL_CONTACTS, 
  INITIAL_TRANSACTIONS, 
  SECURITY_METRICS 
} from '../utils/mockData';

const WalletContext = createContext(null);

export const WalletProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('cf_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [wallet, setWallet] = useState(() => {
    const saved = localStorage.getItem('cf_wallet');
    return saved ? JSON.parse(saved) : INITIAL_WALLET;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('cf_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem('cf_contacts');
    return saved ? JSON.parse(saved) : INITIAL_CONTACTS;
  });

  const [security] = useState(SECURITY_METRICS);
  const [isLoading, setIsLoading] = useState(false);

  const updateUser = (partialUpdates) => {
    setUser((prev) => {
      const updated = { ...prev, ...partialUpdates };
      localStorage.setItem('cf_user', JSON.stringify(updated));
      return updated;
    });
  };

  // Sync to local storage for persistence across reloads
  useEffect(() => {
    localStorage.setItem('cf_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('cf_wallet', JSON.stringify(wallet));
  }, [wallet]);

  useEffect(() => {
    localStorage.setItem('cf_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('cf_contacts', JSON.stringify(contacts));
  }, [contacts]);

  /**
   * Mock transfer by mobile number
   */
  const sendMoney = async ({ recipientMobile, recipientName, amount, note = '' }) => {
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const numericAmount = parseFloat(amount);
    if (numericAmount > wallet.balance) {
      setIsLoading(false);
      throw new Error('Insufficient balance in your CreditFlow wallet.');
    }

    const newTx = {
      id: `tx_${Date.now().toString().slice(-6)}`,
      type: 'SENT',
      recipientName: recipientName || `User (${recipientMobile.slice(-4)})`,
      recipientMobile,
      senderName: user.name,
      senderMobile: user.mobile,
      amount: numericAmount,
      timestamp: new Date().toISOString(),
      status: 'SUCCESS',
      note: note || 'Transfer via CreditFlow',
      referenceId: `CF-${Math.floor(100000000 + Math.random() * 900000000)}`,
      category: 'Transfer',
      fee: 0,
    };

    setWallet((prev) => ({
      ...prev,
      balance: prev.balance - numericAmount,
      monthlySpent: prev.monthlySpent + numericAmount,
    }));

    setTransactions((prev) => [newTx, ...prev]);

    // Check if recipient is in contacts, if not add them
    setContacts((prev) => {
      const exists = prev.some((c) => c.mobile === recipientMobile);
      if (!exists) {
        return [
          {
            id: `c_${Date.now()}`,
            name: recipientName || `User (${recipientMobile.slice(-4)})`,
            mobile: recipientMobile,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${recipientMobile}`,
            isFrequent: false,
            lastPaid: new Date().toISOString().split('T')[0],
          },
          ...prev,
        ];
      }
      return prev;
    });

    setIsLoading(false);
    return newTx;
  };

  /**
   * Mock receive money / simulation
   */
  const receiveMoney = async ({ senderMobile, senderName, amount, note = '' }) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));

    const numericAmount = parseFloat(amount);
    const newTx = {
      id: `tx_${Date.now().toString().slice(-6)}`,
      type: 'RECEIVED',
      recipientName: user.name,
      recipientMobile: user.mobile,
      senderName: senderName || `Sender (${senderMobile.slice(-4)})`,
      senderMobile,
      amount: numericAmount,
      timestamp: new Date().toISOString(),
      status: 'SUCCESS',
      note: note || 'Received via mobile number',
      referenceId: `CF-${Math.floor(100000000 + Math.random() * 900000000)}`,
      category: 'Deposit',
      fee: 0,
    };

    setWallet((prev) => ({
      ...prev,
      balance: prev.balance + numericAmount,
    }));

    setTransactions((prev) => [newTx, ...prev]);
    setIsLoading(false);
    return newTx;
  };

  return (
    <WalletContext.Provider
      value={{
        user,
        setUser,
        updateUser,
        wallet,
        transactions,
        contacts,
        security,
        isLoading,
        sendMoney,
        receiveMoney,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
