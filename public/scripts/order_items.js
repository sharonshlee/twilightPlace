$(document).ready(function() {
  //Get data form database table
  const loadOrderItems = () => {
    $.ajax({
      url: '/api/restaurant',
      method: 'get'
    }).then((result) => {
      renderNotes(result);
      renderCheckout(result);
      total();
    });
  };

  //Rendering notes
  const renderNotes = (items) => {
    $('.notes').empty();
    const notes = createNotesElement(items.foods_orders[0]);
    $('.notes').append(notes);
  };

  //Rendering elements
  const renderCheckout = (items) => {
    $('.itemsList').empty();
    for (const item of items.foods_orders) {
      const orderItem = createCheckoutElement(item);
      $('.itemsList').append(orderItem);
    }
  };

//Creating note data
const createNotesElement = (orderItem) => {
  let customerNote = orderItem.note;
  if (customerNote){
    const $item = $(
      `

        <span><b>Customer's special note :</b></span>
        <br>
        <span><b>${orderItem.note}</b></span>
      `
      );
      return $item;
  };
  return null;
};

  //Creating table data
  const createCheckoutElement = (orderItem) => {
    const $item = $(
      `
      <tr class="table">
        <td class="qty"><h2>${orderItem.quantity}</h2></td>
        <td class="itemInfo">
          <h3>${orderItem.name}</h3>
          <text>${orderItem.description}</text>
        </td>
        <td class="price-data">
          $<span class="amount">${orderItem.price * orderItem.quantity}</span>
        </td>
      </tr>
      `
    );
    return $item;
  };

  const total = () => {
    let subtotal = 0;

    $('.amount').each(function(index, value) {
      subtotal += parseInt($(value).text());
    });
    $('.subtotal').text(`$${subtotal}`);

    const tax = subtotal * 0.05;
    $('.tax').text(`$${tax}`);

    const total_amount = subtotal + tax;
    $('.total_amount').text(`$${total_amount}`);

  };

  loadOrderItems();

});
