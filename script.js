function getAndUpdate() {
    tit = document.getElementById('title').value;
    des = document.getElementById('description').value;

    if (localStorage.getItem('itemsJson') == null) {
        itemsJsonArray = [];
        itemsJsonArray.push([tit, des]);
        localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));
        // we convert itemJsonArray into string to store it into local storage
    }
    else {
        // we store evrything as a string in local storage
        itemsJsonArrayStr = localStorage.getItem('itemsJson');
        // we convert string to itemJsonArray(normal form can also be an integer) 
        // we dont need ' '  in parsse as we convert to its normal form
        itemsJsonArray = JSON.parse(itemsJsonArrayStr);
        itemsJsonArray.push([tit, des]);
        localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));
    }

    update();
    // we make empty after add button is pressed
    document.getElementById('title').value = '';
    document.getElementById('description').value = '';
}


function update() {
    
    if (localStorage.getItem('itemsJson') == null) {
        itemsJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));
    }
    else {
        itemsJsonArrayStr = localStorage.getItem('itemsJson');
        itemsJsonArray = JSON.parse(itemsJsonArrayStr);

    }

    // adding to the table
    tableBody = document.getElementById('tableBody');
    let str = "";

    itemsJsonArray.forEach((element, index) => {
        str += `
        
        <tr>
        <th scope="row">${index + 1}</th>
        <td>${element[0]}</td>
        <td>${element[1]}</td> 
        <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td> 
        </tr>
        
        `
    });
    tableBody.innerHTML = str;
}


add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
update();


function deleted(itemIndex) {
    itemsJsonArrayStr = localStorage.getItem('itemsJson');
    itemsJsonArray = JSON.parse(itemsJsonArrayStr);
    // deleting
    itemsJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemsJsonArray));
    update();
}


// clear function button
function clearStorage() {
    if (confirm("Do You Want To Clear The Whole List ?")) {
        localStorage.clear();
        update();

    }
}