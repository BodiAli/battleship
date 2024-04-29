const choosePlayerVs = {
  playerVsPlayer: false,
  playerVsComputer: false,

  cacheDom() {
    this.playerVsPlayerButton = document.querySelector("button.pvs-btn.player");
    this.playerVsComputerButton = document.querySelector("button.pvs-btn.computer");
    this.firstVersionMainContent = document.querySelector("main.v-1");
    this.secondVersionMainContent = document.querySelector("main.v-2.p-vs-c");
  },
  bindEvents() {
    this.playerVsComputerButton.addEventListener("click", this.hideContent.bind(this));
    this.playerVsPlayerButton.addEventListener("click", this.hideContent.bind(this));
    this.firstVersionMainContent.addEventListener("transitionend", this.viewContent.bind(this));
  },
  init() {
    this.cacheDom();
    this.bindEvents();
  },
  hideContent() {
    this.playerVsPlayer = true;
    this.firstVersionMainContent.classList.add("hidden");
  },
  viewContent(ev) {
    if (ev.propertyName === "opacity") {
      this.firstVersionMainContent.classList.add("removed");
      this.secondVersionMainContent.classList.remove("removed");
    }
  },
};

choosePlayerVs.init();
