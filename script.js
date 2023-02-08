let notesId = document.getElementById("notes");
let submitButtonId = document.getElementById("submitButton");
let alertId = document.getElementById("alert");

//Quote
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
            <button id="editButton${i.key}" type="button" class="btn btn-dark">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                </svg>
            </button>
        </div>`
    }

    for (let i of localStorageArray) {
        let checkboxId = document.getElementById(`checkBox${i.key}`);
        let inputId = document.getElementById(`input${i.key}`);
        let modalYesId = document.getElementById("modalYes");
        let modalNoId = document.getElementById("modalNo");
        let editButtonId = document.getElementById(`editButton${i.key}`);

        editButtonId.setAttribute("data-bs-toggle", "modal");
        editButtonId.setAttribute("data-bs-target", "#editModal");

        checkboxId.setAttribute("data-bs-toggle", "modal");
        checkboxId.setAttribute("data-bs-target", "#deleteModal");


        editButtonId.addEventListener("click", () => {
            //Edit Note
            let data = localStorage.getItem(i.key);
            let textArea = document.getElementById("floatingTextarea");
            textArea.value = data;
            let updateButton = document.getElementById("updateButton");
            updateButton.addEventListener("click", () => {
                let updatedData = textArea.value;
                localStorage.setItem(i.key, updatedData);
                location.reload();
            })
            let editModalId = document.getElementById("editModal");
            window.addEventListener("click", (e) => {
                if (e.target == editModalId) {
                    checkboxId.checked = false;
                    inputId.style.textDecoration = "none";
                }
            })
        })
        checkboxId.addEventListener("click", () => {
            //Delete Note
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
                let closeButtonId = document.getElementById("closeButton");
                closeButtonId.addEventListener("click", () => {
                    checkboxId.checked = false;
                    inputId.style.textDecoration = "none";
                })
                let modalId = document.getElementById("deleteModal");
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

