//query selectors / global variables
var body = document.querySelector('body');
var inputTitle = document.querySelector('.idea-form-title');
var inputBody = document.querySelector('.idea-form-body');
var ideaCardsGrid = document.querySelector('.idea-cards');
var ideaForm = document.querySelector('form');
var saveButton = document.querySelector('.idea-form-button');

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
