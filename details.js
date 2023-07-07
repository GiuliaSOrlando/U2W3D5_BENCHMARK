const url = "https://striveschool-api.herokuapp.com/api/product/"

const addressBarContent = new URLSearchParams(location.search)

const productID = addressBarContent.get("id")

fetch(URL + productID)
  .then((res) => {
    if (res.ok) {
      return res.json()
    } else {
      throw new Error("Errore nel recupero dei dettagli dell'evento")
    }
  })
  .then((detail) => {
    const spinnerContainer = document.getElementById("spinner-container")
    spinnerContainer.classList.add("d-none")
    let newCol = document.createElement("div")
    newCol.classList.add("col", "col-12", "col-sm-6", "text-center")
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
                <a href="./details.html?id=${product._id}" class="btn btn-dark">Read more</a>
                <a href="./backoffice.html?id=${product._id}" class="btn btn-dark">Edit</a>
              </div>
            </div>
        `
    const productRow = document.getElementById("products-row")
    productRow.appendChild(newCol)
