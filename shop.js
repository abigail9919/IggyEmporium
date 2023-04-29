spareShirts =  {
  shirt1: "",
  shirt2: "",
  shirt3: "",
  shirt4: "images/shirt4.jpg",
  shirt5: "images/shirt5.jpg",
  shirt6: "images/shirt6.webp",
};

// this function turns the API data into readable flip cards 
const process = (objects) => {
  let allClothes = "";
  objects.forEach(function (article) {
    let nextItem = `<div class="flip-card">
      <div class="flip-card-inner">
          <div class="flip-card-front">
            <div class="item"><img src="${article.image}"></div>
          </div>
          <div class="flip-card-back">
            <p>Price: $${article.price} <br/><br/> Customer Rating: ${article.rating.rate}/5</p>
          </div>
        </div>
      </div>`;
    allClothes += nextItem;
  })
    return allClothes;
  };

  // takes API data, passes it to a function that organizes it, then posts it in HTML
const successfullyExecutedAPI = (data) => {
    console.log("successAPI", data);
    let markup = process(data);
    $(".content").html(markup);
    userChoice(data);
};

// calls the API and passes data to another function
const APICall = () => {
    $.getJSON("https://fakestoreapi.com/products/category/women's clothing", successfullyExecutedAPI);
  };

  // fades out the CRUD options
const crudFadeOut = () => {
    $(".crudOption").animate({opacity: '0'}, 'slow');
};

// fades in the CRUD options
const crudFadeIn = () => {
  $(".crudOption").animate({opacity: '1'}, 'fast');
};

// responsible for fading out other random buttons or div content
const itemsFadeOut = () => {
  // console message to show items are fading away
  console.log("clothing fadeout function");
  // make clothes cards fade away
  $(".content").animate({opacity: '0'}, 'fast');
  // change text on subheader, and fade away the home button and edit button
  $(".subHeader").empty();
  $(".subHeader").text("What'll It Be?");
  $(".homeButton").animate({opacity: '0'}, 'fast');
  $(".editButton").animate({opacity: '0'}, 'fast');
  $(".editButton").empty();
  $(".deleteButton").animate({opacity: '0'}, 'fast');
  $(".deleteButton").empty();
  $(".createButton").animate({opacity: '0'}, 'fast');
  $(".createButton").empty();
  crudFadeIn();
};

const createItem = (objects) => {
  if (objects.length == 12) {
    alert("You have the max items in your inventory. Remove an item, then come back.")
  }
  else {
    let itemPrice = prompt("Enter the price of this new item");
    let itemRating = prompt("Enter the rating of this new item");
    let newIndex = objects.length;
    let randomIndex = Math.floor((Math.random()*5)+1);
    console.log("Random shirt image num: "+ randomIndex);

    let item = {
      "category": "women's clothing",
      "description": "new clothing added by user",
      "id": 11,
      "image": `images/shirt${randomIndex}.jpg`,
      "price": itemPrice,
      "rating": {
        "count": 300,
        "rate": itemRating,
      },
      "title": "women's top",
    };
  
    objects.push(item);

    console.log(objects[newIndex]);
    
    updateContent(objects);
    
    
  };
};

const editItem = (objects) => {
  // get the index of the item that the user wants to change
  let itemNumber = prompt("Enter the item's number: ");
  console.log("Item Number " + itemNumber)
  // get the new data 
  let newPrice = prompt("Enter the price");
  console.log("New Price " + newPrice)
  let newRating = prompt("Enter the average rating");

  // update the old data
  objects[itemNumber - 1].price = newPrice;
  objects[itemNumber - 1].rating.rate = newRating;

  // log the updated item to the console
  console.log(objects[itemNumber - 1]);

  // update the content with the updated data
  updateContent(objects);
};

// This function to update the content with the updated data that is being passed in
const updateContent = (objects) => {
  // This will empty out the old content
  $(".content").empty();

  // This will loop through the objects and add them to the content
  objects.forEach((article) => {
    let flipCard = $("<div>").addClass("flip-card");
    let flipCardInner = $("<div>").addClass("flip-card-inner");
    let flipCardFront = $("<div>").addClass("flip-card-front");
    let item = $("<div>").addClass("item");
    let img = $("<img>").attr("src", article.image);
    item.append(img);
    flipCardFront.append(item);
    let flipCardBack = $("<div>").addClass("flip-card-back");
    let price = $("<p>").html(`Price: $${article.price} <br/><br/>`);
    let rating = $("<p>").text(`Customer Rating: ${article.rating.rate}/5`);
    flipCardBack.append(price, rating);
    flipCardInner.append(flipCardFront, flipCardBack);
    flipCard.append(flipCardInner);
    $(".content").append(flipCard);
  });

  // animate the content to fade in
  $(".content").animate({opacity: '1'}, 'fast');
};
// --------------

// DELETE FUNCTIONS
const deleteItem = (objects) => {
  let itemNumber = prompt("Enter the number of the item you wish to remove");
  objects.splice(itemNumber - 1, 1);
  updateContent(objects);

};

const userChoice = (objects) => {
  $(".subHeader").text("What'll It Be?");
  crudFadeIn();

  // ------ CREATE ------ //
  $(".create").on("click", function () {
    $(".subHeader").empty();
    $(".subHeader").text("Adding A New Item To The Inventory?");

    crudFadeOut();
    $(".content").animate({opacity: '1'}, 'slow');
    $(".homeButton").animate({opacity: '1'}, 'slow');
    $(".homeButton").text("Return Home");

    $(".createButton").text("Create Item");
    $(".createButton").animate({opacity: '1'}, 'slow');
    $(".createButton").on("click", function () {
      createItem(objects);
    });
  });

  // ------ READ ------ //
  $(".read").on("click", function () {
    $(".subHeader").empty();
    $(".subHeader").text("Hover Over An Item To View Details");

    crudFadeOut();
    $(".content").animate({opacity: '1'}, 'slow');

    $(".homeButton").animate({opacity: '1'}, 'slow');
    $(".homeButton").animate({left: '2100px'}, 'fast');
    $(".homeButton").text("Return Home");
  });

  // ------ UPDATE ------ //
  $(".update").on("click", function () {
    // rewrite the subheader title
    $(".subHeader").empty();
    $(".subHeader").text("What Would You Like To Edit?");

    // fade away the CRUD options and make the API details appear
    crudFadeOut();
    $(".content").animate({opacity: '1'}, 'slow');

    // home button appearance
    $(".homeButton").animate({opacity: '1'}, 'slow');
    $(".homeButton").text("Return Home");

    // edit button appearance
    $(".editButton").text("Edit Item");
    $(".editButton").animate({opacity: '1'}, 'slow');
    $(".editButton").on("click", function () {
      editItem(objects);
    });
  });

   // ------ DELETE ------ //
   $(".delete").on("click", function () {
    // rewrite the subheader title
    $(".subHeader").empty();
    $(".subHeader").text("Which Item Are You Removing?");

    // fade away the CRUD options and make the API details appear
    crudFadeOut();
    $(".content").animate({opacity: '1'}, 'slow');

    // home button appearance
    $(".homeButton").animate({opacity: '1'}, 'slow');
    $(".homeButton").text("Return Home");

    // delete button appearance
    $(".deleteButton").text("Remove Item");
    $(".deleteButton").animate({opacity: '1'}, 'slow');
    $(".deleteButton").on("click", function () {
      deleteItem(objects);
    });
  });

};

$(document).ready(APICall);