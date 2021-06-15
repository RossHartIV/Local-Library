function findAuthorById(authors, id) {
  // Here I am just searching through authors to find the one with the correct author-id, using a .find method
  return authors.find((author) => author.id === id)
}

function findBookById(books, id) {
  // basicallly the same as above but now looping through books and finding the correct book-id lol
  return books.find((book) => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  // First Attempt:
  // basically loop through books and each book's borrows, and if it's got any borrow with a false returned value (check with a .some method) then I push it to the first (zeroeth?) 
  // array, and if it does not then I push to the second (first?) array
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

  // Condensed version using two .filter methods into a larger array:
  return [books.filter((book) => book.borrows.some((borrow) => !borrow.returned)), books.filter((book) => book.borrows.every((borrow) => borrow.returned))]
}

function getBorrowersForBook(book, accounts) {
  // first I used a .filter method to cut down to accounts to those which have borrowed the book, which I check for using a .some method on the book.borrows for each account,
  // then I map that filtered array to one which includes the returned status of each borrower (account which has borrowed the book) within each account object
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
