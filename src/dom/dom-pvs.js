const choosePlayerVs = {
  playerVsPlayer: false,
  playerVsComputer: false,

  cacheDom() {
    this.mainMenuButton = document.getElementById("main-menu");

    this.firstVersionContainerContent = document.getElementById("v-1");
    this.secondVersionContainerContent = document.getElementById("v-2");

    this.playerVsPlayerButton = document.querySelector("button.pvs-btn.player");
    this.playerVsComputerButton = document.querySelector("button.pvs-btn.computer");

    this.firstVersionMainContent = document.querySelector("main.v-1");
    this.secondVersionMainContent = document.querySelector("main.v-2.player-form");

    this.playerVsComputerStart = document.getElementById("p-vs-c-start");
    this.playerVsComputerForm = document.getElementById("p-vs-c-form");

    this.playerVsComputerBoards = document.getElementById("p-vs-c-boards");
    this.playerVsPlayerBoards = document.getElementById("p-vs-p-boards");

    this.playerVsPlayerForm = document.getElementById("p-vs-player-form");

    this.displayPlayerName = document.getElementById("player-name");
    this.getPlayerNameInput = document.getElementById("p-vs-c-name");
  },
  bindEvents() {
    this.playerVsComputerButton.addEventListener("click", this.hideContent.bind(this));
    this.playerVsPlayerButton.addEventListener("click", this.hideContent.bind(this));
    this.firstVersionMainContent.addEventListener("transitionend", this.viewContent.bind(this));
    this.firstVersionContainerContent.addEventListener(
      "transitionend",
      this.viewSecondVersionContainerContent.bind(this)
    );
    this.mainMenuButton.addEventListener("click", this.backToMainMenu.bind(this));
    this.playerVsComputerForm.addEventListener("submit", this.getPlayerName.bind(this));

    this.playerVsPlayerForm.addEventListener("submit", this.getPlayersName.bind(this));
  },
  init() {
    this.cacheDom();
    this.bindEvents();
  },
  hideContent(ev) {
    if (ev.target.classList.contains("player")) {
      this.playerVsPlayer = true;
      this.playerVsComputer = false;
      this.firstVersionMainContent.classList.add("hidden");
      this.playerVsPlayerForm.classList.remove("removed");
    } else if (ev.target.classList.contains("computer")) {
      this.playerVsComputer = true;
      this.playerVsPlayer = false;
      this.firstVersionMainContent.classList.add("hidden");
      this.playerVsComputerForm.classList.remove("removed");
    }
  },
  viewContent(ev) {
    if (ev.propertyName === "opacity") {
      this.firstVersionMainContent.classList.add("removed");
      this.firstVersionMainContent.classList.remove("hidden");
      this.secondVersionMainContent.classList.remove("removed");
    }
  },
  viewSecondVersionContainerContent(ev) {
    if (
      ev.target === this.firstVersionContainerContent &&
      ev.propertyName === "opacity" &&
      this.playerVsComputer
    ) {
      this.firstVersionContainerContent.classList.add("removed");
      this.firstVersionContainerContent.classList.remove("hidden");
      this.secondVersionContainerContent.classList.remove("hidden");
      this.secondVersionContainerContent.classList.remove("removed");
      this.playerVsComputerBoards.classList.remove("removed");
    } else if (
      ev.target === this.firstVersionContainerContent &&
      ev.propertyName === "opacity" &&
      this.playerVsPlayer
    ) {
      this.firstVersionContainerContent.classList.add("removed");
      this.firstVersionContainerContent.classList.remove("hidden");
      this.secondVersionContainerContent.classList.remove("hidden");
      this.secondVersionContainerContent.classList.remove("removed");
      this.playerVsPlayerBoards.classList.remove("removed");
    }
  },
  getPlayersName(ev) {
    ev.preventDefault();
    this.firstVersionContainerContent.classList.add("hidden");
    this.secondVersionMainContent.classList.add("removed");
  },
  getPlayerName(ev) {
    ev.preventDefault();
    this.firstVersionContainerContent.classList.add("hidden");
    this.secondVersionMainContent.classList.add("removed");

    this.playerName = this.getPlayerNameInput.value;
    this.displayPlayerName.textContent = this.playerName;
    this.getPlayerNameInput.value = "";
  },
  backToMainMenu() {
    this.firstVersionContainerContent.classList.remove("removed");
    this.firstVersionMainContent.classList.remove("removed");
    this.secondVersionContainerContent.classList.add("removed");
    this.playerVsComputerForm.classList.add("removed");
    this.playerVsPlayerForm.classList.add("removed");
    this.playerVsComputerBoards.classList.add("removed");

    this.playerVsPlayerBoards.classList.add("removed");
  },
};

choosePlayerVs.init();
export default choosePlayerVs;
