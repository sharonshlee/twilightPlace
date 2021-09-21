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
    const $orderText = $('#order_text');
    const $orderTotal = $('#order_total');
    const $totalBeforeRewards = parseInt($orderTotal.text().slice(1));
    if (rewards.count >= 1) {
      const newTotal = $totalBeforeRewards * 0.8;
      console.log("totalBeforeRewards :", $totalBeforeRewards);
      console.log("NEW TOTAL IS : ", newTotal);
      $orderText.text('Rewards Successfully Applied! Your New Total is: ');
      return $orderTotal.text(`$${newTotal}`);
    }
    return $orderText.text('Insufficient Rewards. Total is still: ');
  })
}




