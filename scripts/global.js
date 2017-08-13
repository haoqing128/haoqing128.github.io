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
        newClassName+=' ';//这里一定要注意是空格！！！
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

/*live*/
function stripeTables() {
    if(!document.getElementsByTagName) return false;
    var tables=document.getElementsByTagName('table');
    for(var i=0;i<tables.length;i++) {
        var odd = false;
        var rows = tables[i].getElementsByTagName('tr');
        for (var j = 0; j < rows.length; j++) {
            if (odd == true) {
                addClass(rows[j], 'odd');
                odd = false;
            }
            else {
                odd = true;
            }
        }
    }
}

function highlightRows() {
    if(!document.getElementsByTagName) return false;
    var rows=document.getElementsByTagName('tr');
    for(var i=0;i<rows.length;i++) {
        rows[i].oldCN = rows[i].className;
        rows[i].onmouseover = function () {
            addClass(this, 'highlight');
        }
        rows[i].onmouseout = function () {
            this.className = this.oldCN;
        }

    }
}

addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
/*contact*/
//单击标签 相应表单字段可获得焦点
function focusLabels() {
    if(!document.getElementById) return false;
    var labels=document.getElementsByTagName("label");
    for(var i=0;i<labels.length;i++)
    {if(!labels[i].getAttribute("for"))continue;
    labels[i].onclick=function () {
        var id = this.getAttribute("for");
        if (!document.getElementById(id))return false;
        var element = document.getElementById(id);
        element.focus();
        }
    }
}
addLoadEvent(focusLabels);
//获得焦点时删除这个字段的value值 未输入离开时再重新应用占位值
function resetFields(whichform) {
    if(!Modernizr.input.placeholder) return;
    for(var i=0;i<whichform.elements.length;i++){
        var element=whichform.elements[i];
        if(element.type=="submit")continue;
        var check=element.placeholder||element.getAttribute('placeholder');//不同浏览器方式不同
        if(!check) continue;
        element.onfocus=function () {
            var text=this.placeholder||this.getAttribute('palceholder');
            if(this.value==text)
            {
                this.className='';
                this.value="";
            }
        }
        element.onblur=function () {
            if(this.value=="")
            {
                this.className='placeholder';
                this.value=this.placeholder||this.getAttribute('placeholder');
            }
        }
        element.onblur();
    }
}

/*function prepareForms() {
    for(var i=0;i<document.forms.length;i++)
    {
        var thisform=document.forms[i];
        resetFields(thisform);
    }
}

addLoadEvent(prepareForms);*/
//表单验证 不好使。。。没找到原因。。。

function isFilled(field) {
    if(field.value.replace(' ','').length==0)return false;
    var placeholder=field.placeholder||field.getAttribute('placeholder');
    return(field.value!=placeholder);
}

function isEmail(field) {
    return(field.value.indexOf("@")!=-1&&field.value.indexOf(".")!=-1);

}

function validateForm(whichform){
    for(var i=0;i<whichform.elements.length;i++){
        var element=whichform.elements[i];
        if(element.required=='required'){
            if(!isFilled(element)){
                alert("Please fill in the "+element.name+"field.");
                return false;
            }
        }
        if(element.type=='email'){
            if(!isEmail(element)){
                alert("The"+element.name+"field must be a valid email address.");
                return false;
            }
        }
    }
    return true;
}/*
function validateForm(whichform){
    for(var i=0;i<whichform.elements.length;i++){
        var elem = whichform.elements[i];
        var elem_required = elem.required || elem.getAttribute('required');
        if( elem_required == '' || elem_required == 'required'){
            var elem_name = elem.name || elem.getAttribute('name');
            if( !isFilled(elem) ){
                alert('please fill in '+elem_name +'  '+'field.');
                return false;
            }
            if( elem.getAttribute('id') == 'email'){ //或者elem.type == 'email'
                if( !isEmail(elem)){
                    alert('请输入正确的邮箱地址');
                    return false;
                }
            }
        }
    }
    return true;
}*/
function prepareForms() {
    for(var i=0;i<document.forms.length;i++){
        var thisform=document.forms[i];
        resetFields(thisform);
        thisform.onsubmit=function () {
            if(!validateForm(this))return false;
            var article=document.getElementsByTagName('article')[0];
            if(submitFormithAjax(this,article)) return false;
            return true;
        }
    }
}
addLoadEvent(prepareForms);

//提交表单ajax
function getHTTPObject() {
    if(typeof XMLHttpRequest=="undefined")
    XMLHttpRequest=function(){
        try{return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
        catch(e){}
        try{return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
        catch(e){}
        try{return new ActiveXObject("Msxml2.XMLHTTP");}
        catch(e){}
        return false;
    }
    return new XMLHttpRequest();
}

function displayAjaxLoading(element) {
    while (element.hasChildNodes()){
        element.removeChild(element.lastChild);
    }
    var content=document.createElement("img");
    content.setAttribute("src","images/loading.gif");
    content.setAttribute("alt","loading……");
    element.appendChild(content);
}

function submitFormithAjax(whichform,thetarget) {
    var request=getHTTPObject();
    if(!request){return false;}
    displayAjaxLoading(thetarget);
    var dataParts=[];
    var element;
    for(var i=0;i<whichform.elements.length;i++)
    {
        element=whichform.elements[i];
        dataParts[i]=element.name+'='+encodeURIComponent(element.value);
    }
    var data=dataParts.join('&');
    request.open('POST',whichform.getAttribute("action"),true);
    request.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    request.onreadystatechange=function ()
    {if(request.readyState==4)
        {
            if(request.status==200||request.status==0)
            {var matches=request.responseText.match(/<article>([\s\S]+)<\/article>/);
            if(matches.length>0){
                thetarget.innerHTML=matches[1];
            }
            else{
                thetarget.innerHTML='<p>Oop,there was an error.Sorry.</p>';
            }
            }
            else{
                thetarget.innerHTML='<p>'+request.statusText+'</p>';
            }
        }
    }
    request.send(data);
    return true;
}

