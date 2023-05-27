import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import renderMarkupImages from './js/api.js';
import refs from './js/refs.js';

const API_KEY = '36746776-e64b35908dc0b8143507a4db3';
let page = 1;

refs.form.addEventListener('submit', e => {
  refs.gallary.innerHTML = '';
  refs.btnMore.classList.add('none');
  page = 1;

  e.preventDefault();

  fetchApiImages();
  async function fetchApiImages() {
    await api();
  }
});

refs.btnMore.addEventListener('click', () => {
  page += 1;
  getMoreImages();
  async function getMoreImages() {
    await api();
  }
});

function api() {
  axios
    .get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${refs.inputSearch.value}&per_page=40&page=${page}&image_type=photo&orientation=horizontal&safesearch=true`
    )
    .then(response => {
      refs.gallary.insertAdjacentHTML(
        'beforeend',
        renderMarkupImages(response.data)
      );

      refs.btnMore.classList.remove('none');

      if (response.data.totalHits === 0) {
        refs.btnMore.classList.add('none');

        Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );

        return;
      }

      if (response.data.hits.length < 40) {
        refs.btnMore.classList.add('none');
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );

        return;
      }
    })
    .catch(error => Notify.failure('Failure! not found api'));
}
