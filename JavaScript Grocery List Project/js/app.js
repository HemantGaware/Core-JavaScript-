
(function(){

    let listHolder = [];    
    
    function saveToLocal(data){
        localStorage.setItem('listHolder', JSON.stringify(data));
    }

    document.addEventListener("DOMContentLoaded", function(event) { 
        let oldList = localStorage.getItem('listHolder');
        console.log(oldList);
        if(oldList){
            listHolder = JSON.parse(oldList);
            addItem(listHolder);
        }
    });
    
    document.querySelector('.addBtn').addEventListener('click', function(){
        let getEle = document.querySelector('#myInput');
        if(getEle.value.trim().length > 0){
            checkValue(getEle.value).length > 0 ?  alert(` " ${getEle.value} " Already avalable in the list`) : addlist() ;
        }else{
            alert('Please add value');
        }
        function addlist(){
            let item = {itemContent: getEle.value, itemStatus: false};
            addItem([item]);
            getEle.value = '';
            listHolder.push(item);
            saveToLocal(listHolder);
        }
        function checkValue(value){
            return listHolder.filter(ele =>  ele.itemContent == value );
        }
    })

    
    function addItem(item){
        let listWrap = document.querySelector('#myUL');
        item.forEach(element => {
            listWrap.appendChild(createItem(element.itemContent));
        });
        
    }

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

    function createInner(ele, att, value){
        let editEle = document.createElement(ele);
        editEle.setAttribute(att, value);
        return editEle;
    }

    function addDeleteEvt(e){
        if(e.target.classList.contains('delete')){
            listHolder = listHolder.filter(item =>  item.itemContent !== e.currentTarget.childNodes[0].childNodes[0].nodeValue );
            e.currentTarget.remove();
            saveToLocal(listHolder);
        }else if(e.target.classList.contains('edit')){
            console.log('item editable');
            /*
            Working on editing list item
            let parent = e.currentTarget;
            parent.childNodes[0].setAttribute('contenteditable', 'true');
            parent.childNodes[0].classList.add('border');
            
            //Array.from(parent.children).splice(1,3);
            e.target.remove();
            let updateInner = createInner('span', 'class', 'fa fa-check update');
            updateInner.addEventListener('click', editableItem);
            parent.appendChild(updateInner);
            */
        }
        
    }

    /*
    Working on editing list item
    function editableItem(){
        let getVal = document.querySelector('.border.content').value;
    }
    */
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

})()