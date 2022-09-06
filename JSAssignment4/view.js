function View(template){
    this.template = template;
    View.prototype.currentFilter = 'allFilter';
}

View.prototype.render = function(data){
    for(d of data){
        this.createTodo(d);
        this.toggleComplete(d.id,d.completed);
    }
}

View.prototype.createTodo = function(data){
    $('#list').append(this.template.show(data));
    $("#AllLabel").css('display','inline-block');
}

View.prototype.clearTodoInput = function(){
    document.getElementById('listInput').value="";
}

View.prototype.toggleComplete = function(id, isCompleted){
    var listItem = document.getElementById(id);
    if(isCompleted)
        listItem.setAttribute('class','completed');
    else
        listItem.setAttribute('class','');
    listItem.getElementsByClassName('round')[0].getElementsByTagName('input')[0].checked = isCompleted;
}

View.prototype.completeAll = function(data){
    for(d of data)
        this.toggleComplete(d.id, d.completed);
}

View.prototype.removeItem = function(id){
    var listItem = document.getElementById(id);
    document.getElementById('list').removeChild(listItem);
}

View.prototype.toggleAll = function(counts){
    if(counts.all==0)
        $("#AllLabel").css('display','none');
    else if(counts.active==0){
        $('#AllLabel').css('opacity',0.8);
        $('#All').attr('checked',true);
    }
    else
        $('#AllLabel').css('opacity',0.2);
}

View.prototype.setFilter = function(filteredList, id){
    View.prototype.currentFilter = id;
    $('.filterItem.selected').removeClass('selected');
    $("#list li").css("display", "none");
    document.getElementById(id).classList.add('selected');
    for(element of filteredList){ 
        $("#"+element.id).css("display", "list-item");
    }
}

View.prototype.removeCompleted = function(data){
    for(key of data)
        document.getElementById('list').removeChild($('#'+key.id)[0]); 
}

View.prototype.setClearCompletedButton = function(counts){
    (counts.completed==0)? $('.clear').css('display','none') : $('.clear').css('display','block');
}

View.prototype.setCount = function(active){
    var plural = active === 1 ? '' : 's';
    $('#count').html(active+' item'+plural+' left');
}

View.prototype.setFooter = function(counts){
    var listSection = $('.listSection')[0];
    if(counts.all==0){
        $('.todoFooter').css('display','none');
        listSection.classList.remove('stack');
    }
    else{
        $('.todoFooter').css('display','block');
        listSection.classList.add('stack');
    }
}

View.prototype.edit = function(){
    
}