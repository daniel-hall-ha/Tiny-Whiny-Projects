/* Declare disabled background for modals */

const disabledBackground = document.createElement("div");
disabledBackground.style.width = "100%";
disabledBackground.style.height = "100%";
disabledBackground.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
disabledBackground.style.position = "fixed";
disabledBackground.style.top = "0";
disabledBackground.style.left = "0";
disabledBackground.style.zIndex = "999";

/* Set array in memory to store list nodes. */

const menuDetailsNodeList = [];
if (document.getElementsByClassName('menu-list').length == 0) {
    for (let i = 0; i < 3; i++) {
        const node = document.createElement('ul');
        node.className = 'menu-list';
        menuDetailsNodeList.push(node);
    }
}

function setDetailsPage (id_suffix, details) {
    
    console.log('This module is called.')
    
    /* Change Title and Switch List View */

    const title = document.getElementsByTagName('h1')[0];
    if (id_suffix == 'bf') {
        title.innerText = "Breakfast";
    } else if (id_suffix == 'mc') {
        title.innerText = "Main Course";
    } else if (id_suffix == 'ds') {
        title.innerText = "Dessert";
    }

    /* Display Action Buttons */

    if (document.getElementById('actions_div') == null) {

        const detailList = document.getElementById('detailsList');

        const actions_div = document.createElement('div');
        actions_div.id = 'actions_div';

        const input = document.createElement('input');
        input.id = 'item_input';
        if (id_suffix == 'bf') {
            input.placeholder = 'Enter a Breakfast...';
        } else if (id_suffix == 'mc') {
            input.placeholder = 'Enter a Main Course...';
        } else if (id_suffix == 'ds') {
            input.placeholder = 'Enter a Dessert...';
        }
        
        const add_button = document.createElement('button');
        add_button.id = 'add_'+ id_suffix;
        add_button.className = 'action_btn';
        add_button.innerText = 'Add Item';

        add_button.addEventListener('click', async () => {
            const add_action = await import("./addMenu.js");
            const item_input = document.getElementById('item_input');
            if (item_input.value.trim() != '') {
                add_action.addItem();
            }
        })

        const search_button = document.createElement('button');
        search_button.className = 'action_btn';
        search_button.innerText = 'Search Item';
        
        search_button.addEventListener('click', async() => {
            const search_action = await import("./searchMenu.js");
            if (item_input.value.trim() != '') {
                document.body.style.overflow = "hidden";
                document.body.appendChild(disabledBackground);
                search_action.searchItem();
            }
        });

        actions_div.appendChild(input);
        actions_div.appendChild(add_button);
        actions_div.appendChild(search_button);

        details.insertBefore(actions_div, detailList);

    } else {
        const add_button = document.querySelector('[id*="add"]');
        add_button.id = 'add_'+ id_suffix;

        const add_input = document.getElementById('item_input');
        if (id_suffix == 'bf') {
            add_input.placeholder = 'Enter a Breakfast...';
        } else if (id_suffix == 'mc') {
            add_input.placeholder = 'Enter a Main Course...';
        } else if (id_suffix == 'ds') {
            add_input.placeholder = 'Enter a Dessert...';
        }
    }

    /* Display Detail List */

    const detailsList = document.getElementById('detailsList');

    while (detailsList.firstChild) {
        detailsList.removeChild(detailsList.firstChild);
    }
    if (id_suffix == 'bf') {
        detailsList.appendChild(menuDetailsNodeList[0]);
    } else if (id_suffix == 'mc') {
        detailsList.appendChild(menuDetailsNodeList[1]);
    } else if (id_suffix == 'ds') {
        detailsList.appendChild(menuDetailsNodeList[2]);
    }

}

export { setDetailsPage };