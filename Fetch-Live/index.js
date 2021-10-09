const container = document.querySelector('.container');
const input = document.querySelector(".input");

let usersArray = [];

const serverUrl = "http://localhost:8000";

const createCardList = (array) => {
    container.innerHTML = "";
    array.forEach((obj) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `<div class="name">name</div>
<div class="name-content">${obj.name}</div>
<div class="email">email</div>
<div class="email-content">${obj.email}</div>`
        container.appendChild(card);
    });
};




fetch(serverUrl)
    .then((data) => {
        //console.log(data);
        return data.json();
    })
    .then((result) => {

        console.log(result);
        usersArray = result;
        //  console.log(array);
        createCardList(usersArray);
    });

input.addEventListener("input", (event) => {
    const searchStr = event.target.value.toLowerCase();

    const filteredArray = usersArray.filter((ele) => {
        return (
            ele.name.toLowerCase().includes(searchStr) ||
            ele.email.toLowerCase().includes(searchStr)
        )
    });

    createCardList(filteredArray);
});

//particle js configuration

// particlesJS.load("particales-js", "particales.json")



const addUserButton = document.querySelector(".controls img");
addUserButton.addEventListener("click", () => {
    const name = prompt("Enter your username");
    const email = prompt("enter your email");
    const newUser = {
        name,
        email,
    }
    const secretKey = prompt("Enter secret key ");

    const bodyData = {
        newUser,
        secretKey,
    }
    fetch(`${serverUrl}/adddata`, {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json()).then((result) => {
        usersArray = result;
        createCardList(result);

    })
        .catch((error) => {
            console.log(error);
            alert("User not added");
        })

});






