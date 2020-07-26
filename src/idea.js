
class Idea {
  constructor(title, body){
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.star = false;
  }

  saveToStorage(ideaCard) {
    var stringifyObject = JSON.stringify(ideaCard);
    var storageName = `ideaCard${localStorage.length}`;
    localStorage.setItem(storageName, stringifyObject);
  }

  deleteFromStorage(ideaCard) {

  }

  updateIdea(ideaCard) {

  }
}
