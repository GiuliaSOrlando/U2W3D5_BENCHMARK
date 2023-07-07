const url = "https://striveschool-api.herokuapp.com/api/product/"
const getProducts = function () {
  fetch(url, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3ODlmYmRhNTNjMTAwMTRhOTY4ZjEiLCJpYXQiOjE2ODg3MDE0MzUsImV4cCI6MTY4OTkxMTAzNX0.dI1mQ9GDOs4meV8Q4NhkAnIhuifeXJ67H-L26vlmnIk",
    },
  })
    .then((res) => {
      console.log(res)
      if (res.ok) {
        return res.json()
      } else {
        throw new Error("Errore nella chiamata")
      }
    })
    .then((products) => {
      console.log(products)
      const spinnerContainer = document.getElementById("spinner-container")
      spinnerContainer.classList.add("d-none")
      products.forEach((product) => {
        let newCol = document.createElement("div")
        newCol.classList.add("col", "col-12", "col-sm-6", "col-md-3")
        newCol.innerHTML = `
          <div class="card shadow">
              <img
                src="${product.imageUrl}"
                class="card-img-top"
                alt="product image"
                height="250px"
                style="object-fit:cover"
              />
              <div class="card-body ">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">
                  ${product.description}
                </p>
                <p class="card-text">
                  ${product.brand}
                </p>
                <p class="card-text fw-bold">
                  ${product.price}€
                </p>
                <a href="./backoffice.html?id=${product._id}" class="btn btn-dark">Modifica</a>
              </div>
            </div>
        `
        const productRow = document.getElementById("product-row")
        productRow.appendChild(newCol)
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

getProducts()
