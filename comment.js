class Comment {
  constructor(newContent){
    this.content = newContent
  }
  saveToIdeaCard(ideaCard){
    ideaCard.comments.push(this.content)
  }
};
