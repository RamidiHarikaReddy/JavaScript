function Todo(name){
    this.dataProvider = new DataProvider(name);
    this.modal = new Modal(this.dataProvider);
    this.template = new Template();
    this.view = new View(this.template);
    this.controller = new Controller(this.modal, this.view);
}

var todo = new Todo('todos');
