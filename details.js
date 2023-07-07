const url = "https://striveschool-api.herokuapp.com/api/product/"
const addressBarContent = new URLSearchParams(location.search)
const productID = addressBarContent.get("id")

fetch(url + productID, {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3ODlmYmRhNTNjMTAwMTRhOTY4ZjEiLCJpYXQiOjE2ODg3MDE0MzUsImV4cCI6MTY4OTkxMTAzNX0.dI1mQ9GDOs4meV8Q4NhkAnIhuifeXJ67H-L26vlmnIk",
  },
})
  .then((res) => {
    if (res.ok) {
      return res.json()
    } else {
      let alertBtnDiv = document.getElementById("alert-button")
      let alertBtn = document.createElement("button")
      alertBtn.classList.add("btn", "btn-dark", "w-100")
      alertBtn.setAttribute("type", "button")
      alertBtn.setAttribute("id", "liveAlertBtn")
      alertBtn.innerHTML = "Qualcosa è andato storto: premi per scoprire cosa"
      alertBtnDiv.appendChild(alertBtn)

      const alertPlaceholder = document.getElementById("liveAlertPlaceholder")
      const appendAlert = () => {
        const wrapper = document.createElement("div")
        wrapper.classList.add("bg-dark", "text-white")
        wrapper.innerHTML = [
          `<div class="alert alert- alert-dismissible" role="alert">`,
          `   <div>The page failed because of this error ${res.status} : ${res.statusText}</div>`,
          '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
          "</div>",
        ].join("")

        alertPlaceholder.append(wrapper)
      }

      const alertTrigger = document.getElementById("liveAlertBtn")
      if (alertTrigger) {
        alertTrigger.addEventListener("click", () => {
          appendAlert("Nice, you triggered this alert message!", "success")
        })
      }
      throw new Error("Errore nel recupero dei dettagli del prodotto")
    }
  })
  .then((detail) => {
    const spinnerContainer = document.getElementById("spinner-container")
    spinnerContainer.classList.add("d-none")
    let newCol = document.createElement("div")
    newCol.classList.add(
      "col",
      "col-sm-8",
      "col-md-6",
      "col-lg-4",
      "text-center"
    )
    newCol.innerHTML = `
          <div class="card shadow">
              <img
                src="${detail.imageUrl}"
                class="card-img-top"
                alt="product image"
                height="500px"
                style="object-fit:cover"
              />
              <div class="card-body ">
                <h5 class="card-title">${detail.name}</h5>
                <p class="card-text">
                  ${detail.description}
                </p>
                <p class="card-text">
                  ${detail.brand}
                </p>
                <p class="card-text fw-bold">
                  ${detail.price}€
                </p>
              </div>
            </div>
        `
    const productRow = document.getElementById("products-row")
    productRow.appendChild(newCol)
  })
  .catch((err) => {
    console.log(err)
  })
