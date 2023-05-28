import fetchApiImages from './js/api.js';
import { refs, apiOptions } from './js/api.js';

refs.form.addEventListener('submit', async e => {
  e.preventDefault();

  refs.gallary.innerHTML = '';
  refs.btnMore.classList.add('none');
  apiOptions.page = 1;

  await fetchApiImages(apiOptions.API_KEY, apiOptions.page);
});

refs.btnMore.addEventListener('click', async () => {
  apiOptions.page += 1;

  await fetchApiImages(apiOptions.API_KEY, apiOptions.page);
});
