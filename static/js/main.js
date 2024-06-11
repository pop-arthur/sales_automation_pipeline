document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("search-input");
    input.value = "What would you like to find?";

    input.addEventListener("focus", function() {
        if (input.value === "What would you like to find?") {
            input.value = "";
        }
    });

    input.addEventListener("blur", function() {
        if (input.value === "") {
            input.value = "What would you like to find?";
        }
    });
});