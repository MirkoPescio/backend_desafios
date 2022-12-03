const socket = io();

// Products form
const formAddProduct = document.querySelector('#form-add-product');
const listProducts = document.querySelector('#list-products');
const nameInput = document.querySelector('#name-product');
const priceInput = document.querySelector('#price-product');
const imgInput = document.querySelector('#img-product');
const tableProducts = document.querySelector('#table-products');
const sectionProduct = document.querySelector('#section-products');
const noProducts = document.querySelector('#no-products');
const emptyCart = document.querySelector('#emptyCart');
const processCart = document.querySelector('#processCart');

formAddProduct.addEventListener('submit', e => {
	e.preventDefault();
	const product = {
		name: nameInput.value,
		price: priceInput.value,
		img: imgInput.value
	};
	socket.emit('product', product);
	e.target.reset();
});

const renderProducts = products => {
	if (products.length > 0) {
		noProducts.style.display = 'none';
		tableProducts.innerHTML = '';
		products.forEach(product => {
			tableProducts.innerHTML += `
		<tr class="text-center">
			<td class="align-middle">${product.name}</td>
			<td class="align-middle">${product.price}</td>
			<td class="align-middle">
				<img src="${product.img}" alt="${product.name}" width="100px">
			</td>
			<td class="align-middle"><i class="btn">Eliminar<i></td>
		</tr>`;
		});
	} else {
		noProducts.style.display = 'block';
	}
}

const procesarProductos = (products) => {
	processCart.addEventListener("click", (e) => {
		e.preventDefault();
		console.log(products);
		socket.emit('processProducts', products);
	});
}

// Chat form
const chatForm = document.querySelector('#chat-form');
const mail = document.querySelector('#email');
const firstname = document.querySelector("#firstname");
const lastname = document.querySelector("#lastname");
const age = document.querySelector("#age");
const nick = document.querySelector("#nick");
const text = document.querySelector('#text');
const tableChat = document.querySelector('#table-chat');

chatForm.addEventListener('submit', e => {
	e.preventDefault();
	if (mail.value == '') return alert('Ingresa tu email');
	const mensajes = {
		email: mail.value,
		message: text.value,
		date: new Date().toLocaleString()
	}
	console.log(mensajes)
	socket.emit('message', mensajes);
	e.target.reset();
});

const renderChat = mensajes => {
	if (mensajes.length > 0) {
		tableChat.innerHTML = '';
		mensajes.forEach(mensaje => {
			tableChat.innerHTML += `
		<div>
			<b class="text-primary">${mensaje.email}</b>
			[<span style="color: brown;">${mensaje.date}</span>]
			: <i class="text-success">${mensaje.message}</i>
		</div>`;
		})
		text.focus();
	}
}

socket.on('products', products => {
	renderProducts(products);
	procesarProductos(products);
});

socket.on('messages', mensajes => {
	renderChat(mensajes);
});