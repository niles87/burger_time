$(function() {
  $(".devour").on("click", function(event) {
    console.log($(this));
    var id = $(this).data("id");
    console.log(id);
    var isDevoured = $(this).data("devoured");
    console.log(isDevoured);
    var devouredState = { devoured: isDevoured };

    $.ajax("/api/burgers/" + id, { type: "PUT", data: devouredState }).then(function() {
      console.log("changed sleep to", isDevoured);
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
