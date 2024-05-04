const choosePlayerVs = {
  playerVsPlayer: false,
  playerVsComputer: false,

  cacheDom() {
    this.firstVersionContainerContent = document.getElementById("v-1");
    this.secondVersionContainerContent = document.getElementById("v-2");
    this.playerVsPlayerButton = document.querySelector("button.pvs-btn.player");
    this.playerVsComputerButton = document.querySelector("button.pvs-btn.computer");
    this.firstVersionMainContent = document.querySelector("main.v-1");
    this.secondVersionMainContent = document.querySelector("main.v-2.p-vs-c");
    this.playerVsComputerStart = document.getElementById("p-vs-c-start");
    this.playerVsComputerForm = document.getElementById("p-vs-c-form");
    this.mainMenuButton = document.getElementById("main-menu");
  },
  bindEvents() {
    this.playerVsComputerButton.addEventListener("click", this.hideContent.bind(this));
    this.playerVsPlayerButton.addEventListener("click", this.hideContent.bind(this));
    this.firstVersionMainContent.addEventListener("transitionend", this.viewContent.bind(this));
    this.playerVsComputerStart.addEventListener("click", this.hideSecondVersionMainContent.bind(this));
    this.firstVersionContainerContent.addEventListener(
      "transitionend",
      this.viewSecondVersionContainerContent.bind(this)
    );
    // this.playerVsComputerForm.addEventListener("submit", this.getPlayerName);
    this.mainMenuButton.addEventListener("click", this.backToMainMenu.bind(this));
  },
  init() {
    this.cacheDom();
    this.bindEvents();
  },
  hideContent(ev) {
    if (ev.target.classList.contains("player")) {
      this.playerVsPlayer = true;
      this.playerVsComputer = false;
    } else if (ev.target.classList.contains("computer")) {
      this.playerVsComputer = true;
      this.playerVsPlayer = false;
      this.firstVersionMainContent.classList.add("hidden");
    }
  },
  viewContent(ev) {
    if (ev.propertyName === "opacity") {
      this.firstVersionMainContent.classList.add("removed");
      this.secondVersionMainContent.classList.remove("removed");
    }
  },
  hideSecondVersionMainContent() {
    this.firstVersionContainerContent.classList.add("hidden");
    this.secondVersionMainContent.classList.add("removed");
  },
  viewSecondVersionContainerContent(ev) {
    if (ev.target === this.firstVersionContainerContent && ev.propertyName === "opacity") {
      this.firstVersionContainerContent.classList.add("removed");
      this.secondVersionContainerContent.classList.remove("removed");
    }
  },
  getPlayerName(ev) {
    ev.preventDefault();
  },
  backToMainMenu() {
    this.secondVersionContainerContent.classList.add("removed");
    this.firstVersionContainerContent.classList.remove("removed");
    this.firstVersionContainerContent.classList.remove("hidden");
    this.firstVersionMainContent.classList.remove("removed");
    this.firstVersionMainContent.classList.remove("hidden");
  },
};

choosePlayerVs.init();
export default choosePlayerVs;
