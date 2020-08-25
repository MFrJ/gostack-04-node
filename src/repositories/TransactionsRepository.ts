import Transaction from '../models/Transaction';
import { uuid } from 'uuidv4';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    const incomeReducer = (accumulator: number, item: Transaction) => {
      if (item.type === 'income'){
        return accumulator + item.value ;
      }
      return accumulator;
    };

    const income = this.transactions.reduce(incomeReducer, 0);

    const outcomeReducer = (accumulator: number, item: Transaction) => {
      if (item.type === 'outcome'){
        return accumulator + item.value ;
      }
      return accumulator;
    };

    const outcome = this.transactions.reduce(outcomeReducer, 0);

    const balance = {
      income,
      outcome,
      total: income - outcome
    }
    return balance;
  }

  public create({ title, type, value } : Omit<Transaction, "id">): Transaction {
    const transaction = {
      title,
      type, 
      value,
      id: uuid()
    } 

    const balance = this.getBalance();

    if (type === 'outcome' && value > balance.total){
      throw new Error('Insufficient funds!');
    }
    
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
