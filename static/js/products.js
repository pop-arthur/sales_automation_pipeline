document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("search-bar");
    input.value = "Search";

    input.addEventListener("focus", function() {
        if (input.value === "Search") {
            input.value = "";
        }
    });

    input.addEventListener("blur", function() {
        if (input.value === "") {
            input.value = "Search";
        }
    });
});

function addItem (id){
    localStorage.setItem(id, 1);
}
