document.addEventListener("DOMContentLoaded", function () {
    const furniture = [
        {
            name: "Brown Leather Couch",
            category: "Couch",
            price: "$700",
            image: "../images/couch.png",
            description:
                "A nice couch that features 2 recliners and a " +
                "hide-away bed. 10 feet by 10 feet.",
            status: "Sold"
        },
        {
            name: "Night Stand Set of 2",
            category: "Table",
            price: "$150",
            image: "../images/night_stands.jpg",
            description:
                "Forest Green bedside tables! Perfect to add " +
                "some color to your bedroom.",
            status: "Sold"
        },
        {
            name: "Wooden Square End Table",
            category: "Table",
            price: "$45",
            image: "../images/square_table.jpg",
            description:
                "Beautiful square end table, in great condition!",
            status: "Available"
        },
        {
            name: "White Couch",
            category: "Couch",
            price: "$450",
            image: "../images/white_couch.jpg",
            description:
                "This lovely sofa is now home-ready!",
            status: "Sold"
        },
        {
            name: "Wooden Circle End Table",
            category: "Table",
            price: "$45",
            image: "../images/circle_table.jpg",
            description:
                "Elegant table with golden handle for decoration, " +
                "in great condition!",
            status: "Available"
        },
        {
            name: "Two-Tone Nightstands (Set of 2)",
            category: "Table",
            price: "$80",
            image: "../images/blue_night_stands.jpg",
            description:
                "Nice and sturdy nightstands ready for " +
                "your home!",
            status: "Available"
        },
        {
            name: "Kitchen Table Set",
            category: "Table",
            price: "$180",
            image: "../images/kitchen_table_set.jpg",
            description:
                "Comes with the matching table and 4 chairs that " +
                "are lightweight but sturdy. Perfect to move with ease.",
            status: "Available"
        },
        {
            name: "Wooden Office Desk",
            category: "Table",
            price: "$90",
            image: "../images/wooden_desk.jpg",
            description:
                "Bottom Drawer has files that are removeable if not needed." +
                " Great for your home office!",
            status: "Available"
        },
        {
            name: "Black TV Stand/Mount",
            category: "Misc",
            price: "$30",
            image: "../images/tv_mount.jpg",
            description:
                "Need something to hold up your TV without putting screw holes in the wall? " +
                "Very affordable price with a nice modern look.",
            status: "Available"
        },
        {
            name: "Convertible Couch/Sofa Bed",
            category: "Couch",
            price: "$180",
            image: "../images/sofa_bed_couch.jpg",
            description:
                "Perfect for a nice living room couch and a place to let your friend sleep " +
                "while visiting! Modern and clean.",
            status: "Available"
        },
        {
            name: "Corner Shelf",
            category: "Misc",
            price: "$15",
            image: "../images/corner_shelf.jpg",
            description:
                "Great for holding nice corner decorations or even books. Would also look great " +
                "outside too!",
            status: "Available"
        }

        /*,
        {
            name: "",
            category: "",
            price: "$",
            image: "/wdd131/home/images/",
            description:
                "" +
                "",
            status: "Available"
        } */
    ];

    const inventoryGrid =
        document.querySelector("#inventory-grid");
    const filterButtons =
        document.querySelectorAll(".filter-button");
    const soldItemsButton =
        document.querySelector("#sold-items-button");

    let selectedCategory = "All";
    let showSoldItems = false;

    if (!inventoryGrid) {
        console.error("Could not find #inventory-grid");
        return;
    }

    function displayFurniture() {
        inventoryGrid.innerHTML = "";

        const filteredFurniture = furniture.filter(function (item) {
            const matchesCategory =
                selectedCategory === "All" ||
                item.category === selectedCategory;

            const matchesStatus =
                item.status === "Available" ||
                showSoldItems;

            return matchesCategory && matchesStatus;
        });

        filteredFurniture.forEach(function (item) {
            const card = document.createElement("article");
            card.classList.add("inventory-card");

            const statusClass =
                item.status === "Sold"
                    ? "sold-status"
                    : "available-status";

            card.innerHTML = `
                <div class="item-image-container">
                    <img src="${item.image}" alt="${item.name}">

                    <span class="item-status ${statusClass}">
                        ${item.status}
                    </span>
                </div>

                <div class="item-info">
                    <p class="item-category">
                        ${item.category}
                    </p>

                    <h3>${item.name}</h3>

                    <p class="item-description">
                        ${item.description}
                    </p>

                    <div class="item-bottom">
                        <p class="item-price">
                            ${item.price}
                        </p>
                    </div>
                </div>
            `;

            inventoryGrid.appendChild(card);
        });
    }

    filterButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            filterButtons.forEach(function (otherButton) {
                otherButton.classList.remove("active-filter");
            });

            button.classList.add("active-filter");
            selectedCategory = button.dataset.category;

            displayFurniture();
        });
    });

    soldItemsButton.addEventListener("click", function () {
        showSoldItems = !showSoldItems;

        if (showSoldItems) {
            soldItemsButton.textContent =
                "Hide Previously Sold Items";
        } else {
            soldItemsButton.textContent =
                "Show Previously Sold Items";
        }

        displayFurniture();
    });

    displayFurniture();
});