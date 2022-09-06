function Template() {
    this.listItemTemplate =	'<li id="ITEM_ID">'
    +' <div class="view">'
    +    '<div class="round">'
    +        '<input type="checkbox" class="roundCheckbox" id="checkbox_ITEM_ID">'
    +        '<label for="checkbox_ITEM_ID"></label>'
    +    '</div>'
    +    '<label class="text">ITEM_NAME</label>'
    +    '<button class="remove" id="remove_ITEM_ID">✕</button>'
    + '</div>'
    + '</li>';
}

Template.prototype.show = function (data) {
    var template = this.listItemTemplate;
    template = template.replaceAll('ITEM_ID', data.id);
    template = template.replace('ITEM_NAME', escape(data.name));
    return template;
};