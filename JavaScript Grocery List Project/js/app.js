//Event handler for localstorage content    
    document.addEventListener("DOMContentLoaded", initList);
function initList(){

    
    let listHolder = [];    
    
     let oldList = localStorage.getItem('listHolder');
        //console.log(oldList);
     if(oldList){
            listHolder = JSON.parse(oldList);
            addItem(listHolder);
     }
    
    //Function for save to local
    function saveToLocal(data){
        localStorage.setItem('listHolder', JSON.stringify(data));
    }

    
    
    //add element to list with input value
    document.querySelector('.addBtn').addEventListener('click', function(){
        let getEle = document.querySelector('#myInput');
        itemFinder(getEle.value);
    })

    //check value and in old list value have or not after that it will add
    function itemFinder(currValue){
        if(currValue.trim().length > 0){
            checkValue(currValue).length > 0 ?  alert(` " ${currValue} " Already avalable in the list`) : addlist() ;
        }else{
            alert('Please add value');
            return false;
        }
        function addlist(){
            let item = {itemContent: currValue, itemStatus: false};
            addItem([item]);
            document.querySelector('#myInput').value = '';
            listHolder.push(item);
            saveToLocal(listHolder);
            return true;
        }
        function checkValue(value){
            return listHolder.filter(ele =>  ele.itemContent == value );
        }
    }
    
    //Create element for list
    function createInner(ele, att, value){
        let editEle = document.createElement(ele);
        editEle.setAttribute(att, value);
        return editEle;
    }

    //Create item for list
    function createItem(value){
        let li = document.createElement('li');
        let transEle = createInner('span', 'class', 'fa fa-trash-o delete');
        transEle.setAttribute('class', 'fa fa-trash-o delete');
        let editEle = createInner('span', 'class', 'fa fa-pencil edit');
        let div = createInner('div', 'class', 'content');
        div.textContent = value;
        li.appendChild(div);
        li.appendChild(transEle);
        li.appendChild(editEle);
        li.addEventListener('click', addDeleteEvt, false);
        return li;
    }
    
    //Add item to list
    function addItem(item){
        let listWrap = document.querySelector('#myUL');
        item.forEach(element => {
            listWrap.appendChild(createItem(element.itemContent));
        });
        
    }
    function addDeleteEvt(e){
        if(e.target.classList.contains('delete')){
            //Here delete element
            listHolder = listHolder.filter(item =>  item.itemContent !== e.currentTarget.childNodes[0].childNodes[0].nodeValue );
            e.currentTarget.remove();
            saveToLocal(listHolder);
        }else if(e.target.classList.contains('edit')){
            
            //Here edit element
            let parent = e.currentTarget;
            parent.childNodes[0].setAttribute('contenteditable', 'true');
            parent.childNodes[0].classList.add('border');
            parent.childNodes[0].focus();
            //Array.from(parent.children).splice(1,3);
            e.target.remove();
            let updateInner = createInner('span', 'class', 'fa fa-check update');
            updateInner.addEventListener('click', editableItem);
            parent.appendChild(updateInner);
            
            listHolder = listHolder.filter(item =>  item.itemContent == e.currentTarget.childNodes[0].childNodes[0].nodeValue );
            saveToLocal(listHolder);
        }
        
    }
    
    //Edittable item halder function 
    function editableItem(e){
        itemFinder(document.querySelector('.border.content').childNodes[0].nodeValue);
        let parent = e.currentTarget.parentElement.remove();   
    }
    
    document.querySelector('.clearBtn').addEventListener('click', function(){
        listHolder.length > 0 ? clearList() : alert("We dont have list Items");
        function clearList(){
            document.querySelector('#myInput').value = '';
            listHolder.splice(0, listHolder.length);
            let listWrap = document.querySelector('#myUL');
            var child = listWrap.lastElementChild;  
            while (child) { 
                listWrap.removeChild(child); 
                child = listWrap.lastElementChild; 
            } 
            localStorage.removeItem("listHolder");
        }
        
    });

}
