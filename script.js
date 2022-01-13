function getAndUpdate(){
    tit = document.getElementById('title').value;
    des = document.getElementById('description').value;
    if(localStorage.getItem('itemsJson')==null){
        itemsJsonArray =[];
        itemsJsonArray.push([tit , des]);
        localStorage.setItem('itemsJson',JSON.stringify(itemsJsonArray));
    }
    else{
        itemsJsonArrayStr = localStorage.getItem('itemsJson');
        itemsJsonArray = JSON.parse(itemsJsonArrayStr);
        itemsJsonArray.push([tit , des]);
        localStorage.setItem('itemsJson',JSON.stringify(itemsJsonArray));
    }
    
    update();
    document.getElementById('title').value ='';
    document.getElementById('description').value ='';
}


function update(){

    if(localStorage.getItem('itemsJson')==null){
        itemsJsonArray =[];
        localStorage.setItem('itemsJson',JSON.stringify(itemsJsonArray));
    }
    else{
        itemsJsonArrayStr = localStorage.getItem('itemsJson');
        itemsJsonArray = JSON.parse(itemsJsonArrayStr);
       
    }

    // populate the table
    tableBody = document.getElementById('tableBody');
    let str ="";

    itemsJsonArray.forEach((element,index) => {
        str += `
        
        <tr>
        <th scope="row">${index +1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td> 
        <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td> 
        </tr>
        
        `
    });
    tableBody.innerHTML=str;
}


add = document.getElementById("add");
add.addEventListener("click",getAndUpdate);
update();

function deleted(itemIndex ){
itemsJsonArrayStr=localStorage.getItem('itemsJson');
itemsJsonArray= JSON.parse(itemsJsonArrayStr);
// deleting
itemsJsonArray.splice(itemIndex,1);
localStorage.setItem('itemsJson',JSON.stringify(itemsJsonArray));
update();
}


// clear function button
function clearStorage(){
    if(confirm("Do you want to clear the whole List ?")){
        localStorage.clear();
        update();

    }
}