function DataProvider(name){
    this.name = name;
	if (!localStorage.getItem(name)) {
		localStorage.setItem(name, "[]");
	}
}

DataProvider.prototype.getItems = function(query, onlyOne){
    var todos = JSON.parse(localStorage.getItem(this.name));
    var results = todos.filter(function (todo) {
        for (var q in query) {
            if (query[q] !== todo[q]) {
                return false;
            }
        }
        return true;
    });
    if(onlyOne)
        return results[0];
    else
        return results;
}

DataProvider.prototype.getAll = function(){
    var todos = JSON.parse(localStorage.getItem(this.name));
    return todos;
}

DataProvider.prototype.saveItem = function(data, id){
    var todos = JSON.parse(localStorage.getItem(this.name));
	if (id) {
	    for (var i = 0; i < todos.length; i++) {
			if (todos[i].id === id) {
				for (var key in data) {
					todos[i][key] = data[key];
				}
				break;
			}
		}
		localStorage.setItem(this.name, JSON.stringify(todos));
	} else {
		data.id = new Date().getTime();
		todos.push(data);
		localStorage.setItem(this.name, JSON.stringify(todos));
    }
    return data;
}

DataProvider.prototype.deleteItem = function(id){
    var todos = JSON.parse(localStorage.getItem(this.name));
    for (var i = 0; i < todos.length; i++) {
        if (todos[i].id == id) {
            todos.splice(i, 1);
            break;
        }
    }
    localStorage.setItem(this.name, JSON.stringify(todos));
}

DataProvider.prototype.deleteAll = function(){
	localStorage.setItem(this.name, "[]");
}
