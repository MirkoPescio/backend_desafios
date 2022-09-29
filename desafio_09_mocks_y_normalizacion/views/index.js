const socket = io();

// Products form
const formAddProduct = document.querySelector("#form-add-product");
const listProducts = document.querySelector("#list-products");
const nameInput = document.querySelector("#name-product");
const priceInput = document.querySelector("#price-product");
const imgInput = document.querySelector("#img-product");
const tableProducts = document.querySelector("#table-products");
const sectionProduct = document.querySelector("#section-products");
const noProducts = document.querySelector("#no-products");

formAddProduct.addEventListener("submit", (e) => {
  e.preventDefault();
  const product = {
    name: nameInput.value,
    price: priceInput.value,
    img: imgInput.value,
  };
  socket.emit("product", product);
  e.target.reset();
});

const renderProducts = (products) => {
  if (products.length > 0) {
    noProducts.style.display = "none";
    tableProducts.innerHTML = "";
    products.forEach((product) => {
      tableProducts.innerHTML += `
		<tr class="text-center">
			<td class="align-middle">${product.name}</td>
			<td class="align-middle">$ ${product.price}</td>
			<td class="align-middle">
				<img src="${product.img}" alt="${product.name}" width="100px">
			</td>
		</tr>`;
    });
  } else {
    noProducts.style.display = "block";
  }
};

// Chat form
const chatForm = document.querySelector("#chat-form");
const username = document.getElementById("username");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");
const age = document.getElementById("age");
const alias = document.getElementById("alias");
const useremail = document.getElementById("useremail");
const chatMessage = document.getElementById("chat-message");
const tableChat = document.querySelector("#table-chat");


chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const arrayMensajes = [];
  // creo el objeto y lo envio
  const message = {
    author: {
      id: useremail.value,
      nombre: firstname.value,
      apellido: lastname.value,
      edad: age.value,
      alias: alias.value,
    },
    text: chatMessage.value,
	date: new Date()
  };
  socket.emit("newMessage", message);
  arrayMensajes.push(message);
  console.log(arrayMensajes);
  e.target.reset();
});

socket.on("products", (products) => {
  renderProducts(products);
});

socket.on("messages", async (messages) => {
  console.log(messages);
  renderChat(messages);
});

const renderChat = (messages) => {
  if (messages.length > 0) {
    tableChat.innerHTML = "";
    messages.forEach((message) => {
      tableChat.innerHTML += `
		<div>
			<b class="text-primary">${message.entities.mensaje.author.author}</b>
			[<span style="color: brown;">${message.entities.mensaje.author.dateTime}</span>]
			: <i class="text-success">${message.mensaje.author.text}</i>
		</div> `;
    });
  }
};
