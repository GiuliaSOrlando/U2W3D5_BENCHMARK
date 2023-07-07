const url = "https://striveschool-api.herokuapp.com/api/product/"
const addressBarContent = new URLSearchParams(location.search)
const productID = addressBarContent.get("id")

//Creazione dei prodotti: col metodo POST

const productForm = document.getElementById("product-form")
productForm.addEventListener("submit", function (e) {
  e.preventDefault()
  console.log("Raccolgo i dati dal form")

  const nameInput = document.getElementById("product-name")
  const descriptionInput = document.getElementById("product-description")
  const brandInput = document.getElementById("product-brand")
  const imgUrlInput = document.getElementById("product-img")
  const priceInput = document.getElementById("product-price")

  const newProduct = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    image: imgUrlInput.value,
    price: priceInput.value,
  }

  console.log(newProduct)

  //let urlToUse = productID ? url + productID : url

  //let methodToUse = productID ? "PUT" : "POST"

  fetch(url, {
    method: "POST",
    body: JSON.stringify(newProduct),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3ODlmYmRhNTNjMTAwMTRhOTY4ZjEiLCJpYXQiOjE2ODg3MDE0MzUsImV4cCI6MTY4OTkxMTAzNX0.dI1mQ9GDOs4meV8Q4NhkAnIhuifeXJ67H-L26vlmnIk",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        alert("Prodotto salvato")
        nameInput.value = ""
        descriptionInput.value = ""
        brandInput.value = ""
        imgUrlInput.value = ""
        priceInput.valeu = ""
        location.assign("home.html")
      } else {
        throw new Error("Errore nel salvataggio del prodotto")
      }
    })
    .then((products) => {
      console.log(products)
    })
    .catch((err) => {
      console.log(err)
    })
})
