// document.addEventListener("DOMContentLoaded", function() {});
const BOOKS_URL = 'http://localhost:3000/books';
const bookList = document.querySelector('#list');
const bookShowPanel = document.getElementById('show-panel');
const API = {
	getBooks: () => fetch(BOOKS_URL).then((response) => response.json()),
	patchBook: (book) =>
		fetch(`${BOOKS_URL}/${book.id}`, {
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			method: 'PATCH',
			body: JSON.stringify(book)
		}).then((res) => res.json())
};

const renderBooks = (books) => {
	books.forEach((book) => renderBook(book));
};
const sendLike = (book) => {
	if (book.users.find((user) => user.id === 1)) {
		alert('You have liked this book already');
	} else {
		let newBook = book;
		let pouros = {
			id: 1,
			username: 'pouros'
		};
		newBook.users.push(pouros);
		API.patchBook(book).then(showBookInfo(book));
	}
};
const showBookInfo = (book) => {
	event.preventDefault();
	bookShowPanel.innerHTML = '';
	const bookTitle = document.createElement('h1');
	bookTitle.innerText = book.title;

	const bookDescription = document.createElement('p');
	bookDescription.innerText = book.description;

	const bookImage = document.createElement('img');
	bookImage.src = book.img_url;

	const bookButton = document.createElement('button');
	bookButton.innerText = 'Like';
	bookButton.addEventListener('click', (e) => sendLike(book));

	const bookUsers = (book) => {
		const likerslist = document.createElement('ul');
		book.users.forEach((user) => {
			const liker = document.createElement('li');
			liker.innerText = user.username;
			return likerslist.append(liker);
		});
		return likerslist;
	};
	const showLikers = bookUsers(book);
	bookShowPanel.append(bookTitle, bookDescription, bookImage, showLikers, bookButton);
};

const renderBook = (book) => {
	const bookEl = document.createElement('li');
	bookEl.innerText = book.title;
	bookList.append(bookEl);

	bookEl.addEventListener('click', (e) => showBookInfo(book));
};

API.getBooks().then((books) => renderBooks(books));
