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
});
