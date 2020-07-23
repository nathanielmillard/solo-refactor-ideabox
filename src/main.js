//query selectors / global variables
var body = document.querySelector('body');
var inputTitle = document.querySelector('.idea-form-title');
var inputBody = document.querySelector('.idea-form-body');
var ideaCardsGrid = document.querySelector('.idea-cards');
var list = [];
//eventlisteners
body.addEventListener('click', clickHandler);
//functions
function clickHandler(event){
    if(event.target.className === 'idea-form-button'){
      saveIdea();
    }
}

function saveIdea(){
  event.preventDefault();
  var currentIdea = new Idea(inputTitle.value, inputBody.value);
  list.push(currentIdea);
  displayIdeaCards();
  console.log(list);
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
