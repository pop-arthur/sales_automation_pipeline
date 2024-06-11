document.addEventListener("DOMContentLoaded", function() {
    const input = document.getElementById("search-input");
    input.value = "What are you wanting to find?";

    input.addEventListener("focus", function() {
        if (input.value === "What are you wanting to find?") {
            input.value = "";
        }
    });

    input.addEventListener("blur", function() {
        if (input.value === "") {
            input.value = "What are you wanting to find?";
        }
    });
});