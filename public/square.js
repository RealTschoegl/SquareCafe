function calculate_total_cost_of_all_drinks() {
  var total_cost = 0;

  // Only grab selected options that have a
  // 'data-price' attribute set
  // (ignores 'Please select a drink') options
  $('option:selected[data-price]').each(function(){
    total_cost += Number(
      $(this).attr('data-price')
    )
  });
  // console.log(typeof(Number("60")));
  // console.log(typeof(total_cost));
  // total_cost = (total_cost/100).toFixed(2) + Number($('#taxes').contents()[0]);
  total_cost_1 = total_cost + Number(($('#taxes').contents()[0]).data);
  console.log(Number(($('#taxes').contents()[0]).data));
  console.log(typeof(total_cost_1));
  return total_cost_1;
}

function generate_blank_drink_order() {
  $('form div:first').clone().insertAfter('form div:last');
}





$(document).ready(function() {

  // We want to watch for the customer to add a drink to their order
  // Every time they do, we want to give them another empty order option they can add
  // This way, they can add an unlimited number of drinks to their order

  // This weird 'change' syntax grabs all select tags,
  // even ones we haven't created yet
  $('form').on('change', 'select', function(){

    // Update total number of drinks (each select tag is one drink)
    $('#drinks').text(
      $('select').length
    );

    // Change the tax calculations
    $('#taxes').load('/taxes', $('form').serialize());
     // $.get(
     //  '/taxes',
     //  $('form').serialize(),

      // Once we hear back from the server,
      // update the page with the message received
    //   function(response) {
    //     $('#taxes').text(response);
    //   }
    // );

    generate_blank_drink_order();

    $('#cost').text("$" +
      calculate_total_cost_of_all_drinks()
    );
  });



  // Let's intercept the "Checkout" button,
  // and submit behind-the-scenes via AJAX, fancy-style
  $('form').submit(function(event){
    // Nope, don't reload the page much, kthx
    event.preventDefault();

    $.post(
      '/shop',
      $('form').serialize(),

      // Once we hear back from the server,
      // update the page with the message received
      function(response) {
        $('.panel:first h2').text(response);
      }
    );
  });
});
