$(() => {
  $('#rewardsForm').on('submit', (event) => {
    event.preventDefault();
    applyRewards();
  })
});

function applyRewards() {

 return $.ajax({
    url: '/api/rewards',
    method: 'GET'
  })
  .then(rewards => {
    const $orderTotal = $('#order_total');
    const $totalBeforeRewards = parseInt($('#order_total').text());
    if (rewards.count >= 1) {
      const newTotal = $totalBeforeRewards * 0.8;
      return $orderTotal.text(`Rewards Successfully Applied! Your New Total is: ${newTotal}`);
    }
    $orderTotal.text(`Insufficient Rewards. Total is still: ${$totalBeforeRewards}`);
  })
}




