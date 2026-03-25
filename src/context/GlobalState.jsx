import React, { createContext, useReducer, useEffect } from 'react';
import transactionService from '../services/transactionService';

// Initial state
const initialState = {
  transactions: [],
  error: null,
  loading: true,
  currency: { symbol: '$', code: 'USD' }
};

// Reducer
const AppReducer = (state, action) => {
  switch(action.type) {
    case 'GET_TRANSACTIONS':
      return {
        ...state,
        loading: false,
        transactions: action.payload
      }
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
      }
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload]
      }
    case 'SET_CURRENCY':
      return {
        ...state,
        currency: action.payload
      }
    case 'TRANSACTION_ERROR':
      return {
        ...state,
        error: action.payload
      }
    default:
      return state;
  }
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function setCurrency(currency) {
    dispatch({
      type: 'SET_CURRENCY',
      payload: currency
    });
  }

  async function getTransactions() {
    try {
      const res = await transactionService.getTransactions();
      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response?.data?.error || 'Server Error'
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await transactionService.deleteTransaction(id);
      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response?.data?.error || 'Server Error'
      });
    }
  }

  async function addTransaction(transaction) {
    try {
      const res = await transactionService.addTransaction(transaction);
      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response?.data?.error || 'Server Error'
      });
    }
  }

  return (<GlobalContext.Provider value={{
    transactions: state.transactions,
    error: state.error,
    loading: state.loading,
    currency: state.currency,
    setCurrency,
    getTransactions,
    deleteTransaction,
    addTransaction
  }}>
    {children}
  </GlobalContext.Provider>);
}
