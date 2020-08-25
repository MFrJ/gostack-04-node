import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(transactionDTO : Omit<Transaction, "id">): Transaction {
    return this.transactionsRepository.create(transactionDTO);
  }
}

export default CreateTransactionService;
