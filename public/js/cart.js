document.addEventListener("DOMContentLoaded", function (event) {
    var cartItemCountElement = document.getElementById("cartItemCount");
    var cartItemCount = localStorage.getItem("cartItemCount");
    if (cartItemCount) {
        cartItemCountElement.innerText = cartItemCount;
    }

    var cartData = JSON.parse(localStorage.getItem("cartData")) || [];
    generateCartItemsHTML(cartData);
});

function generateCartItemsHTML(cartData) {
    var cartItemList = document.getElementById("cartItemList");
    var counts = {}; // Object to keep track of counts for each ID
    for (var i = 0; i < cartData.length; i++) {
      var item = cartData[i];
      var id = item.id;
      if (counts[id]) {
        // ID has already been seen, increment the quantity element
        var qtyInput = cartItemList.querySelector(`li[data-id="${id}"] .qty`);
        qtyInput.value = parseInt(qtyInput.value) + 1;
      } else {
        // ID has not been seen, create the HTML and add to the cart
        var li = document.createElement("li");
        li.classList.add("items", "odd");
        li.dataset.id = id; // Set the data-id attribute to the ID
        li.innerHTML = `
          <div class="infoWrap">
            <div class="cartSection">
              <img src="assets/${item.image}" alt="product_image" class="itemImg" />
              <p class="itemNumber">#${id.toString().padStart(8,'0')}</p>
              <h3>${item.name}</h3>
              <p>
                <input id="quantity" type="text" class="qty" placeholder="1" value="1" /> x ${item.price}
              </p>
            </div>
            <div class="prodTotal cartSection">
              <p>৳ ${Math.round(item.price)}</p>
            </div>
            <div class="cartSection removeWrap">
              <a href="#" onclick="removeFromCart(event)" class="remove">x</a>
            </div>
          </div>`;
        cartItemList.appendChild(li);
        counts[id] = 1; // Set the count for this ID to 1
      }
    }
  }  

function addToCart() {
    var cartItemCountElement = document.getElementById("cartItemCount");
    var cartItemCount = parseInt(cartItemCountElement.innerText);
    cartItemCount++;
    cartItemCountElement.innerText = cartItemCount;

    // Get item data from the page
    let stock = document.getElementById("prod-stock");

    // Create an object with item data
    var item = {
        id: data.id,
        image: data.model + "_h.png",
        name: data.name,
        price: data.price,
    };

    var cartData = JSON.parse(localStorage.getItem("cartData")) || [];
    cartData.push(item);

    localStorage.setItem("cartData", JSON.stringify(cartData));
    localStorage.setItem("cartItemCount", cartItemCount);
}

function removeFromCart(event) {
    event.preventDefault();
    var cartItemCountElement = document.getElementById("cartItemCount");
    var cartItemCount = parseInt(cartItemCountElement.innerText);
    cartItemCount--;
    cartItemCountElement.innerText = cartItemCount;

    var li = $(event.target).closest("li");
    var qtyElement = li.find("#quantity");
    var qty = parseInt(qtyElement.val());
    qty--;
    qtyElement.val(qty);

    // Remove product from cartData in local storage
    var cartData = JSON.parse(localStorage.getItem("cartData"));
    var productId = li.find(".itemNumber").text().substring(1);
    var productIndex = -1;
    for(var i = 0; i < cartData.length; i++) {
        if (cartData[i].id == productId) {
            productIndex = i;
            break;
        }
    }
    if(productIndex > -1) {
        cartData.splice(productIndex, 1);
        localStorage.setItem("cartData", JSON.stringify(cartData));
    }

    if(qty==0){
        $(event.target).parent().parent().parent().hide();
    }

    localStorage.setItem("cartItemCount", cartItemCount);
}
