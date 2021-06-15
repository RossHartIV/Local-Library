function getTotalBooksCount(books) {
  // I don't know what to say, it's just how many books are in the library
  return books.length
}

function getTotalAccountsCount(accounts) {
  // similar to above, butnow how many accounts are registered I guess
  return accounts.length
}

function getBooksBorrowedCount(books) {
  // Here, I used a .reduce method to count up (on the accumulator) every time that it finds a book with the first borrows object having a false returned value
  return books.reduce((acc,book) => !book.borrows[0].returned ? acc+=1: acc,0)
}

function getMostCommonGenres(books) {
  // For this one I also used .reduce, but now the accumulator is an array, we loop through books and check if the genre for the book exsists within the accumulator array
  // if so we just add one to the count for that object, and if not we add a whole new object with the genre as a name and start the count at 1, then return the array
  // of objects, sorted by object's count and cut to the first 5 of the sorted array
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
  // Using another reduce with an array accumulator, we can push an object for each book now with it's number of borrows as our count, then as above return the array
  // of objects, sorted by object's count and cut to the first 5 of the sorted array
  return books.reduce((acc,book) => {
    acc.push({name: book.title, count: book.borrows.length})
    return acc},[]).sort((bookA,bookB) => bookB.count-bookA.count).slice(0,5)
}

function getMostPopularAuthors(books, authors) {
  // For this last function we again use a .reduce with an array accumulator, here looping through books and if a book's author's name is not a value of an object's name of our array
  // we create a new object for that author and add the number of borrows to their count, otherwise we just add the number of borrows to the author's current count
  // we then return the array of objects, sorted by object's count and cut to the first 5 of the sorted array
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
