const socket = io();

// Products form
const formAddProduct = document.querySelector('#form-add-product');
const listProducts = document.querySelector('#list-products');
const nameInput = document.querySelector('#name-product');
const priceInput = document.querySelector('#price-product');
const imgInput = document.querySelector('#img-product');
const tableProducts = document.querySelector('#table-products');

let productsPromise = new Promise(function(res, rej) {
	setTimeout(function() {
		res(console.log("Producto añadido!!"));
	}, 250);
});

productsPromise
.then(() => {
	formAddProduct.addEventListener("submit", addProduct);
});

function addProduct(e) {
	e.preventDefault();
	const newProduct = {
		name: nameInput.value,
		price: priceInput.value,
		img: imgInput.value
	};
	socket.emit('newProduct', newProduct);
	e.target.reset();
	location.href = "/";
};

const renderProducts = products => {
	if (products.length > 0) tableProducts.innerHTML = '';
	products.forEach(product => {
		tableProducts.innerHTML += `
		<tr class="text-center">
			<td class="align-middle">${product.name}</td>
			<td class="align-middle">${product.price}</td>
			<td class="align-middle">
				<img src="${product.img}" alt="${product.name}" width="100px">
			</td>
		</tr>`;
	});
}

// Chat form

const chatForm = document.querySelector("#chat-form");
const userEmail = document.querySelector('#user-email');
const chatMessage = document.querySelector('#chat-message');
const tableChat = document.querySelector('#table-chat');


let chatPromise = new Promise(function(res, rej) {
	setTimeout(function() {
		res(console.log("Mensaje añadido!!"));
	}, 250);
});

chatPromise
.then(() => {
	chatForm.addEventListener("submit", addChat);
})

function addChat(e) {
	e.preventDefault();
	const newMessage = {
		userEmail: userEmail.value,
		text: chatMessage.value,
		date: new Date().toLocaleString()
	}
	console.log(newMessage);
	socket.emit('newMessage', newMessage);
	location.href = "/";
}

function renderChat(messages) {
	if (messages.length > 0) tableChat.innerHTML = '';
	messages.forEach(message => {
		tableChat.innerHTML += `
	        <div>
			    <p class="text-primary">${message.userEmail}</p>
			    <p class="text-success"><i>${message.text}</i></p>
			    <span style="color: brown;">${message.date}</span><hr>
            </div>`
	});
}

socket.on('products', products => {
	renderProducts(products);
});

socket.on('messages', messages => {
	renderChat(messages);
});