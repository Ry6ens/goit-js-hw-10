import Debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import { fetchCountries } from './countries-api';
import countryCardTemplate from '../templates/countries-card.hbs';
import countryListTemplate from '../templates/list-countries.hbs';

const countryTypeEl = document.querySelector('#search-box');
const coutryInfoEL = document.querySelector('.js-country-info');

const removeListCountries = event => {
  coutryInfoEL.innerHTML = '';
};

const randomContent = data => {
  if (data.length > 10) {
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
    removeListCountries();
    return;
  } else if (data.length !== 1) {
    return (coutryInfoEL.innerHTML = countryListTemplate({ data }));
  }

  //The result with one country
  const country = data.map(el => ({
    ...el,
    languages: Object.values(el.languages).join(', '),
  }));

  coutryInfoEL.innerHTML = countryCardTemplate({ data: country });
};

const onSearchType = event => {
  let searchQuery = event.target.value.trim();

  if (searchQuery === '') {
    return removeListCountries();
  }

  fetchCountries(searchQuery)
    .then(data => {
      randomContent(data);
      event.target.reset();
    })
    .catch(err => {
      if (err.message === '404') {
        Notiflix.Notify.failure('Oops, there is no country with that name');
        removeListCountries();
      }
    });
};

countryTypeEl.addEventListener('input', Debounce(onSearchType, 300));
