const openButton = document.querySelector("#open-contact");
const closeButton = document.querySelector("#close-contact");
const contactPopover = document.querySelector("#contact-popover");
const contactForm = document.querySelector("#contact-form");

openButton.addEventListener("click", () => {
  contactPopover.showModal();
});

closeButton.addEventListener("click", () => {
  contactPopover.close();
});

contactPopover.addEventListener("click", (event) => {
  if (event.target === contactPopover) {
    contactPopover.close();
  }
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  alert("Thank you! Your message has been received.");
  contactForm.reset();
  contactPopover.close();
});
