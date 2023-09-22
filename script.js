import { shoeList } from './data.js';

const elements = {
    listItems: document.getElementById('list-items'),
    orderSection: document.getElementById('order-section'),
    paymentModal: document.getElementById('payment-modal'),
    nameInput: document.getElementById('name-input'),
};

const form = document.querySelector('form');

form.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Your existing validation code here

  if (nameInput.value && cardNumberInput.value && securityCodeInput.value) {
    // All required fields are filled, so you can proceed with form submission
    form.submit(); // Trigger the form submission programmatically
  } else {
    // Display an error message or take appropriate action if fields are not filled
    alert('Please fill in all required fields.');
  }
});

let totalPrice = 0;
let order = [];

document.addEventListener('click', function (event) {
    const { target } = event;
    if (target.dataset.add) addItemToOrder(target.dataset.add);
    else if (target.dataset.remove) removeItemFromOrder(target.dataset.remove);
    else if (target.id === 'complete-order') displayPaymentModal();
    else if (target.id === 'pay-btn') {
        event.preventDefault();
        processPayment();
    }
});

function processPayment() {
    elements.paymentModal.style.display = 'none';
    const userName = elements.nameInput.value;
    elements.orderSection.innerHTML = `
        <div class="completed-order-txt">
            <p>Thanks, ${userName}! Your order is on its way!</p>
        </div>`;
}

function displayPaymentModal() {
    elements.paymentModal.style.display = 'flex';
}

function addItemToOrder(itemId) {
    const targetItemObj = shoeList.find((item) => item.id == itemId);
    if (!order.includes(targetItemObj)) {
        order.push(targetItemObj);
        totalPrice += targetItemObj.price;
        renderOrder();
    }
}

function removeItemFromOrder(itemId) {
    const targetItemObj = shoeList.find((item) => item.id == itemId);
    if (order.includes(targetItemObj)) {
        order.splice(order.indexOf(targetItemObj), 1);
        totalPrice -= targetItemObj.price;
        renderOrder();
    }
}

function getOrderSectionHtml() {
    return `
        <div class="order-section-header">
            <p>Your Order</p>
        </div>
        <div id="order-items" class="order-items">
            
        </div>
        <div class="total-container">
            <div class="total-price">
                <p>Total Price:</p>
            </div>
            <div class="total-price-figure">
                <p>R${totalPrice.toFixed(2)}</p>
            </div>
        </div>
        <div class="btn-container">
            <button class="complete-order-btn" id="complete-order">Complete order</button>
        </div>`;
}

function getOrderItemHtml() {
    return order
        .map(
            (item) => `
        <div class="order-container">
            <div class="order-item">
                <p>${item.name}</p>
                
            </div>
            <button class="remove-item-btn" data-remove="${item.id}">remove</button>
            <div class="order-price">
                <p>R${item.price.toFixed(2)}</p>
            </div>
        </div>
    `
        )
        .join('');
}

function getMenuHtml() {
    return shoeList
        .map(
            (item) => `
        <div class="item-item">
            <div class="item-info">
                <div class="item-graphic item-image">
                    <img src="${item.img}" alt="${item.name}">
                </div>
                <div>
                    <h2 class="item-name">${item.name}</h2>
                    <p class="item-colours">${item.colours.join(', ')}</p>
                    <p class="item-price">R${item.price.toFixed(2)}</p>
                </div>
            </div>
            <div class="add-btn-section">
                <button class="add-btn" data-add="${item.id}">+</button>
            </div>
        </div>
    `
        )
        .join('');
}

function renderOrder() {
    elements.orderSection.innerHTML = getOrderSectionHtml();
    document.getElementById('order-items').innerHTML = getOrderItemHtml();
}

function render() {
    elements.listItems.innerHTML = getMenuHtml();
}

// Call render() to initially populate the item list
render();