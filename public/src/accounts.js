function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id)
}


function sortAccountsByLastName(accounts) {
  return accounts.sort((account1, account2) => {
    return account1.name.last.toLowerCase() < account2.name.last.toLowerCase() ? -1 : 1
  })
}

function getTotalNumberOfBorrows(account, books) {
  /*let accountBorrows = 0 
  for (let i=0; i < books.length; i++){
    const borrowArr = books[i].borrows.filter((borrow) => borrow.id === account.id)
    accountBorrows += borrowArr.length
  }
  return accountBorrows*/
  return books.reduce((acc, book) => acc += book.borrows.filter((borrow) => borrow.id === account.id).length, 0)
}


function getBooksPossessedByAccount(account, books, authors) {
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
