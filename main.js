
// JSON 파일로부터 items 배열 가져오기 
function loadItems() {
  return fetch('data/data.json')
    .then(response => response.json()) // json 파일로 변환
    .then(json => json.items); // json에 있는 배열 반환  
}

// item 생성 (동적으로 list 생성)
function createElement(item) {
  const img = document.createElement('img');
  img.setAttribute('class', 'item__thumbnail');
  img.setAttribute('src', item.image);

  const span = document.createElement('span');
  span.setAttribute('class', 'item__description');
  span.innerText = `${item.gender} / ${item.size}`;

  const li = document.createElement('li');
  li.setAttribute('class', 'item');
  li.setAttribute('data-type', item.type);
  li.setAttribute('data-color', item.color);
  li.setAttribute('data-size', item.size);
  li.append(img);
  li.append(span);
  return li;
}

// 버튼을 눌렀을 때 
function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }
  updateItems(items, key, value);
}

function updateItems(items, key, value) {
  items.forEach(item => {
    if (item.dataset[key] === value) {
      item.classList.remove('invisible');
    }
    else {
      item.classList.add('invisible');
    }
  });
}

// main
loadItems()
  .then(items => {
    const elements = items.map(createElement);
    const container = document.querySelector('.items');
    container.append(...elements);

    const logo = document.querySelector('.logo');
    logo.addEventListener('click', () => {
      elements.forEach(item => {
        item.classList.remove('invisible');
      })
    });
    
    const buttons = document.querySelector('.buttons');
    buttons.addEventListener('click', event => onButtonClick(event, elements));
  });