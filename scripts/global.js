/**
 * Created by lihaoqing on 2017/8/7.
 */
function addLoadEvent(func) {
    var oldonload=window.onload;
    if(typeof window.onload!='function')
    {
        window.onload=func;
    }
    else{
        window.onload=function(){
            oldonload();
            func();
        }
    }
}
function insertAfter(newElement,targetElement) {
    var parent=targetElement.parentNode;
    if(parent.lastChild==targetElement){
        parent.appendChild(newElement);
    }
    else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}
function addClass(element,value) {
    if(!element.className){
        element.className=value;
    }
    else{
        newClassName=element.className;
        newClassName+='';
        newClassName+=value;
        element.className=newClassName;
    }
}
/*高亮选中导航并更换当前header背景图*/
function highlightPage(href){
    if(!document.getElementById)return false;
    if(!document.getElementsByTagName)return false;
    var headers=document.getElementsByTagName('header');
    if(headers.length==0)return false;
    var navs=headers[0].getElementsByTagName('nav');
    if(navs.length==0) return false;
    var links=navs[0].getElementsByTagName('a');

    for(var i=0;i<links.length;i++){ var linkurl;
        linkurl=links[i].getAttribute("href");
        if(window.location.href.indexOf(linkurl)!=-1){
            links[i].className="here";
            var linktext=links[i].lastChild.nodeValue.toLowerCase();
            document.body.setAttribute("id",linktext);
        }
    }
}
addLoadEvent(highlightPage);
/*about_显示一部分section*/
function showSection(id) {
    var sections=document.getElementsByTagName('section');
    for(var i=0;i<sections.length;i++)
    {
        if(sections[i].getAttribute("id")!=id)
        {sections[i].style.display="none";}
        else{
            sections[i].style.display="block";
        }
    }
}
function prepareInternalnav() {
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById) return false;
    var articles=document.getElementsByTagName('article');
    if(articles.length==0) return false;
    var navs=articles[0].getElementsByTagName("nav");
    if(navs.length==0) return false;
    var nav=navs[0];
    var links=nav.getElementsByTagName("a");
    for(var i=0;i<links.length;i++)
    {
        var sectionId=links[i].getAttribute("href").split("#")[1];
        if(!document.getElementById(sectionId))continue;
        document.getElementById(sectionId).style.display="none";
        links[i].destination=sectionId;   //创建一个destinaion属性
        links[i].onclick=function(){
            showSection(this.destination);
            return false;
        }
    }
}
addLoadEvent(prepareInternalnav);
/*photos_图片库*/
/*function showPic(whichpic) {
    if(!document.getElementById("placeholder")) return false;
    var source=whichpic.getAttribute("href");
    var placeholder=document.getElementById("placeholder");
    var text;
    placeholder.setAttribute("src",source);
    if(!document.getElementById("descirption")) return false;
    if(whichpic.getAttribute("title"))
    {
        text=whichpic.getAttribute("title");
    }
    else{
        text="";
    }
    var description=document.getElementById("description");
    if(description.firstChild.nodeType==3)
    {
        description.first.nodeValue=text;
    }
    return false;
}
function preparePlaceholder() {
    if(!document.getElementById) return false;
    if(!document.getElementById("imagegallery")) return false;
    if(!document.createElement) return false;
    if(!document.createTextNode) return false;
    var placeholder=document.createElement("img");
    placeholder.setAttribute("id","placeholder");
    placeholder.setAttribute("src","images/photos/placeholder.jpg");
    placeholder.setAttribute("alt","zhanwei");
    var description=document.createElement("p");
    description.setAttribute("id","description");
    var desctext=document.createTextNode("选择一个图片");
    description.appendChild(desctext);
    var gallery=document.getElementById("imagegallery");
    insertAfter(description,gallery);
    insertAfter(placeholder,description);
}
function prepareGallery() {
    if(!document.getElementById) return false;
    if(!document.getElementsByTagName) return false;
    if(!document.getElementById("imagegallery")) return false;
    var gallery=document.getElementById("imagegallery");
    var links=gallery.getElementsByTagName("a");
    for(var i=0;i<links.length;i++)
    {
        links[i].onclick=function () {
            return showPic(this);
        }
    }
}
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);*/
function preparePlaceholder(){
    if( !document.getElementById) return false;
    if( !document.getElementsByTagName ) return false;
    if( !document.getElementById('imagegallery')) return false;
    var placeholder = document.createElement('img');
    placeholder.setAttribute('id','placeholder');
    placeholder.setAttribute('src','images/photos/placeholder.jpg');
    var description = document.createElement('p');
    description.setAttribute('id','description');
    var text = document.createTextNode('choose an image');
    description.appendChild(text);
    var imagegallery= document.getElementById('imagegallery');
    insertAfter(description,imagegallery);
    insertAfter(placeholder,description);
}

function prepareGallery(){
    if( !document.getElementById('imagegallery')) return false;
    var imagegallery = document.getElementById('imagegallery');
    var links = imagegallery.getElementsByTagName('a');
    for(var i=0;i<links.length;i++){
        links[i].onclick = function(){
            return showpic(this);
        }
    }
}

function showpic(whichpic){
    if( !document.getElementById('placeholder')) return true;
    var imageurl = whichpic.getAttribute('href');
    var placeholder = document.getElementById('placeholder');
    placeholder.setAttribute('src',imageurl);
    if( !document.getElementById('description')) return false;
    var title;
    if( !whichpic.getAttribute('title')){
        title = '';
    }else{
        title = whichpic.getAttribute('title');
    }
    var description = document.getElementById('description');
    if( description.firstChild.nodeType == 3){
        description.firstChild.nodeValue = title;
    }
    return false;
}
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);