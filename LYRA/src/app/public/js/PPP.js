window.addEventListener("message", (event) => {
    const message = event.data;
    if (message.sidebarIsClosed) {
      const iframe = document.querySelector(".frame");
      iframe.style.width = "88px";
    } else {
      const iframe = document.querySelector(".frame");
      iframe.style.width = "250px";
    }
  });



const textarea = document.getElementById('agrandable');
textarea.addEventListener('input', function() {
  this.style.height = 'auto'; /* Reinicia la altura */
  this.style.height = this.scrollHeight + 'px'; /* Ajusta la altura */
});

textarea.addEventListener('input', function() {
  if (this.value === '') {
    this.style.height = '23px'; /* Establece la altura en 10px */
  } else {
    this.style.height = 'auto'; /* Reinicia la altura */
    this.style.height = this.scrollHeight + 'px'; /* Ajusta la altura */
  }
});






