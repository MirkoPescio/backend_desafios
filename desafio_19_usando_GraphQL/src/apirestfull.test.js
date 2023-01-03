const { strictEqual, deepStrictEqual } = require('assert')
const axios = require('axios')

const getProducts = () => axios('http://localhost:8080/api/products/')
const addProduct = ({ name, price, img }) => axios.post('http://localhost:8080/api/products/', { name, price, img })
const deleteProduct = (id) => axios.delete('http://localhost:8080/api/products/' + id )
const updateProduct = ({ id, name, price, img }) => axios.put('http://localhost:8080/api/products/', { id, name, price, img })

const productsMock = [
  {
    name: "Infamous Second Son",
    price: 1420,
    img: "https://media.vandal.net/m/20531/infamous-second-son-2014122173736_1.jpg"
  },
  {
    name: "Uncharted The Lost Legacy",
    price: 1640,
    img: "https://mymsystem.com.ar/wp-content/uploads/2020/04/uncharted-the-lost-legacy-ps-4-nuevo-fisico-cerrado-once-D_NQ_NP_978538-MLA27785781624_072018-F.jpg"
  }
]

describe("checking that the server works", function () {
  
  it("Should save two products", async function () {
    const { data: beforeData } = await getProducts()
    const res1 = await addProduct(productsMock[0])
    const res2 = await addProduct(productsMock[1])
    const { data: afterData } = await getProducts()

    strictEqual(beforeData.length + 2, afterData.length)
    strictEqual(res1.status, 201)
    strictEqual(res2.status, 201)
  })

  it("Should update one product", async function () {
    const { data: beforeData } = await getProducts()
    const beforeProduct = {
      ...beforeData[0],
      title: "producto editado"
    }
    const res = await updateProduct(beforeProduct)
    const { data: afterData } = await getProducts()
    const afterProduct = afterData.find(obj => obj.id == beforeProduct.id)
    strictEqual(beforeProduct.name, afterProduct.name)
    strictEqual(beforeData.length, afterData.length)
    strictEqual(res.status, 200)
  })

  it("Should delete two product", async function () {
    const { data: beforeData } = await getProducts()
    const res1 = await deleteProduct(beforeData[0].id)
    const res2 = await deleteProduct(beforeData[1].id)
    const { data: afterData } = await getProducts()

    strictEqual(beforeData.length - 2, afterData.length)
    strictEqual(res1.status, 200)
    strictEqual(res2.status, 200)
  })
})