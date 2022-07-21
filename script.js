let myLibrary = [];

function Book(author, title, pages, read=false) {
  // the constructor...
  this.author = author,
  this.title = title,
  this.pages = pages,
  this.read = read
}

function addBookToLibrary() {
  const form = document.querySelector("#addBookForm");
  const author = form.author.value;
  const title = form.title.value;
  const pages = form.pages.value;
  if (author === "" || title === "" || pages == "") {
    alert("You must fill all fields");
    return;
  }
  myLibrary.push(new Book(author, title, pages, false));
  clearInputs();
  hideForm();
  displayBooks();
}

function displayBooks() {
    const books = document.querySelector(".books");
    removeBooks();
    myLibrary.forEach((book, index) => {
      const newBook = createBook(book, index);

      books.appendChild(newBook);
    })
}

function removeBooks() {
  const books = document.querySelectorAll(".book");
  for (const book of books) {
    book.remove();    
  }
}

function createBook(book, index) {
  const bookContainer = document.createElement("div");
  bookContainer.classList.add("book");
  // bookContainer.dataset.index = index;s
  
  const title = document.createElement("div");
  title.classList.add("title")
  title.textContent = book.title;

  const author = document.createElement("div");
  author.classList.add("author");
  author.textContent = "BY " + book.author;

  const pages = document.createElement("div");
  pages.classList.add("pages");
  pages.textContent = "PAGES: " + book.pages;
  //read unread button
  const btnContainer = document.createElement("div");
  btnContainer.classList.add("btnContainer");
  const btn = document.createElement("button");
  btn.classList.add("btn");
  if (book.read) {
    btn.textContent = "READ";
    btn.classList.add("read");
  }
  else {
    btn.textContent = "NOT READ";
    btn.classList.add("unread");
  }
  btn.dataset.index = index;
  btnContainer.appendChild(btn);
  btn.id = "read";
  btn.onclick = changeReadStatus;

  //remove button
  const btnContainer2 = document.createElement("div");
  btnContainer2.classList.add("btnContainer");
  const btn2 = document.createElement("button");
  btn2.textContent = "REMOVE";
  btn2.classList.add("btn");
  btn2.id = "remove";
  btn2.dataset.index = index;
  btnContainer2.appendChild(btn2);
  btn2.onclick = removeBook;

  bookContainer.append(title, author, pages, btnContainer, btnContainer2);
  return bookContainer;
}

function hideForm() {
  const addBookForm = document.querySelector("#addBookForm");
  if (addBookForm.classList.contains("hide")) {
    addBookForm.classList.remove("hide");
  }
  else {
    addBookForm.classList.add("hide");
    clearInputs();
  }

} 

function clearInputs() {
  const form = document.querySelector("#addBookForm");
  //clear inputs
  form.author.value = "";
  form.title.value = "";
  form.pages.value = "";
}

function removeBook() {
  myLibrary.splice(this.dataset.index, 1);
  displayBooks();
}

function changeReadStatus() {
  if (this.classList.contains("unread")) {
    this.classList.remove("unread");
    this.textContent = "READ";
    this.classList.add("read");
    myLibrary[this.dataset.index].read = true; 
  }
  else {
    this.classList.remove("read");
    this.textContent = "NOT READ";
    this.classList.add("unread");
    myLibrary[this.dataset.index].read = false;
  }
}

document.querySelector("#addBookBtn").addEventListener("click", addBookToLibrary);
document.querySelector(".showBookForm").addEventListener("click", hideForm);
// document.querySelector("#remove").addEventListener("click", removeBook);