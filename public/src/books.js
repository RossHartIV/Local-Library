function findAuthorById(authors, id) {
  return authors.map((item) => item).find((author) => author.id === id)
  // wowee look at that a map function!!!!!!!!
}

function findBookById(books, id) {
  return books.find((book) => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  // First Attempt:
  /*let finalArray = [[],[]]
  for (let book of books){
    if (book.borrows.some((borrow) => !borrow.returned)){
      finalArray[0].push(book)
    }
    else{
      finalArray[1].push(book)
    }
  }
  return finalArray*/
  return [books.filter((book) => book.borrows.some((borrow) => !borrow.returned)), books.filter((book) => book.borrows.every((borrow) => borrow.returned))]
}

function getBorrowersForBook(book, accounts) {
  const  borrowedAccounts = accounts.filter((account) => book.borrows.some((borrow) => borrow.id === account.id))
  return borrowedAccounts.map((account) => {
    account.returned = book.borrows.find((borrow) => borrow.id === account.id).returned
    return account})
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
