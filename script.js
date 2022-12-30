let notesId = document.getElementById("notes");
let submitButtonId = document.getElementById("submitButton");
let alertId = document.getElementById("alert");

//Quotation
let quotesFunction = async () => {
    try {
        const response = await fetch("https://api.quotable.io/random?maxLength=50");
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}
console.log(quotesFunction().then((data) => {
    let quoteId = document.getElementById("quote");
    quoteId.innerHTML = "👉🏻" + data.content + "👈🏻";
}));




submitButtonId.addEventListener("click", () => {
    let value = notesId.value;
    if (value == "") {
        alertId.removeAttribute("hidden");
        alertId.innerHTML = "Please enter some text";
        setTimeout(() => {
            alertId.style.display = "none";
        }, 3000);
    } else {
        localStorage.setItem(new Date().getTime(), value);
        console.log(value);
        location.reload();
    }
})


let notesDataId = document.getElementById("notesData");
if (localStorage.length != 0) {
    //Store the notes in the localStorage and sort them in descending order
    let localStorageArray = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        localStorageArray.push({ key: key, value: value });
        localStorageArray.sort((a, b) => {
            return b.key - a.key;
        })
    }

    //Display all the notes
    for (let i of localStorageArray) {
        notesDataId.innerHTML +=
            `<div class="input-group mb-3 my-3">
            <div class="input-group-text">
                <input id="checkBox${i.key}" class="form-check-input mt-0" type="checkbox" value=""
                    aria-label="Checkbox for following text input">
            </div>
            <input id="input${i.key}" type="text" class="form-control" aria-label="Text input with checkbox" value="${i.value}" readonly>
        </div>`
    }

    for (let i of localStorageArray) {
        let checkboxId = document.getElementById(`checkBox${i.key}`);
        let inputId = document.getElementById(`input${i.key}`);
        let modalYesId = document.getElementById("modalYes");
        let modalNoId = document.getElementById("modalNo");
        checkboxId.setAttribute("data-bs-toggle", "modal");
        checkboxId.setAttribute("data-bs-target", "#exampleModal");
        checkboxId.addEventListener("click", () => {
            if (checkboxId.checked) {
                inputId.style.textDecoration = "line-through";
                modalYesId.addEventListener("click", () => {
                    localStorage.removeItem(i.key);
                    location.reload();
                })
                modalNoId.addEventListener("click", () => {
                    checkboxId.checked = false;
                    inputId.style.textDecoration = "none";
                })
                let modalId = document.getElementById("exampleModal");
                window.addEventListener("click", (e) => {
                    if (e.target == modalId) {
                        checkboxId.checked = false;
                        inputId.style.textDecoration = "none";
                    }
                })
            }
        })
    }
}

