function toggleAccordion(element) {
  var accordionItem = element.parentElement;
  accordionItem.classList.toggle("active");

  var accordionContent = accordionItem.querySelector(".accordion-content");
  if (accordionItem.classList.contains("active")) {
      accordionContent.style.display = "block";
  } else {
      accordionContent.style.display = "none";
  }
}