
customElements.define("mi-footer", class extends HTMLElement {
  connectedCallback() {
    this.innerText = "Brian Felipe Beltran Kameyama IC51";
  }
}, { extends: "footer" });
