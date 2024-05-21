import DomPvP from "./dom-manipulation-p-vs-p.js";

const choosePlayerVs = {
  playerVsPlayer: false,
  playerVsComputer: false,

  cacheDom() {
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

    this.player1NameElement = document.getElementById("player-1-name");
    this.player2NameElement = document.getElementById("player-2-name");

    this.getPlayer1Name = document.getElementById("get-player-1-name");
    this.getPlayer2Name = document.getElementById("get-player-2-name");
  },
  bindEvents() {
    this.playerVsComputerButton.addEventListener("click", this.hideContent.bind(this));
    this.playerVsPlayerButton.addEventListener("click", this.hideContent.bind(this));

    this.firstVersionMainContent.addEventListener("transitionend", this.viewContent.bind(this));
    this.firstVersionContainerContent.addEventListener(
      "transitionend",
      this.viewSecondVersionContainerContent.bind(this)
    );
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

    this.player1Name = this.getPlayer1Name.value;
    this.player2Name = this.getPlayer2Name.value;

    this.player1NameElement.textContent = `${this.player1Name}'s board`;
    this.player2NameElement.textContent = `${this.player2Name}'s board`;
    DomPvP.init();
    this.initialized = true;

    this.getPlayer1Name.value = "";
    this.getPlayer2Name.value = "";
  },
  getPlayerName(ev) {
    ev.preventDefault();
    this.firstVersionContainerContent.classList.add("hidden");
    this.secondVersionMainContent.classList.add("removed");

    this.playerName = this.getPlayerNameInput.value;
    this.displayPlayerName.textContent = `${this.playerName}'s board`;
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
