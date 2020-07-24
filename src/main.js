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

var list = [];
//eventlisteners
body.addEventListener('click', clickHandler);
body.addEventListener('keyup', keyupHandler);
window.onload = disableEnableButton();
//functions
function clickHandler(event){
    if(event.target.classList.contains('idea-form-button')){
      saveIdea();
    }
    if (event.target.classList.contains('hamburger-icon')){
      displayDropDown();
    }
    if(event.target.classList.contains('menu-close-icon')){
      closeDropDown();
    }
};

function keyupHandler(event){
  if(event.target === inputTitle || event.target === inputBody){
    disableEnableButton();
  }
};

function saveIdea(){
  event.preventDefault();
  var currentIdea = new Idea(inputTitle.value, inputBody.value);
  list.push(currentIdea);
  displayIdeaCards();
  console.log(list);
  ideaForm.reset();
  disableEnableButton();
}

function displayIdeaCards(){
  ideaCardsGrid.innerHTML = '';
  for (var i = 0; i < list.length; i++){
    var ideaCard = `
      <article class="idea-card">
        <section class="idea-card-header">
          <img src="./src/icons/star-active.svg" alt="Active Card">
          <img src="./src/icons/delete.svg" alt="Delete Card">
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
          <img src="./src/icons/comment.svg" alt="Comment Icon">
          <p class="comment">Comment</p>
        </section>
      </article>
    `;
    ideaCardsGrid.insertAdjacentHTML("afterbegin", ideaCard);
  }
}

function disableEnableButton(){
  if (inputTitle.value !== '' && inputBody.value !== ''){
    saveButton.disabled = false;
    saveButton.classList.add('buttonEnabled');
  } else {
    saveButton.disabled = true;
    saveButton.classList.remove('buttonEnabled');
  }
};

function displayDropDown(){
  menuDropDown.classList.remove('hidden');
  blanket.classList.remove('hidden');
}

function closeDropDown(){
  menuDropDown.classList.add('hidden');
  blanket.classList.add('hidden');
}
