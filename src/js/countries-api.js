const BASE_URL = 'https://restcountries.com/v3.1/name';

export const fetchCountries = query => {
  return fetch(
    `${BASE_URL}/${query}?fields=name,capital,population,flags,languages`
  ).then(response => {
    console.log(response);
    if (!response.ok) {
      throw new Error(response.status);
    }

    return response.json();
  });
};
