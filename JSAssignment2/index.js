var listItemTemp = document.getElementById('listItems');
var count = generateId();

function generateId(){
    if(sessionStorage.length>0)
        return Math.max.apply(Math,Object.keys(sessionStorage))+1;
    else
        return 0;
}

window.onload = function(){
    var keys = Object.keys(sessionStorage);
    for(var key of keys){
        var elem = JSON.parse(sessionStorage.getItem(key));
        createListItem(key,elem.name);
        if(elem.isCompleted)
            setCompleteAndResetStatus(elem.name, true);
    }
    var jsonObj = {name: '',isCompleted: false};
    document.getElementById("listInput").addEventListener('keypress',function(event){
        if ((event.keyCode == 13 || event.which == 13) && this.value!=""){
        jsonObj.name = this.value;
        sessionStorage.setItem(count,JSON.stringify(jsonObj));
        createListItem(count++,this.value);
        this.value="";
    }});
    document.getElementById('All').addEventListener('change',completeAndResetAll);
    document.getElementById('clear').addEventListener('click', clearCompleted);
    var filters = document.getElementsByClassName('filterItem');
    for(var elem of filters)
        elem.addEventListener('click',this.setFilterStatus);
}

function setFilterStatus(){
    var filters = document.getElementsByClassName('filterItem');
    for(var filter of filters)
        filter.classList.remove('selected');
    this.classList.add('selected');
    var elems = document.getElementById('list').getElementsByTagName('li');
    for(var i=0;i<elems.length;i++)
    {
        if(this.id == 'activeFilter' && !(elems[i].getAttribute('class')==null || elems[i].getAttribute('class')=="")) 
            elems[i].style.display = 'none';
        else if(this.id == 'completedFilter' && (elems[i].getAttribute('class')==null || elems[i].getAttribute('class')=="")) 
            elems[i].style.display = 'none';
        else
            elems[i].style.display = 'list-item';
    }
}

function createListItem(id, name){
    var listItem = listItemTemp.cloneNode(true);
    listItem = listItem.innerHTML.replaceAll('ITEM_NAME',name).replaceAll('ITEM_ID',id);
    $('#list').append(listItem);
    document.getElementById("AllLabel").style.display='inline-block';
    setFooter();
    document.getElementById('allFilter').classList.add('selected');
    document.getElementById('remove_'+name).addEventListener("click", function(){removeItem(name);});
    document.getElementById('checkbox_'+name).addEventListener('change', function(){completeAndResetItem(id, name, this.checked)}, false);
}

function completeAndResetItem(id, name, status){
    setCompleteAndResetStatus(name, status);
    var listItem = JSON.parse(sessionStorage.getItem(id));
    listItem.isCompleted = status;
    sessionStorage.setItem(id, JSON.stringify(listItem));
    setFooter();
}

function setCompleteAndResetStatus(name, isCompleted){
    var listItem = $('label:contains('+name+')')[0].parentElement.parentElement;
    if(isCompleted)
        listItem.setAttribute('class','completed');
    else
        listItem.setAttribute('class','');
    listItem.getElementsByClassName('round')[0].getElementsByTagName('input')[0].checked = isCompleted;
}

function completeAndResetAll(){
    var keys = Object.keys(sessionStorage);
    for(var key of keys){
        var item = JSON.parse(sessionStorage.getItem(key));
        item.isCompleted = this.checked;
        setCompleteAndResetStatus(item.name, this.checked);
        sessionStorage.setItem(key, JSON.stringify(item))
    }
    setFooter();
}

function clearCompleted()
{
    var keys = Object.keys(sessionStorage);
    for(var key of keys){
        var item = JSON.parse(sessionStorage.getItem(key));
        if(item.isCompleted){
            document.getElementById('list').removeChild($('label:contains('+item.name+')')[0].parentElement.parentElement);
            sessionStorage.removeItem(key);
        }
    }
    setFooter();
}

function removeItem(name)
{
    var listItem = $('label:contains('+name+')')[0];
    document.getElementById('list').removeChild(listItem.parentElement.parentElement);
    sessionStorage.removeItem(listItem.id);
    setFooter();
}

function setFooter(){
    var listSection = document.getElementsByClassName('listSection')[0];
    if(sessionStorage.length==0){
        $('.todoFooter').attr('style','display:none');
        document.getElementById("AllLabel").style.display='none';
        listSection.classList.remove('stack');
    }
    else{
        $('.todoFooter').attr('style','display:block');
        listSection.classList.add('stack');
    }
    setCount();
    setOpacityForAllCheckbox();
    setClearCompletedButton();
}

function setCount()
{
    var count = getActiveItemsCount();
    if(count == 1)
        $('#count').html('1 item left');
    else
        $('#count').html(count+' items left');
}

function setClearCompletedButton(){
    var keys = Object.keys(sessionStorage);
    var hasCompleted = false;
    for(var key of keys){
        if(JSON.parse(sessionStorage.getItem(key)).isCompleted){
            document.getElementsByClassName('clear')[0].style.display = 'block';
            hasCompleted = true;
            break;
        }
    }
    if(!hasCompleted)
        document.getElementsByClassName('clear')[0].style.display = 'none'; 
}

function setOpacityForAllCheckbox(){
    if(getActiveItemsCount()==0 && sessionStorage.length>0)
        document.getElementById("AllLabel").style.opacity='0.8';
    else
        document.getElementById("AllLabel").style.opacity='0.2';
}

function getActiveItemsCount(){
    var keys = Object.keys(sessionStorage);
    var activeCount=0;
    for(var key of keys){
        if(!JSON.parse(sessionStorage.getItem(key)).isCompleted)
            activeCount++;
    }
    return activeCount;
}