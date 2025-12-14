// Frontend logic to call /api/apod and display results

const dateInput = document.getElementById('dateInput');
const getByDateBtn = document.getElementById('getByDate');
const getTodayBtn = document.getElementById('getToday');
const getRandomBtn = document.getElementById('getRandom');
const resultEl = document.getElementById('result');

function clearResult() {
  resultEl.innerHTML = '';
}

function showError(msg) {
  resultEl.innerHTML = `<div class="error">${msg}</div>`;
}

function renderApod(item) {
  // item can be object or array entry
  const title = item.title || '';
  const date = item.date || '';
  const explanation = item.explanation || '';
  const mediaType = item.media_type || 'image';
  const credit = item.copyright ? `© ${item.copyright}` : '';
  const htmlParts = [];

  htmlParts.push(`<h2>${title}</h2>`);
  htmlParts.push(`<p class="meta">${date} ${credit ? ' · ' + credit : ''}</p>`);

  if (mediaType === 'image') {
    const url = item.hdurl || item.url;
    htmlParts.push(`<div class="media"><img src="${url}" alt="${title}" /></div>`);
  } else if (mediaType === 'video') {
    // For videos, NASA returns a URL (YouTube embed); use iframe
    const url = item.url;
    htmlParts.push(`<div class="media"><iframe src="${url}" frameborder="0" allowfullscreen></iframe></div>`);
  }

  htmlParts.push(`<p class="explanation">${explanation}</p>`);

  resultEl.innerHTML = htmlParts.join('\n');
}

async function fetchApod(params = {}) {
  clearResult();
  resultEl.innerHTML = `<div class="loading">Loading...</div>`;
  try {
    const url = new URL('/api/apod', location.origin);
    Object.keys(params).forEach(k => url.searchParams.set(k, params[k]));
    const r = await fetch(url.toString());
    if (!r.ok) {
      const e = await r.json().catch(() => ({}));
      throw new Error(e.error || `Server error ${r.status}`);
    }
    const data = await r.json();

    // NASA returns array if count parameter used; ensure we handle both
    if (Array.isArray(data)) {
      // show first item (when count=1), or show list for multiple
      if (data.length === 0) {
        showError('No results returned.');
        return;
      }
      renderApod(data[0]);
    } else {
      renderApod(data);
    }
  } catch (err) {
    console.error(err);
    showError(err.message || 'Failed to fetch image.');
  }
}

getByDateBtn.addEventListener('click', () => {
  const date = dateInput.value;
  if (!date) {
    showError('Please pick a date.');
    return;
  }
  fetchApod({ date });
});

getTodayBtn.addEventListener('click', () => {
  // no date param -> today's APOD
  fetchApod();
});

getRandomBtn.addEventListener('click', () => {
  // request one random result (NASA returns array)
  fetchApod({ count: 1, thumbs: true });
});

// Load today's image on start
fetchApod();