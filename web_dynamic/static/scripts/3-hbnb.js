$(document).ready(() => {
  let amenities = {};
  $(document).on('change', "input[type='checkbox']", () => {
    if (this.checked) {
      const key = $(this).data('id');
      amenities[key] = $(this).data('name');
    } else {
      delete amenities[key];
    }
    let lst = Object.values(amenities);
    if (lst.length > 0) {
      $('div.amenities > h4').text(Object.values(amenities).join(', '));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  });
});

$.get('http://0.0.0.0:5001/api/v1/status/', (data, textStatus) => {
    if (textStatus === 'success') {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
      }
    }
  });
});

$.ajax({
  type: 'POST',
  url: 'http://0.0.0.0:5001/api/v1/places_search',
  data: '{}',
  dataType: 'json',
  contentType: 'application/json',
  success: (data) => {
  for (let i = 0; i < data.length; i++) {
    let place = data[i];
    $('.places ').append('<article><h2>' + place.name + '</h2><div class="price_by_night"><p>$' + place.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' + place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' + place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' + place.number_bathrooms + '</p></div></div><div class="description"><p>' + place.description + '</p></div></article>');
      }
    }
  });
});
