//query selectors / global variables
var body = document.querySelector('body');
var inputTitle = document.querySelector('.idea-form-title');
var inputBody = document.querySelector('.idea-form-body');
var ideaCardsGrid = document.querySelector('.idea-cards');
var ideaForm = document.querySelector('form');
var saveButton = document.querySelector('.idea-form-button');
var hamburgerIcon = document.querySelector('.hamburger-icon');
var menuCloseIcon = document.querySelector('.menu-close-icon');
var menuDropDown = document.querySelector('.menu-dropdown')
var blanket = document.querySelector('.blanket')
var starredIdeasButton = document.querySelector('.show-starred-ideas')

var favoritedIdeas = [];
var list = [];
var currentIdea;

//eventlisteners
body.addEventListener('click', clickHandler);
body.addEventListener('keyup', keyupHandler);
window.addEventListener('load', function() {
  disableEnableButton();
  displayIdeaCards();
});

//functions
function clickHandler(event){
    if(event.target.classList.contains('idea-form-button')){
      saveIdea();
    }
    if (event.target.classList.contains('hamburger-icon')){
      toggleDropDown();
    }
    if(event.target.classList.contains('menu-close-icon')){
      toggleDropDown();
    }
    if(event.target.classList.contains('delete-icon')){
      deleteIdea();
    }
    if(event.target.classList.contains('star-icon')){
      toggleFavoriteCard();
    }
    if(event.target.classList.contains('show-starred-ideas')){
      toggleShownIdeas();
    }
};

function keyupHandler(event){
  if(event.target === inputTitle || event.target === inputBody){
    disableEnableButton();
  }
};

function saveIdea(){
  event.preventDefault();
  currentIdea = new Idea(inputTitle.value, inputBody.value);
  list.push(currentIdea);
  currentIdea.saveToStorage(list);
  displayIdeaCards();
  ideaForm.reset();
  disableEnableButton();
}

function deleteIdea(){
  if(event.target.closest(".idea-card")){
    currentIdea = event.target.closest(".idea-card");
    ideaCardsGrid.removeChild(currentIdea);
    for(var i = 0; i < list.length; i++){
      if (+currentIdea.dataset.id === list[i].id) {
        list[i].deleteFromStorage(list);
        list.splice(i, 1);
      };
    };
  };
};

function toggleFavoriteCard(){
  var target = event.target.closest(".idea-card")
  if(event.target.src.includes('star.svg')) {
    event.target.src = './src/icons/star-active.svg';
    for(var i = 0; i < list.length; i++){
      if(+target.dataset.id === list[i].id) {
        currentIdea = new Idea(list[i].title, list[i].body, true);
        currentIdea.id = list[i].id;
        list[i].star = true;
        currentIdea.updateIdea(list);
      }
    }
  } else {
    event.target.src = './src/icons/star.svg'
    for(var i = 0; i < list.length; i++){
      if(+target.dataset.id === list[i].id) {
        currentIdea = new Idea(list[i].title, list[i].body);
        currentIdea.id = list[i].id;
        list[i].star = false;
        currentIdea.updateIdea(list);
      }
    }
  }
}

function displayIdeaCards(){
  ideaCardsGrid.innerHTML = '';
  getAllIdeaCardsFromLocalStorage();
  for (var i = 0; i < list.length; i++){
    var imgCardSrc = "";
    if(list[i].star){
      imgCardSrc = `src="./src/icons/star-active.svg"`
    } else {
      imgCardSrc = `src="./src/icons/star.svg"`
    }
    var ideaCard = `
      <article data-id="${list[i].id}" class="idea-card">
        <section class="idea-card-header">
          <img class="star-icon" ${imgCardSrc} alt="favorite Card">
          <img class="delete-icon" src="./src/icons/delete.svg" alt="Delete Card">
        </section>
        <section class="idea-card-body">
          <h3 class="idea-title">
            ${list[i].title}
          </h3>
          <p class="idea-body">
            ${list[i].body}
          </p>
        </section>
        <section class="idea-card-footer">
          <img class="add-icon" src="./src/icons/comment.svg" alt="Comment Icon">
          <p class="comment">Comment</p>
        </section>
      </article>
    `;
    ideaCardsGrid.insertAdjacentHTML("afterbegin", ideaCard);
  }
}

function disableEnableButton(){
  if (!inputTitle.value.trim() || !inputBody.value.trim()){
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false;
  }
};

function toggleDropDown(){
  menuDropDown.classList.toggle('hidden');
  blanket.classList.toggle('hidden');
}

function getAllIdeaCardsFromLocalStorage(){
  if (localStorage.key('allIdeas')) {
    list = [];
    var retrieveAllIdeas = localStorage.getItem('allIdeas');
    var parseAllIdeas = JSON.parse(retrieveAllIdeas);
    for (var i = 0; i < parseAllIdeas.length; i++) {
      currentIdea = new Idea(parseAllIdeas[i].title, parseAllIdeas[i].body, parseAllIdeas[i].star);
      currentIdea.id = parseAllIdeas[i].id;
      list.push(currentIdea);
    };
  }
}

function toggleShownIdeas(){
  ideaCardsGrid.innerHTML = "";
  if(starredIdeasButton.innerText == 'Show Starred Ideas'){
    starredIdeasButton.innerText = 'Show All Ideas';
    for (var i = 0; i < list.length; i++){
      if(list[i].star){
        var ideaCard = `
          <article data-id="${list[i].id}" class="idea-card">
            <section class="idea-card-header">
              <img class="star-icon" src="./src/icons/star-active.svg" alt="favorite Card">
              <img class="delete-icon" src="./src/icons/delete.svg" alt="Delete Card">
            </section>
            <section class="idea-card-body">
              <h3 class="idea-title">
                ${list[i].title}
              </h3>
              <p class="idea-body">
                ${list[i].body}
              </p>
            </section>
            <section class="idea-card-footer">
              <img class="add-icon" src="./src/icons/comment.svg" alt="Comment Icon">
              <p class="comment">Comment</p>
            </section>
          </article>
        `;
        ideaCardsGrid.insertAdjacentHTML("afterbegin", ideaCard);
      }
      }
  } else{
    starredIdeasButton.innerText = 'Show Starred Ideas';
    displayIdeaCards();
  }
}
