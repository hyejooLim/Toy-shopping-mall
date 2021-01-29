function loadArray() {
    return fetch('data/data.json')
      .then(response => response.json())
      .then(json => json.items);
  }
  
  function displayToys(items) {
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createString(item)).join('');
  }
  
  function createString(item) {
    return `
      <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
        <span class="item__description">${item.gender} / ${item.size}</span>
      </li>
    `;
  }
  
  function setEventListeners(items) {
    const logo = document.querySelector('.logo');
    const btns = document.querySelector('.buttons');
    logo.addEventListener('click', () => displayToys(items));
    btns.addEventListener('click', e => onButtonClick(e, items));
  }
  
  function onButtonClick(e, items) {
    const dataset = e.target.dataset;
    const key = dataset.key;
    const value = dataset.value;
  
    if(key == null || value == null) {
      return;
    }
  
    displayToys(items.filter(item => item[key] === value));
  }
  
  loadArray()
    .then(items => {
      displayToys(items);
      setEventListeners(items);
    })