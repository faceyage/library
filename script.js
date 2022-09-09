 
class Book {
  // the constructor...
  constructor(author, title, pages, read=false) {
    this.author = author,
    this.title = title,
    this.pages = pages,
    this.read = read
  }
}

class Library {
  constructor(myLibrary = []) {
    this.myLibrary = myLibrary;
    this.displayBooks();
  }

  addBook(form) {
    const author = form.author;
    const title = form.title;
    const pages = form.pages;
    this.myLibrary.push(new Book(author.value, title.value, pages.value, false));
    clearInputs();
    hideForm();
    this.displayBooks();
  }

  createBookElement(book, index) {
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
    const readBtn = document.createElement("button");
    readBtn.classList.add("btn");
    if (book.read) {
      readBtn.textContent = "READ";
      readBtn.classList.add("read");
    }
    else {
      readBtn.textContent = "NOT READ";
      readBtn.classList.add("unread");
    }
    readBtn.dataset.index = index ;
    btnContainer.appendChild(readBtn);
    readBtn.id = "read";
    readBtn.addEventListener("click", (e) => {this.changeReadStatus(e.target)});
    // readBtn.onclick = (e) => {this.changeReadStatus(e)};
  
    //remove button
    const btnContainer2 = document.createElement("div");
    btnContainer2.classList.add("btnContainer");
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "REMOVE";
    removeBtn.classList.add("btn");
    removeBtn.id = "remove";
    removeBtn.dataset.index = index;
    btnContainer2.appendChild(removeBtn);
    removeBtn.addEventListener("click", (e) => {this.removeBook(e.target)});
  
    bookContainer.append(title, author, pages, btnContainer, btnContainer2);
    return bookContainer;
  }
  
  displayBooks() {
    const books = document.querySelector(".books");
    this.removeBooks();
    this.myLibrary.forEach((book, index) => {
      const newBook = this.createBookElement(book, index);
      books.appendChild(newBook);
    })
  }
  
  removeBooks() {
    const books = document.querySelectorAll(".book");
    for (const book of books) {
      book.remove();    
    }
  }

  removeBook(index) {
    console.log(index);
    this.myLibrary.splice(index, 1);
    this.displayBooks();
  }

  changeReadStatus(e) {
    console.log("E:",e);
    console.log("This:",this);
    console.log("Library: ", this.myLibrary);
    if (e.classList.contains("unread")) {
      e.classList.remove("unread");
      e.textContent = "READ";
      e.classList.add("read");
      this.myLibrary[e.dataset.index].read = true; 
    }
    else {
      e.classList.remove("read");
      e.textContent = "NOT READ";
      e.classList.add("unread");
      this.myLibrary[e.dataset.index].read = false;
    }
  }
}

//form edit
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
function startFormEvents() {
  const form = document.querySelector("#addBookForm");
  form.addEventListener("submit", (event) => {
    library.addBook(form);
    event.preventDefault();
  });

  const pages = form.pages;
  //custom validation for page number
  pages.addEventListener("input", () => {
    pages.setCustomValidity("");
    pages.checkValidity();
  })

  pages.addEventListener("invalid", () => {
    if (pages.validity.rangeUnderflow) {
      pages.setCustomValidity("Pages cannot be under 0!")
    }
    else {
      pages.setCustomValidity("Pages cannot be empty!")
    }
  });
}

const books = [];
books.push(new Book("George R. R. Martin", "Game Of Thrones", 847, false));
books.push(new Book("Stephenie Meyer", "Twilight", 299, true));
const library = new Library(books);

document.querySelector(".showBookForm").addEventListener("click", hideForm);
startFormEvents();