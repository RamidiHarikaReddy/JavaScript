function Controller(model, view) {
    self = this;
    self.model = model;
    self.view = view;
    self.refreshElements();
    document.getElementById("listInput").addEventListener('keypress',function(event){
        if ((event.keyCode == 13 || event.which == 13) && this.value!=""){
            self.render(this.value);
    }});
    document.getElementById('All').addEventListener('change',self.toggleAll);
    document.getElementById('clear').addEventListener('click', self.clearCompleted);
    var filters = document.getElementsByClassName('filterItem');
    for(var elem of filters)
        elem.addEventListener('click',self.setFilterStatus);
    var removeTodos = document.getElementsByClassName('remove');
    for(var elem of removeTodos)
        elem.addEventListener('click',function(event){self.removeItem(event.target.id)});
    var checkboxes = document.getElementsByClassName('roundCheckbox');
    for(var elem of checkboxes)
        elem.addEventListener('change',function(event){self.toggleComplete(event.target.id, event.target.checked)});
}

Controller.prototype.self= this;

Controller.prototype.refreshElements = function(){
    self.view.render(self.model.getAll());
    self.setFooter();
    $('#allFilter').addClass('selected');
}

Controller.prototype.render = function(name){
    var data = self.model.add(name);
    self.view.createTodo(data);
    document.getElementById('remove_'+data.id).addEventListener("click", function(event){self.removeItem(event.target.id)});
    document.getElementById('checkbox_'+data.id).addEventListener('change', function(event){self.toggleComplete(event.target.id, event.target.checked)});
    self.view.clearTodoInput();
    self.setFooter();
}

Controller.prototype.setFooter = function(){
    var counts = self.model.getCounts();
    self.view.setFooter(counts);
    self.view.setCount(counts.active);
    self.view.setClearCompletedButton(counts);
    self.view.toggleAll(counts);
}

Controller.prototype.removeItem = function(id){
    id = id.replace('remove_','');
    self.view.removeItem(id);
    self.model.deleteRow(id);
    self.setFooter();
}

Controller.prototype.toggleComplete = function(id, isCompleted){
    id = id.replace('checkbox_','');
    self.view.toggleComplete(id,isCompleted);
    self.model.completeItem(id, isCompleted);
    self.setFooter();
    self.setFilterStatus(self.view.currentFilter);
}

Controller.prototype.toggleAll = function(){
    self.model.completeAll(this.checked);
    self.view.completeAll(self.model.getAll());
    self.setFooter();
    self.setFilterStatus(self.view.currentFilter);
}

Controller.prototype.clearCompleted = function(){
    var completedTodos = self.model.getCompleted();
    self.view.removeCompleted(completedTodos);
    for(var todo of completedTodos)
        self.model.deleteRow(todo.id);
    self.setFooter();
}

Controller.prototype.setFilterStatus = function(Filterid){
    if(this.id) 
        Filterid = this.id;
    var filteredList = [];
    switch(Filterid){
        case 'activeFilter':
                filteredList = self.model.getActive();
            break;
        case 'completedFilter':
                filteredList = self.model.getCompleted();
            break;
        default:
                filteredList = self.model.getAll();
            break;
    }
    self.view.setFilter(filteredList,Filterid);
}

Controller.prototype.edit = function(){
    
}