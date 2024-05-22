import { menuArray } from "/data.js";

const productsEl = document.getElementById("products");
const orderEl = document.getElementById("order");
const completeOrder = document.getElementById("complete-order");
const checkOut = document.getElementById("checkout");
const finalForm = document.getElementById("final-form");
const mainEl = document.getElementById("main");
const nameEl = document.getElementById("name");
const cardNumber = document.getElementById("card-number");
const cvvNumber = document.getElementById("cvv-number");
const finalMsg = document.getElementById("final-msg");
const userForm = document.getElementById("user-form");

let orderItems = [];

let renderedHtml = menuArray
    .map(function (product) {
    return `
    <div id="item">
        <img src=${product.emoji} alt="pizza img">
        <div class="details">
            <h3>${product.name}</h3>
            <p>${product.ingredients}</p>
            <h4>$${product.price}</h4>
        </div>
        <p class="add-item" data-id="${product.id}">+</p>
    </div>
    `;
    }).join("");

productsEl.innerHTML = renderedHtml;

productsEl.addEventListener("click", function(event) {
    if (event.target.classList.contains('add-item')) {
        const productId = parseInt(event.target.dataset.id);
        const product = menuArray.find(item => item.id == productId);
        if (product) {
            orderItems.push(product);
            orderEl.style.display="block";
            completeOrder.style.display="block";
            checkOut.style.display="block";
            renderOrder();
        } else {
            console.log("Product not found");
        }
    }
});

function renderOrder() {
    if (orderItems.length > 0) {
        orderEl.style.display = "block";
        checkOut.style.display= "block";
        let orderHtml = `
            <h2 class="order-title">Your order</h2>
        `;

        orderItems.forEach(item => {
            orderHtml += `
                <div id="order-item">
                    <h3>${item.name}</h3>
                    <p class="remove-item" data-id="${item.id}">remove</p>
                    <h4>$${item.price}</h4>
                </div>
            `;
        });

        const totalPrice = orderItems.reduce((total, item) => total + item.price, 0);

        orderHtml += `
            <hr>
            <div id="total-price">
                <h3>Total Price</h3>
                <h4>$${totalPrice}</h4>
            </div>
            <button id="complete-order">Complete order</button>
        `;

        orderEl.innerHTML = orderHtml;

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function(event) {
                const productId = parseInt(event.target.dataset.id);
                orderItems = orderItems.filter(item => item.id !== productId);
                if(orderItems.length <= 0) {
                    checkOut.style.display="none";
                }
                renderOrder();
            });
        });

    } else {
        orderEl.style.display = "none";
    }
}

completeOrder.addEventListener("click", function(e) {
    e.preventDefault()
    mainEl.style.backgroundColor="rgb(212, 202, 202)";
    finalForm.style.display="block";

});

userForm.addEventListener("submit", function(e) {
    e.preventDefault();
    if (nameEl.value === "" || cardNumber.value === "" || cvvNumber.value === "") {
        alert("All fields must be filled out");
    } else {
        finalForm.style.display = "none";
        completeOrder.style.display="none";
        orderEl.innerHTML = '';
        finalMsg.style.display = "block";
        mainEl.style.backgroundColor="white";
        console.log("Final message displayed");
    }
});

