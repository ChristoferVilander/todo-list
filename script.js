(function () {

    var inputField = document.getElementById('input_field'),
        addButton = document.getElementById('add_button'),
        todoList = document.getElementById('todo_list'),

        listBucket = [],
        counter = 0;

    inputField.select();

    // Creates a <li> element with a unique id. 
    // Each item is stored to the array 'listBucket'. 
    // Validation, so you can't add items when the field is empty. 

    function addItem() {

        var itemText = inputField.value;
        var li = document.createElement('li');

        if (!itemText || itemText === "" || itemText == " ") {
            return false;
        }

        li.appendChild(document.createTextNode(itemText));
        todoList.appendChild(li);
        li.setAttribute('id', 'list' + counter);
        listBucket.push(inputField.value);
        counter++;

        console.log(listBucket);
        li.onclick = itemDone;
        inputField.select();

        storage();
    }

    // Adds item to the list when you hit enter.

    document.body.onkeydown = function (enter) {
        enter = enter || window.event;
        var keycode = enter.keyCode || enter.charCode;
        if (keycode === 13) {

            addItem();
        }
    };

    // Removes the item from the list.
    // Removes the item from the array 'listBucket'. 
    // Executes the storage function. 

    function itemDone() {
        var me = this.id.replace('list', '');
        var li = document.getElementById('list' + me);
        li.remove();
        listBucket.splice(me, 1);
        storage();
    }

    // Stores the array 'listBucket' in localStorage.

    function storage() {
        localStorage.setItem('savedItems', JSON.stringify(listBucket));
    }

    // Creates a list of what's stored in localStorage. 

    function printStorage() {
        var getData = localStorage.getItem('savedItems');
        var items2 = JSON.parse(getData);

        for (var i = 0; i < items2.length; i++) {
            var li = document.createElement('li');
            listBucket.push(items2[i]);

            li.appendChild(document.createTextNode(items2[i]));
            todoList.appendChild(li);
            li.setAttribute('id', 'list' + i);

            li.onclick = itemDone;
            console.log(listBucket);
        }
    }

    addButton.onclick = addItem;
    window.onload = printStorage;

})();
