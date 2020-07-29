
class Idea {
  constructor(title, body, comments, star){
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.comments = comments || [];
    this.star = star || false;
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
