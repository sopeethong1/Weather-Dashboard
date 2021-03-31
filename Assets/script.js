var cityFormEL = $("#city-form");
var cityListEl = $("#city-list");

function handleFormSubmit(event) {
  event.preventDefault();

  var cityName = $('input[name="city-name"]').val();

  if (!cityName) {
    console.log('No city input!');
    return;
  }

  var citySearchResultEL = $(
    '<ul class="flex-row justify-space-between align-center p-2 bg-light text-dark">'
  );
  citySearchResultEL.text(cityName);

  citySearchResultEL.append("  "+
    '<button type="button" class="btn btn-outline-secondary btn-sm delete-item-btn">X</button>'
  );

  // print to the page
  cityListEl.append(citySearchResultEL);

  // clear the form input element
  $('input[name="city-input"]').val('');
}

function handleRemoveItem(event) {
  // convert button we pressed (`event.target`) to a jQuery DOM object
  var btnClicked = $(event.target);

  // get the parent `<li>` element from the button we pressed and remove it
  btnClicked.parent('li').remove();
}

// use event delegation on the `cityListEl` to listen for click on any element with a class of `delete-item-btn`
cityListEl.on('click', '.delete-item-btn', handleRemoveItem);
cityFormEL.on('submit', handleFormSubmit);
