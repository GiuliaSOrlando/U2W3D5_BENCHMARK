const url = "https://striveschool-api.herokuapp.com/api/product/"
const addressBarContent = new URLSearchParams(location.search)
const productID = addressBarContent.get("id")

const nameInput = document.getElementById("product-name")
const descriptionInput = document.getElementById("product-description")
const brandInput = document.getElementById("product-brand")
const imgUrlInput = document.getElementById("product-img")
const priceInput = document.getElementById("product-price")

const emptyInputFlds = () => {
  nameInput.value = ""
  descriptionInput.value = ""
  brandInput.value = ""
  imgUrlInput.value = ""
  priceInput.value = ""
}

const resetModalButton = document.getElementById("reset-yes")
resetModalButton.addEventListener("click", emptyInputFlds)
const resetButton = document.getElementById("reset")

//Modifica dei prodotti esistenti: col metodo PUT
if (productID) {
  document.querySelector("#saveBtn").innerText = "Edit"
  document.querySelector("h1").innerText = "Gotica Shop - Edit product"
  resetButton.classList.add("d-none")

  fetch(url + productID, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3ODlmYmRhNTNjMTAwMTRhOTY4ZjEiLCJpYXQiOjE2ODg3MDE0MzUsImV4cCI6MTY4OTkxMTAzNX0.dI1mQ9GDOs4meV8Q4NhkAnIhuifeXJ67H-L26vlmnIk",
      "Content-Type": "application/json",
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
        throw new Error("Errore nel recupero dei dettagli dell'evento")
      }
    })
    .then((edit) => {
      const nameInput = document.getElementById("product-name")
      const descriptionInput = document.getElementById("product-description")
      const brandInput = document.getElementById("product-brand")
      const imgUrlInput = document.getElementById("product-img")
      const priceInput = document.getElementById("product-price")

      nameInput.value = edit.name
      descriptionInput.value = edit.description
      brandInput.value = edit.brand
      imgUrlInput.value = edit.imageUrl
      priceInput.value = edit.price
    })
    .catch((err) => console.log(err))

  let deleteButton = document.createElement("button")
  deleteButton.classList.add("btn", "btn-outline-dark")
  deleteButton.innerText = "Delete"
  deleteButton.setAttribute("id", "deleteBtn")
  deleteButton.setAttribute("data-bs-toggle", "modal")
  deleteButton.setAttribute("data-bs-target", "#deleteModal")
  let deleteDiv = document.getElementById("delete-btn-div")
  deleteDiv.appendChild(deleteButton)

  let deleteButtonModal = document.getElementById("delete-yes")
  deleteButtonModal.addEventListener("click", function () {
    fetch(url + productID, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3ODlmYmRhNTNjMTAwMTRhOTY4ZjEiLCJpYXQiOjE2ODg3MDE0MzUsImV4cCI6MTY4OTkxMTAzNX0.dI1mQ9GDOs4meV8Q4NhkAnIhuifeXJ67H-L26vlmnIk",
      },
    })
      .then((res) => {
        if (res.ok) {
          location.assign("home.html")
        } else {
          let alertBtnDiv = document.getElementById("alert-button")
          let alertBtn = document.createElement("button")
          alertBtn.classList.add("btn", "btn-dark", "w-100")
          alertBtn.setAttribute("type", "button")
          alertBtn.setAttribute("id", "liveAlertBtn")
          alertBtn.innerHTML =
            "Qualcosa è andato storto: premi per scoprire cosa"
          alertBtnDiv.appendChild(alertBtn)

          const alertPlaceholder = document.getElementById(
            "liveAlertPlaceholder"
          )
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
          throw new Error("Problema nell'eliminazione del prodotto")
        }
      })
      .then((products) => {
        const nameInput = document.getElementById("product-name")
        const descriptionInput = document.getElementById("product-description")
        const brandInput = document.getElementById("product-brand")
        const imgUrlInput = document.getElementById("product-img")
        const priceInput = document.getElementById("product-price")

        emptyInputFlds()
      })
      .catch((err) => {
        console.log(err)
      })
  })
}

//Creazione dei prodotti: col metodo POST

const productForm = document.getElementById("product-form")
productForm.addEventListener("submit", function (e) {
  e.preventDefault()
  const newProduct = {
    name: nameInput.value,
    description: descriptionInput.value,
    brand: brandInput.value,
    imageUrl: imgUrlInput.value,
    price: priceInput.value,
  }

  console.log(newProduct)

  let urlToUse = productID ? url + productID : url

  let methodToUse = productID ? "PUT" : "POST"

  fetch(urlToUse, {
    method: methodToUse,
    body: JSON.stringify(newProduct),
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE3ODlmYmRhNTNjMTAwMTRhOTY4ZjEiLCJpYXQiOjE2ODg3MDE0MzUsImV4cCI6MTY4OTkxMTAzNX0.dI1mQ9GDOs4meV8Q4NhkAnIhuifeXJ67H-L26vlmnIk",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        emptyInputFlds()
        location.assign("home.html")
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
