function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  return books.reduce((acc,book) => !book.borrows[0].returned ? acc+=1: acc,0)
}

function getMostCommonGenres(books) {
  return books.reduce((acc,book) => {
    if (acc.some((genre) => genre.name === book.genre)){
      acc.find((genre) => genre.name === book.genre).count++
    } 
    else{
      acc.push({name: book.genre, count: 1})
    }
    return acc}, []).sort((genreA,genreB) => genreB.count-genreA.count).slice(0,5)
}

function getMostPopularBooks(books) {
  return books.reduce((acc,book) => {
    acc.push({name: book.title, count: book.borrows.length})
    return acc},[]).sort((bookA,bookB) => bookB.count-bookA.count).slice(0,5)
}

function getMostPopularAuthors(books, authors) {
  return books.reduce((acc,book)=>{
    let bookAuthor = authors.find((authorid) => authorid.id === book.authorId).name.first+' '+authors.find((authorid) => authorid.id === book.authorId).name.last
    if (acc.some((author) => author.name === bookAuthor)){
      acc.find((author) => author.name === bookAuthor).count += book.borrows.length
    }
    else{
      acc.push({name: bookAuthor,count:book.borrows.length})
    }
  return acc},[]).sort((authorA,authorB) => authorB.count-authorA.count).slice(0,5)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
