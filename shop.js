spareShirts =  {
  shirt1: "images/shirt1.jpg",
  shirt2: "images/shirt2.avif",
  shirt3: "images/shirt3.webp",
  shirt4: "images/shirt4.jpg",
  shirt5: "images/shirt5.jpg",
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
    $(".content").animate({opacity: '1'}, 'slow');
};

// calls the API and passes data to another function
const APICall = () => {
    $.getJSON("https://fakestoreapi.com/products/category/women's clothing", successfullyExecutedAPI);
  };

  // fades out the CRUD options
const crudFadeOut = () => {
    console.log("fadeout function");
    $(".crudOption").animate({opacity: '0'}, 'slow');
};

// fades in the CRUD options
const crudFadeIn = () => {
  console.log("fadein function");
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
  crudFadeIn();
};

const findItem = (objects) => {
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

  // alert the updated price to the user
  alert(objects[itemNumber - 1].price);

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

const editItem = () => {
    // call the API and pass the data to the findItem function
    $.getJSON("https://fakestoreapi.com/products/category/women's clothing", findItem);
};
// --------------

// DELETE FUNCTIONS
const deleteFoundItem = (objects) => {
  let itemNumber = prompt("Enter the number of the item you wish to remove");
  objects.splice(itemNumber - 1, 1);
  APICall();

};

const deleteItem = () => {
  $.getJSON("https://fakestoreapi.com/products/category/women's clothing", deleteFoundItem);
};

const userChoice = () => {
  $(".subHeader").text("What'll It Be?");
  crudFadeIn();

  // ------ READ ------ //
  $(".read").on("click", function () {
    $(".subHeader").empty();
    $(".subHeader").text("Hover Over An Item To View Details");

    crudFadeOut();
    APICall();

    $(".homeButton").animate({opacity: '1'}, 'slow');
    $(".homeButton").text("Return Home");
  });

  // ------ UPDATE ------ //
  $(".update").on("click", function () {
    // rewrite the subheader title
    $(".subHeader").empty();
    $(".subHeader").text("Click Below To Edit An Item");

    // fade away the CRUD options and make the API details appear
    crudFadeOut();
    APICall();

    // home button appearance
    $(".homeButton").animate({opacity: '1'}, 'slow');
    $(".homeButton").text("Return Home");

    // edit button appearance
    $(".editButton").text("Edit Item");
    $(".editButton").animate({opacity: '1'}, 'slow');

  });

   // ------ DELETE ------ //
   $(".delete").on("click", function () {
    // rewrite the subheader title
    $(".subHeader").empty();
    $(".subHeader").text("Click Below To Remove An Item");

    // fade away the CRUD options and make the API details appear
    crudFadeOut();
    APICall();

    // home button appearance
    $(".homeButton").animate({opacity: '1'}, 'slow');
    $(".homeButton").text("Return Home");

    // delete button appearance
    $(".deleteButton").text("Remove Item");
    $(".deleteButton").animate({opacity: '1'}, 'slow');

  });

};

$(document).ready(userChoice);