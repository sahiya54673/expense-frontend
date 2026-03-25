import axios from 'axios';

const API_URL = 'https://expense-backend-jade-three.vercel.app/api/transactions';


const getTransactions = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const addTransaction = async (transaction) => {
  const response = await axios.post(API_URL, transaction);
  return response.data;
};

const deleteTransaction = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

const transactionService = {
  getTransactions,
  addTransaction,
  deleteTransaction,
};

export default transactionService;
