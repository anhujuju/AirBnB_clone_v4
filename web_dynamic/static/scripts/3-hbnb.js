document.addEventListener('DOMContentLoaded', () => {
  const amenities = document.querySelectorAll('.popover ul li input');
  const title = document.querySelector('.amenities h4');
  const allChecked = [];

  amenities.forEach(el => {
    el.addEventListener('click', () => {
      const name = el.getAttribute('data-name');
      if (el.checked === true) {
        allChecked.push(name);
        addToDOM(allChecked);
      } else {
        if (allChecked.includes(name)) {
          const position = allChecked.indexOf(name);
          delete allChecked[position];
          addToDOM(allChecked);
        }
      }
    });
  });

  function addToDOM (list) {
    let nameAment = '';
    list.forEach((el, idx) => {
      nameAment += el;
      if (list[idx + 1]) {
        nameAment += ', ';
      }
    });
    title.textContent = nameAment;
  }

  $.ajax({
    url: 'http://127.0.0.1:5001/api/v1/status/',
    type: 'GET',
    success: function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      }
    },
    error: function () {
      console.log('error API connection');
    }
  });

  const urlSearch = 'http://127.0.0.1:5001/api/v1/places_search/';

  $.ajax({
    url: urlSearch,
    type: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({}),
    success: function (response) {
      const section = $('.places');
      section.empty();
      for (const res of response) {
        const places = `
        <article>
          <div class="title_box">
            <h2>${res.name}</h2>
            <div class="price_by_night">$${res.price_by_night}</div>
          </div>
          <div class="information">
          <div class="max_guest">${res.max_guest} Guest(s)</div>
            <div class="number_rooms">${res.number_rooms} Bedroom(s)</div>
            <div class="number_bathrooms">${res.number_bathrooms} Bathroom(s)</div>
          </div>
          <div class="description">
            ${res.description}
          </div>
        </article>
        `;
        section.append(places);
      }
    }
  });
});
