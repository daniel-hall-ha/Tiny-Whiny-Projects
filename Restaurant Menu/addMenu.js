
function addItem() {
    
    console.log('Add function is called.');

    const parentNode = document.getElementsByTagName('ul')[0];

    const input = document.getElementById("item_input");

    const added_item = document.createElement('li');

    added_item.innerText = input.value;

    parentNode.appendChild(added_item);

    input.value = '';
}

export { addItem };