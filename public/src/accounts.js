function findAccountById(accounts, id) {
  // loop through accounts and return the first object with matching id
  return accounts.find((account) => account.id === id)
}


function sortAccountsByLastName(accounts) {
  // need to sort by last name, so just use a sort function (keep in mind to convert to lower case)
  return accounts.sort((account1, account2) => {
    return account1.name.last.toLowerCase() < account2.name.last.toLowerCase() ? -1 : 1
  })
}

function getTotalNumberOfBorrows(account, books) {
  // loop through books, loop through borrows of each book, if a borrow has the correct account id, add it to a list, then add the lengths of each of each of those lists together
  /*let accountBorrows = 0 
  for (let i=0; i < books.length; i++){
    const borrowArr = books[i].borrows.filter((borrow) => borrow.id === account.id)
    accountBorrows += borrowArr.length
  }
  return accountBorrows*/

  // Here's a faster method that's probably nicer for your processor because it uses a .reduce method
  return books.reduce((acc, book) => acc += book.borrows.filter((borrow) => borrow.id === account.id).length, 0)
}


function getBooksPossessedByAccount(account, books, authors) {
  // want to return an array with all of an account holders currently checked out items, so we loop through books, then check each book's "borrows" array to see if it 
  // has an object with the correct account id with a false returned value, if it does then we find the correct author associated with the book and add it to the book object
  // we are lookking at, then push the modified book object to the array which we are returning
  return books.reduce((acc, book) => {
    if (book.borrows.some((borrow) => borrow.id === account.id && borrow.returned === false)) {
      book.author = authors.find((auth) => auth.id === book.authorId)
      acc.push(book)
    }
    return acc
  }, [])
}


module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
