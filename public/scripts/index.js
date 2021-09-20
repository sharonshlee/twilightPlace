$(() => {
  $.get("/api/users").then((users) => {
    for (user of users) {
      $("<div>").text(user.name).appendTo($("body"));
    }
  });
  $("#btnPlaceOrder").click(() => {
    const orders = [
      { quantity: 1, dishId: 2, clientId: 3, orderType: "Main Course" },
      { quantity: 1, dishId: 1, clientId: 3, orderType: "Main Course" },
    ];
    const phoneNumber = $("#txtPhoneNumber").val();
    const customerName = $("#txtName").val();
    $.post("/api/orders/confirm", { orders, phoneNumber, customerName }).then(
      (res) => console.log(">>> Order Placed!", res)
    );
  });
});
