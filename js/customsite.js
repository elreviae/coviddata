// Affichage version
$(".dashboardTitle").append("<span class=" + "w3-small" + "> v2.0.0</span>");

// Get the Sidebar
var Sidebar = document.getElementById("dashSidebar");
// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");
// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
    if (Sidebar.style.display === 'block') {
        Sidebar.style.display = 'none';
        overlayBg.style.display = "none";
    } else {
        Sidebar.style.display = 'block';
        overlayBg.style.display = "block";
    }
}
// Close the sidebar with the close button
function w3_close() {
    Sidebar.style.display = "none";
    overlayBg.style.display = "none";
}

// Affichage date footer
var fullDate = (new Date).getFullYear();
$(".copyrightDate").html("&copy; " + fullDate);