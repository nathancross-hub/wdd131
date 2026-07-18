document.addEventListener("DOMContentLoaded", function () {
    const furniture = [
        {
            name: "Brown Leather Couch",
            category: "Couch",
            price: "$700",
            image: "../images/couch.png",
            description: "A nice couch that features 2 recliners and a hide-away bed. 10 feet by 10 feet."
        },
        {
            name: "Night Stand Set of 2",
            category: "Table",
            price: "$150",
            image: "../images/night_stands.jpg",
            description: "Forest Green bedside tables! Perfect to add some color to your bedroom."
        },
        {
            name: "Wooden Square End Table",
            category: "Table",
            price: "$45",
            image: "../images/square_table.jpg",
            description: "Beautiful square end table, in great condition!"
        },
        {
            name: "White Couch",
            category: "Couch",
            price: "$450",
            image: "../images/white_couch.jpg",
            description: "This lovely sofa is now home-ready!"
        },
        {
            name: "Wooden Circle End Table",
            category: "Table",
            price: "$45",
            image: "../images/circle_table.jpg",
            description: "Elegant table with golden handle (for decoration) in great condition!"
        }

        /*
        {
            name: "",
            category: "",
            price: "",
            image: "../images/",
            description: ""
        }
        */
    ];

    const inventoryGrid = document.querySelector("#inventory-grid");
    const filterButtons = document.querySelectorAll(".filter-button");

    if (!inventoryGrid) {
        console.error("Could not find #inventory-grid");
        return;
    }

    function displayFurniture(items) {
        inventoryGrid.innerHTML = "";

        items.forEach(function (item) {
            const card = document.createElement("article");
            card.classList.add("inventory-card");

            card.innerHTML = `
                <div class="item-image-container">
                    <img
                        src="${item.image}"
                        alt="${item.name}"
                        width="600"
                        height="400"
                        loading="lazy"
                    >
                    <span class="item-status">Available</span>
                </div>

                <div class="item-info">
                    <p class="item-category">${item.category}</p>

                    <h3>${item.name}</h3>

                    <p class="item-description">
                        ${item.description}
                    </p>

                    <div class="item-bottom">
                        <p class="item-price">${item.price}</p>
                    </div>
                </div>
            `;

            inventoryGrid.appendChild(card);
        });
    }

    function filterFurniture(category) {
        if (category === "All") {
            return furniture;
        }

        return furniture.filter(function (item) {
            return item.category === category;
        });
    }

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            filterButtons.forEach(function (otherButton) {
                otherButton.classList.remove("active-filter");
            });

            button.classList.add("active-filter");

            const selectedCategory = button.dataset.category;
            const filteredFurniture = filterFurniture(selectedCategory);

            displayFurniture(filteredFurniture);
        });
    });

    displayFurniture(furniture);
});