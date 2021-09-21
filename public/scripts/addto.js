
$(document).ready(function() {

  $(".form1").on("submit", function (event) {  //form submission--- $this referring to the form
    event.preventDefault();
    const food_id = $(this).data('id');

    $.ajax({

      url: `/foods/${food_id}`, //acutal server route
      method: 'POST',
      success: function (){
        console.log('submitted');
      }

    })

  });
});
