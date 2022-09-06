function Modal()
{
    this.src;
    this.images;
    this.createModal = function()
    {
        var modal = this;
        this.modalOverlay = $("<div>").attr("class","modal-overlay")[0];
        this.modalContent = document.createElement('div');
        setAttributes(this.modalContent,{"class":"modal","id":"modal"})
        this.modalOverlay.appendChild(this.modalContent);
        this.leftIcon = new LeftIcon("imageButtons")
        this.modalContent.appendChild(this.leftIcon);
        this.Image = document.createElement("img");
        this.leftIcon.addEventListener('click',function(){
            modal.prevImage();
        })
        this.modalContent.appendChild(this.Image);
        this.rightIcon = new RightIcon("imageButtons");
        this.modalContent.appendChild(this.rightIcon);
        this.rightIcon.addEventListener('click',function(){
            modal.nextImage();
        })
        var close = new CrossIcon();
        close.className = "close";
        var modalOverlay = this.modalOverlay;
        close.addEventListener("click",function(){
            modalOverlay.style.display="none";
        })
        this.modalContent.appendChild(close);
        return this.modalOverlay;
    }
    this.showModal = function(){
        this.Image.setAttribute("src",this.src);
        this.modalContent.style.display = "inline-flex";
        this.modalOverlay.style.display="block";
    }
    this.prevImage = function()
    {
        var current_image = this.images.indexOf(this.src);
        if (current_image > 0)
            current_image--;
        else if(current_image == 0) 
            current_image = this.images.length-1;
        this.src = this.images[current_image];
        this.Image.setAttribute("src",this.src);
    }
    this.nextImage = function()
    {
        var current_image = this.images.indexOf(this.src);
        if (current_image < this.images.length - 1)
            current_image++;
        else if(current_image == this.images.length-1) 
            current_image = 0;
        this.src = this.images[current_image];
        this.Image.setAttribute("src",this.src);
    }
}

function RightIcon(className)
{
    this.rightIcon = document.createElement("a");
    this.rightIcon.className = className;
    this.rightIcon.innerHTML = "&raquo;";
    return this.rightIcon;
}

function LeftIcon(className)
{
    this.leftIcon = document.createElement("a");
    this.leftIcon.className = className;
    this.leftIcon.innerHTML = "&laquo;";
    return this.leftIcon;
}

function CrossIcon()
{
    this.cross = document.createElement('a');
    this.cross.setAttribute("href","#");
    this.cross.innerHTML = "&#10006;";
    return this.cross;
}

function reset(container)
{
    for(var i=0;i<container.parentNode.children.length;i++)
        container.parentNode.children[i].innerHTML = "";
}

function DataService()
{
    this.getData = function(searchText, page)
    {
        var images = [];
        var url = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        $.getJSON( url, {
            tags: searchText,
            tagmode: "any",
            format: "json"
        },function(data){
	        $.each( data.items, function( i,item ) {
		        images.push(item.media.m);
            });
            page.images = images;
            page.changePage(1);
        });
    }
}

function numPages(records_per_page, images)
{
    return Math.ceil(images.length / records_per_page);
}

function Page(records_per_page)
{
    this.records_per_page = records_per_page;
    this.mainContainer = document.createElement("div");
    this.container = document.createElement("div");
    this.mainContainer.appendChild(this.container);
    this.container.style.display = "none";
    for (var i = 0; i < this.records_per_page ; i++) {
        var im = document.createElement("img");
        setAttributes(im,{"href":"#","class":"images"})
        this.container.appendChild(im);
    }
    this.pagination = new Pagination(this);
    this.pagination.createPagination();
    this.modal = new Modal();
    this.container.appendChild(this.modal.createModal());
    this.changePage = function(page)
    {
        var modal = this.modal;
        this.current_page = page;
        this.modal.images = this.images;
        this.noOfPages = numPages(records_per_page, this.images);
        if (this.current_page < 1) this.current_page = 1;
        if (this.current_page > this.noOfPages) this.current_page = this.noOfPages;
        var im = this.container.getElementsByTagName("img");
        for (var i = (this.current_page-1) * this.records_per_page, j=0; i < (this.current_page * this.records_per_page) && i < this.images.length; i++,j++) {
            setAttributes(im[j],{"src":this.images[i],"style":""})
            im[j].addEventListener("click", function(){ 
                modal.src = $(this).attr("src");
                modal.showModal();
            });
            if(i==(this.images.length-1) && j< (records_per_page-1))
                for(j=j+1;j< records_per_page;j++)
                    im[j].style.display = "none";
        } 
        this.container.style.display = "block";
        this.pagination.showPagination();
    }
    this.prevPage = function(){
        if (this.current_page > 1) 
            this.current_page--;
        this.changePage(this.current_page);
    }
    this.nextPage = function(){
        if (this.current_page < numPages(this.records_per_page, this.images)) 
            this.current_page++;
        this.changePage(this.current_page);
    }
}

function Pagination(page)
{
    this.left = new LeftIcon("btn_prev");
    this.right = new RightIcon("btn_next");
    this.pagination = document.createElement("div");
    this.createPagination = function(){
        setAttributes(this.pagination,{"class":"pagination"});
        this.pages = document.createElement("div");
        setAttributes(this.pages,{"id":"pages"});
        this.pagination.appendChild(this.pages);
        page.container.parentNode.appendChild(this.pagination);
        this.left.addEventListener("click", function(){ 
            page.prevPage();
        });
        this.right.addEventListener("click", function(){ 
            page.nextPage();
        });
    }
    this.showPagination = function(){
        this.pages.innerHTML = '';
        this.pages.appendChild(this.left);
        for(var i=1;i<=page.noOfPages;i++){
            var a = document.createElement("a");
            setAttributes(a,{"href":"#","id":"page"+i})
	        a.innerHTML = i;
	        a.addEventListener("click", function(){ 
                page.changePage($(this).prop('id').replace("page","")); 
            });
            if(i==page.current_page)
                a.setAttribute("class","active"); 
	        this.pages.appendChild(a);
        } 
        this.pages.appendChild(this.right);
        if(page.current_page == 1){
            this.left.style.display="none";
            this.right.style.display="block";
        }
        else if(page.current_page == page.noOfPages){
	        this.right.style.display="none";
            this.left.style.display="block";
        }
        else{
	        this.right.style.display="block";
            this.left.style.display="block";
        }
        this.pagination.style.display="inline-block";
    }
}

function Search(records_per_page)
{
    this.searchModal = document.createElement("div");
    setAttributes(this.searchModal,{"id":"search"});
    var searchBox = document.createElement("input");
    setAttributes(searchBox,{"type":"text","id":"searchImages","class":"searchImages","placeholder":"search for images"});
    this.searchIcon = document.createElement("button");
    setAttributes(this.searchIcon,{"id":"searchButton"});
    this.searchIcon.innerHTML = "&#128269;";
    var dataservice = new DataService();
    var page = new Page(records_per_page);
    this.searchIcon.addEventListener("click",function() {
        dataservice.getData(searchBox.value, page);
    });
    this.cross = new CrossIcon();
    this.cross.className = "clear";
    this.searchModal.appendChild(searchBox);
    this.searchModal.appendChild(this.cross);
    this.searchModal.appendChild(this.searchIcon);
    this.cross.addEventListener("click",function() {
        searchBox.value = "";
	    reset(page.container);
    });
    this.mainContainer = document.createElement("div");
    this.mainContainer.setAttribute("class","mainContainer");
    this.mainContainer.appendChild(this.searchModal);
    this.mainContainer.appendChild(page.mainContainer);
    document.body.appendChild(this.mainContainer);
}

function setAttributes(el, attrs) {
    for(var key in attrs) {
      el.setAttribute(key, attrs[key]);
    }
  }

window.onload =  function(){
   new Search(9);
   new Search(6);
   new Search(3);
};