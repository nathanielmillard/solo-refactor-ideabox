
class Idea {
  constructor(title, body, star){
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.star = star || false;
    this.comments = [];
  }

  saveToStorage(array) {
    var stringifyObject = JSON.stringify(array);
    localStorage.setItem('allIdeas', stringifyObject);
  }

  deleteFromStorage(array) {
    this.saveToStorage(array);
  }

  updateIdea(array) {
    this.saveToStorage(array);
  }
}
