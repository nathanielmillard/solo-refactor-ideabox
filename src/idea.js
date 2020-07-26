
class Idea {
  constructor(title, body){
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.star = false;
  }

  saveToStorage(ideaCard) {
    // get the poster that was just created
    // turn that poster into a JSON string
    // store that poster into the localstorage
    var stringifyObject = JSON.stringify(ideaCard);
    localStorage.setItem(ideaCard.id.toString(), stringifyObject);
    console.log(localStorage);
  }
}
