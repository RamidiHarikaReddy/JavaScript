function Modal(dataProvider){
    var self = this
    self.dataProvider = dataProvider;
}

Modal.prototype.add = function (name) {
    var newItem = {
        name: name.trim(),
        completed: false
    };
    return this.dataProvider.saveItem(newItem);
};

Modal.prototype.update = function (id, data) {
    this.dataProvider.saveItem(data, id);
};

Modal.prototype.completeItem = function(Itemid, isComplete, element){
    if(!element)
        element = this.dataProvider.getItems({id : parseInt(Itemid)},true);
    element.completed = isComplete;
    this.dataProvider.saveItem(element, element.id);
}

Modal.prototype.completeAll = function(isComplete){
    var results = this.dataProvider.getAll();
    results.forEach(element => {
        this.completeItem(element.id, isComplete, element)
    });
}

Modal.prototype.deleteRow = function (id) {
    this.dataProvider.deleteItem(id);
};

Modal.prototype.deleteAll = function () {
    this.dataProvider.deleteAll();
};

Modal.prototype.getActive = function(){
    return this.dataProvider.getItems({completed:false});
}

Modal.prototype.getCompleted = function(){
    return this.dataProvider.getItems({completed: true});
}

Modal.prototype.getAll = function(){
    return this.dataProvider.getAll();
}

Modal.prototype.getCounts = function(){
    var counts = {
        active: 0,
        completed: 0,
        all: 0
    };
    var data = this.dataProvider.getAll();
    data.forEach(function (item) {
        if (item.completed) {
            counts.completed++;
        } else {
            counts.active++;
        }
        counts.all++;
    });
    return counts;
} 
