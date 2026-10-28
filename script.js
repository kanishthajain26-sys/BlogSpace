
document.addEventListener("DOMContentLoaded", function () {
  console.log("Blog Application is ready!");


  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      console.log("You clicked:", link.textContent);
    });
  });


  const blogCards = document.querySelectorAll(".blog-card");

  blogCards.forEach(function (card) {
    card.addEventListener("mouseenter", function () {
      card.style.transition = "0.3s";
    });
  });

 
  const footer = document.querySelector("footer");

  if (footer) {
    footer.innerHTML = `&copy; ${new Date().getFullYear()} BlogSpace. All rights reserved.`;
  }
});
