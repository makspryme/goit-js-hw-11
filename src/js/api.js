import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox/dist/simple-lightbox.esm';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const refs = {
  gallary: document.querySelector('.gallery'),
  inputSearch: document.querySelector('input[name="searchQuery"]'),
  form: document.querySelector('#search-form'),
  btnMore: document.querySelector('.load-more'),
};

export const apiOptions = {
  API_KEY: '36746776-e64b35908dc0b8143507a4db3',
  page: 1,
};

function renderMarkupImages(data) {
  const card = data.hits
    .map(el => {
      return `<div class="photo-card">
        <a href="${el.largeImageURL}"><img width="350" height="200" src="${el.webformatURL}" alt="${el.tags}" loading="lazy" /></a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            ${el.likes}
          </p>
          <p class="info-item">
            <b>Views</b>
            ${el.views}
          </p>
          <p class="info-item">
            <b>Comments</b>
            ${el.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>
            ${el.downloads}
          </p>
        </div>
      </div>`;
    })
    .join('');

  return card;
}

export default async function fetchApiImages(API_KEY, page) {
  await axios
    .get(
      `https://pixabay.com/api/?key=${API_KEY}&q=${refs.inputSearch.value}&per_page=40&page=${page}&image_type=photo&orientation=horizontal&safesearch=true`
    )
    .then(({ data }) => {
      refs.gallary.insertAdjacentHTML('beforeend', renderMarkupImages(data));

      refs.btnMore.classList.remove('none');
      new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });

      if (data.totalHits === 0) {
        refs.btnMore.classList.add('none');

        Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );

        return;
      }

      if (data.hits.length < 40) {
        refs.btnMore.classList.add('none');
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );

        return;
      }
    })
    .catch(error => Notify.failure('Failure! not found api'));
}
