$(() => {
  $.get("/api/users").then((users) => {
    for (user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });
  $("#btnPlaceOrder").click(() => {
    const dishes = [
      { dishId: 2, quantity: 1 },
      { dishId: 1, quantity: 2 },
    ];

    const phoneNumber = $("#txtPhoneNumber").val();
    const customerName = $("#txtName").val();
    const customerEmail = $("#txtEmail").val();
    $.post("/api/orders/confirm", {
      dishes,
      phoneNumber,
      customerName,
      customerEmail,
    }).then((res) => console.log(">>> Order Placed!", res));
  });
});
