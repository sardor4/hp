const cardsContent = document.querySelector(".cards__content"),
input = document.getElementById('search'),
btn = document.querySelectorAll('.category');

input.addEventListener("input", () => {
  let searchingData = data.filter((e) => e.name.toLowerCase().includes(input.value.toLowerCase()));
  displayData(searchingData);
});

btn.forEach(e => {
  e.addEventListener("click", function () {
    filterCategory(e.textContent)
  });
});

let data = [];
const getData = async () => {
  const response = await fetch('http://hp-api.herokuapp.com/api/characters');
  data = await response.json();
  displayData(data);
}
getData();

const displayData = function(data) {
  let html = '';
  data.map(e => {
    html += `<div class="card__item">
                  <div class="left">
                    <img src="${e.image == "" ? e.gender == 'male' ? 'assets/img/def-male.jpg' : 'assets/img/def-female.jpg' : e.image}" class="card-image" alt="">
                    <p class="card__text card-name">${e.name}</p> 
                  </div>
                  <div class="right">
                    <p class="card__text card-alternate_names">Alternate names: <span class="card-span">${e.alternate_names.length == 0 ? 'no' : e.alternate_names}</span></p>
                    <p class="card__text card-species">Species: <span class="card-span">${e.species}</span></p>
                    <p class="card__text card-gender">Gender: <span class="card-span">${e.gender}</span></p>
                    <p class="card__text card-house">House: <span class="card-span">${e.house == '' ? 'no information available' : e.house}</span></p>
                    <p class="card__text card-date">Date of birth: <span class="card-span">${e.dateOfBirth == '' ? 'no information' : e.dateOfBirth}</span></p>
                    <p class="card__text card-year">Year of birth: <span class="card-span">${e.yearOfBirth == '' ? 'no information' : e.yearOfBirth}</span></p>
                    <p class="card__text card-type">Type: <span class="card-span">${e.wizard === true ? 'wizard' : 'villain'}</span></p>
                    <p class="card__text card-ancestry">Ancestry: <span class="card-span">${e.ancestry == '' ? 'no' : e.ancestry}</span></p>
                    <p class="card__text card-eye">Eye colour: <span class="card-span">${e.eyeColour == '' ? 'no information' : e.eyeColour}</span></p> 
                    <p class="card__text card-hair">Hair colour: <span class="card-span">${e.hairColour == '' ? 'no information' : e.hairColour}</span></p>
                    <p class="card__text card-wand">Wand characteristics - wood: <span class="card-span">${e.wand.wood == '' ? 'no' : e.wand.wood}</span>; core: <span class="card-span">${e.wand.core == '' ? 'no' : e.wand.core}</span>; length: <span class="card-span">${e.wand.length == '' ? 'no' : e.wand.length}</span></p>
                    <p class="card__text card-patronus">Patronus: <span class="card-span"> ${e.patronus == '' ? 'none' : e.patronus}</span></p> 
                    <p class="card__text card-actor">Actor: <span class="card-span">${e.actor == '' ? 'none' : e.actor}</span></p> 
                    <p class="card__text card-alternate_actors">Alternate actors: <span class="card-span">${e.alternate_actors.length == 0 ? 'none' : e.alternate_actors}</span></p> 
                  </div>
               </div>`
  })
  cardsContent.innerHTML = html;
}

const filterCategory = (category)=>{
  let filterBtn = data.filter(elem => elem.house == category);
  if(category == 'All'){
    displayData(data);
  }else{
    displayData(filterBtn);
  }
}
