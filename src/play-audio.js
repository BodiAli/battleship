import cannonFireePath from "./sound-effects/cannon-fire.mp3";
import shipHitPath from "./sound-effects/explosion(ship-hit).mp3";
import missedHitPath from "./sound-effects/splash-sound(missed-hit).mp3";

class SoundEffect {
  static playCannonFire() {
    const cannonFire = new Audio(cannonFireePath);

    cannonFire.play();
  }

  static playShipHit() {
    const shipHit = new Audio(shipHitPath);

    shipHit.play();
  }

  static playShipMiss() {
    const missedHit = new Audio(missedHitPath);

    missedHit.play();
  }

  static playIfHit() {
    this.playCannonFire();
    setTimeout(() => {
      this.playShipHit();
    }, 1000);
  }

  static playIfMiss() {
    this.playCannonFire();
    setTimeout(() => {
      this.playShipMiss();
    }, 500);
  }
}

export default SoundEffect;
