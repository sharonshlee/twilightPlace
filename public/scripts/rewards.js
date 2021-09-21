const users = require("../../routes/rewards");
console.log("ITS HITTING REWARDS.JSSSSS")
$(() => {
  console.log("JQUER WORKIN");
  $('#rewardsForm').on('submit', () => {
    console.log("IT SUBMITED!");
    getRewardsCount();
  })


})

function getRewardsCount() {
  $.ajax({
    url: '/api/rewards',
    method: 'GET'
  }).then((result) => {
    console.log('THE ROWS RESULT IS:', result.rows);
  });
}

