const container = document.getElementById("container");

function searchItem() {
    
    console.log("Search Funcion is called.");

    if (!document.querySelector("script[src*='popUpController.js']")){
        const script_tag = document.createElement("script");
        script_tag.src = "./popUpController.js";
        document.body.appendChild(script_tag);
    }

    // Create Modal if it doesn't exist

    if (!document.getElementById("search-results-modal")) {
        const popup = document.createElement("div");
        popup.id = "search-results-modal";
        popup.innerHTML = `
            <div class="modal-header">
                <h2>Search Results</h2>
                <i class="fa-solid fa-xmark" id="close-cross" onclick="close_modal()"></i>
            </div>
            <div class="modal-content">
                <div id="search-results"></div>
            </div>
            <div class="modal-footer">
                <button id="close-button" class="action_btn" onclick="close_modal()">Close</button>
            </div>
        `;
        container.insertAdjacentElement('afterend', popup);
    }

    // Populate Search Results

    const searchResults = document.getElementById("search-results");

    const searchQuery = document.getElementById("item_input").value.trim().toLowerCase();
    console.log("Search Query: ", searchQuery);

    const allItems = document.querySelectorAll(".menu-list li");
    console.log("All Items: ", allItems);

    const results = Array.from(allItems).filter(item=>{
        return item.innerText.toLowerCase().includes(searchQuery);
    })
    console.log("Search Results: ", results);

    // Create results list

    const item_list = document.createElement("div");
    item_list.id = "results-list";

    for (let result of results) {
        const div = document.createElement("div");
        div.className = "result-item";
        div.innerText = result.innerText;
        item_list.appendChild(div);
    }

    // Push results to modal

    searchResults.innerHTML = "";
    if (results.length > 0) {
        searchResults.appendChild(item_list);
    } else {
        searchResults.innerText = "No items found.";
    }

}

export { searchItem };