$(function() {
  $(".devour").on("click", function(event) {
    var id = $(this).data("id");

    var isDevoured = $(this).data("devoured");

    var devouredState = { devoured: isDevoured };

    $.ajax("/api/burgers/" + id, { type: "PUT", data: devouredState }).then(function() {
      location.reload();
    });
  });

  $(".create-burger").on("submit", function(event) {
    event.preventDefault();

    var newBurger = {
      burger_name: $("#burger")
        .val()
        .trim(),
    };

    $.ajax("/api/burgers", { type: "POST", data: newBurger }).then(function() {
      console.log("created new burger");
      location.reload();
    });
  });
});
