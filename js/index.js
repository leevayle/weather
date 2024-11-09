
function MoreHistory(){
    window.location.href = "./week.html";
}
document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("more-history");
    if (button) {
        button.onclick = MoreHistory;
    }
  });

  
function LessHistory(){
    window.location.href = "./index.html";
}
document.addEventListener("DOMContentLoaded", () => {
    const button2 = document.getElementById("back");
    if (button2) {
        button2.onclick = LessHistory;
    }
  });