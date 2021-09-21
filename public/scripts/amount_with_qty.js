$(document).ready(function() {

  $( ".itemsList" ).on('click', '.qtyDec', function () {
    //Get the values
    const quantity = parseInt($(this).siblings(".qty").val());
    const amount = parseInt($(this).parents().siblings(".price-data").children(".amount").text());

    //Item must be greater than 1
    //Keep track quatity
    if (quantity > 1) {
      $(this).siblings(".qty").val(quantity - 1);
      $(this).parents().siblings(".price-data").children(".amount").text(amount - (amount / quantity));
    }

    let subtotal = 0;

    $('.amount').each(function(index, value) {
      subtotal += parseInt($(value).text());
    });
    $('.subtotal').text(`$${subtotal}`);

    const tax = subtotal * 0.05;
    $('.tax').text(`$${tax}`);

    const total_amount = subtotal + tax;
    $('.total_amount').text(`$${total_amount}`);
  });

  $( ".itemsList" ).on('click', '.qtyInc', function () {
    //Get the values
    const quantity = parseInt($(this).siblings(".qty").val());
    const amount = parseInt($(this).parents().siblings(".price-data").children(".amount").text());

    //Keep track quatity
    $(this).siblings(".qty").val(parseInt(quantity) + 1);
    $(this).parents().siblings(".price-data").children(".amount").text(amount + (amount / quantity));

    let subtotal = 0;

    $('.amount').each(function(index, value) {
      subtotal += parseInt($(value).text());
    });
    $('.subtotal').text(`$${subtotal}`);

    const tax = subtotal * 0.05;
    $('.tax').text(`$${tax}`);

    const total_amount = subtotal + tax;
    $('.total_amount').text(`$${total_amount}`);

  });
});
