# GraphQL

Queries:

- Get products
```
{
	getProducts {
		id,
		name,
		price,
	}
}
```

- Add product
```
mutation {
  addProduct(datos: {
    name: "Fifa 23",
    price: 15200,
    img: "https://visualgamesuy.com/wp-content/uploads/2022/07/fifa23-portada-ps4.jpg"
  }) {
    id,
	name
  }
}
```

- Delete product
```
mutation {
  deleteProduct(id: 2) {
    id,
	name
  }
}
```

- Update product
```
mutation {
  updateProduct(datos: {
	id: 5,
    name: "product graphql 3 actualizado",
    price: 16000,
    img: "https://lh3.googleusercontent.com/ogw/AOh-ky2CdqY2t24jIxDIHAt3WcEMB0UbaodZsnyL8Ip1fA=s64-c-mo"
  }) {
    id,
	name
  }
}
```