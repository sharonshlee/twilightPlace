$(() => {
  $('.search_menu').on('click', displayOptions);
});


function displayOptions(event) {
  event.preventDefault();
  if ($('#searchForm').html()) return;

  $('.search_container').append(`
    <form id="searchForm" method="POST" action="/searchMenu">
      <input type="text" name="searchInput" placeholder="Name Or Category" style="width: auto">
      <button type="submit" class="btn btn-outline-warning">Search</button>
    </form>
  `);
}
