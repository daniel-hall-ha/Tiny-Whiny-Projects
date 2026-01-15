const mainContainer = document.getElementById('container');
const menuIcon = document.getElementById('menu');
const details = document.getElementById('details');

/* Create Menu Structure */

const menuNode = document.createElement('div');
menuNode.id = 'main_menu';

const menuList = document.createElement('ul');

const menuItemList = ['Breakfast', 'Main Course', 'Dessert'];

const menuDetailsNodeList = [];

const detailsListContainer = document.createElement('div');
detailsListContainer.id = 'detailsList';

/* Populate Menu Items */

menuItemList.forEach(item => {
    const defaultList = document.getElementById('default');
    const menuItem = document.createElement('li');
    menuItem.textContent = item;
    menuItem.addEventListener('click', async () => {
        menuNode.remove();
        console.log("Menu not showing.");
        defaultList.style.display = 'none';

        if (!document.getElementById('detailsList')) {
            details.appendChild(detailsListContainer);
        }

        const detailsPanel = await import("./detailsController.js")
        if (item == 'Breakfast') {
            detailsPanel.setDetailsPage('bf', details);
            console.log('id set to bf')
        }
        else if (item == 'Main Course') {
            detailsPanel.setDetailsPage('mc', details);
            console.log('id set to mc')
        }
        else if (item == 'Dessert') {
            detailsPanel.setDetailsPage('ds', details);
            console.log('id set to ds');
        }
    })
    menuList.appendChild(menuItem);
})

menuNode.appendChild(menuList);

/* Menu Toggle Functionality */

menuIcon.addEventListener('click', () => {
    if (document.getElementById('main_menu') == null) {
        mainContainer.insertBefore(menuNode, details);
        console.log("Menu showing");

    } else {
        mainContainer.removeChild(menuNode);
        console.log("Menu not showing");
    }
});

