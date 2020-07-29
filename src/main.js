//query selectors / global variables
var body = document.querySelector('body');
var inputTitle = document.querySelector('.idea-form-title');
var inputBody = document.querySelector('.idea-form-body');
var ideaCardsGrid = document.querySelector('.idea-cards');
var ideaForm = document.querySelector('form');
var saveButton = document.querySelector('.idea-form-button');
var hamburgerIcon = document.querySelector('.hamburger-icon');
var menuCloseIcon = document.querySelector('.menu-close-icon');
var menuDropDown = document.querySelector('.menu-dropdown');
var blanket = document.querySelector('.blanket');
var starredIdeasButton = document.querySelector('.show-starred-ideas');
var searchBar = document.querySelector('.search-input');
var commentInputField = document.querySelector('.comment-input')


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
    if(event.target.classList.contains('add-comment-icon')){
      toggleCommentForm();
    }
    if(event.target.classList.contains('save-comment-btn')){
      displayComment();
    }
};

function keyupHandler(event){
  if(event.target === inputTitle || event.target === inputBody){
    disableEnableButton();
  }
  if(event.target === searchBar){
    filterIdeas();
  }
  if(event.target.classList.contains('comment-input')){
    disableEnableCommentButton();
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
        var deletedCard = list[i];
        list.splice(i, 1);
        deletedCard.deleteFromStorage(list);
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
        currentIdea = new Idea(list[i].title, list[i].body, [], true);
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
    printIdeaHTML(list[i], imgCardSrc);
  }
};

function disableEnableButton(){
  if (!inputTitle.value.trim() || !inputBody.value.trim()){
    saveButton.disabled = true;
  } else {
    saveButton.disabled = false;
  }
};

function disableEnableCommentButton(){
  var commentSaveButton = event.target.nextElementSibling
  var commentInput = event.target
  if (!commentInput.value.trim()){
    commentSaveButton.disabled = true
  } else {
    commentSaveButton.disabled = false
  }
}

function toggleDropDown(){
  menuDropDown.classList.toggle('hidden');
  blanket.classList.toggle('hidden');
}

function getAllIdeaCardsFromLocalStorage(){
  if (localStorage.key('allIdeas')) {
    list = [];
    var retrieveAllIdeas = localStorage.getItem('allIdeas');
    var parseAllIdeas = JSON.parse(retrieveAllIdeas) || [];
    for (var i = 0; i < parseAllIdeas.length; i++) {
      currentIdea = new Idea(parseAllIdeas[i].title, parseAllIdeas[i].body, parseAllIdeas[i].comments, parseAllIdeas[i].star);
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
        printIdeaHTML(list[i], "src='./src/icons/star-active.svg'")
      }
    }
  } else{
    starredIdeasButton.innerText = 'Show Starred Ideas';
    displayIdeaCards();
  }
}

function filterIdeas(){
  var searchTerm = event.target.value;
  if(searchTerm !== ""){
    ideaCardsGrid.innerHTML = "";
    for(var i = 0; i < list.length; i++){
      if(list[i].title.includes(searchTerm) || list[i].body.includes(searchTerm)){
        var imgCardSrc = "";
        if(list[i].star){
          imgCardSrc = `src="./src/icons/star-active.svg"`
        } else {
          imgCardSrc = `src="./src/icons/star.svg"`
        }
      printIdeaHTML(list[i], imgCardSrc);
      }
    }
  } else {
    displayIdeaCards();
  }
}

function toggleCommentForm(){
  var commentForm = event.target.parentNode.nextElementSibling;
  commentForm.classList.toggle("hidden");
  var button = event.target.parentNode.nextElementSibling.lastElementChild
  button.disabled = true;
}

function displayComment(){
  var commentSection = event.target.parentNode.nextElementSibling
  var commentInput = event.target.previousElementSibling
  var currentComment = new Comment(commentInput.value)
  console.log(currentComment)
  event.preventDefault();
  var comment = `
  <div class="one-comment">
  <h6> ${currentComment.content} </h6>
  </div>`
  commentSection.insertAdjacentHTML('afterbegin', comment)
  commentInput.value = '';
  var ideaCardID = event.target.closest(".idea-card").dataset.id
  for (var i = 0; i < list.length; i++){
    if(list[i].id == ideaCardID){
      list[i].comments.push(currentComment)
      list[i].saveToStorage(list);
    }
  }
  var button = event.target
  button.disabled = true;
}

function printIdeaHTML(list, imgCardSrc){
  var ideaCard = `
    <article data-id="${list.id}" class="idea-card">
      <section class="idea-card-header">
        <img class="star-icon" ${imgCardSrc} alt="favorite Card">
        <img class="delete-icon" src="./src/icons/delete.svg" alt="Delete Card">
      </section>
      <section class="idea-card-body">
        <h3 class="idea-title">
          ${list.title}
        </h3>
        <p class="idea-body">
          ${list.body}
        </p>
      </section>
      <section class="idea-card-footer">
        <img class="add-comment-icon" src="./src/icons/comment.svg" alt="Comment Icon">
        <p class="comment">Comment</p>
      </section>
      <form class="comment-form hidden">
        <input class="comment-input">
        <button class="save-comment-btn">
        Save
        </button>
      </form>
      <section class="comments">
      ${printCommentsDiv()}
      </section>
    </article>

  `;
  ideaCardsGrid.insertAdjacentHTML("afterbegin", ideaCard);
};

function printCommentsDiv(){
  var commentSectionHTML = '';
  for (var i = 0; i < list.length; i++){
    if(list[i].comments.length > 0){
      for (var j = 0; j < list[i].comments.length; j++){
        console.log('listJ',list[i].comments[j].content)
        commentSectionHTML += `
        <div class="one-comment">
        <h6> ${list[i].comments[j].content} </h6>
        </div>
        `
      }
    }
  }
  console.log(commentSectionHTML)
  return commentSectionHTML
}
