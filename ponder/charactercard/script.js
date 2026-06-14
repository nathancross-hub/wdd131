const character = {
  name: "Swamp Beast Diplomat",
  class: "Diplomat",
  level: 1,
  health: 100,
  image: "snortleblat.webp",

  attacked: function () {
    if (this.health > 0) {
      this.health -= 20;
    }

    if (this.health <= 0) {
      this.health = 0;
      document.querySelector("#message").textContent = `${this.name} has died.`;
    }

    displayCharacter();
  },

  levelUp: function () {
    this.level += 1;
    displayCharacter();
  }
};

function displayCharacter() {
  document.querySelector("#character-name").textContent = character.name;
  document.querySelector("#character-class").textContent = character.class;
  document.querySelector("#character-level").textContent = character.level;
  document.querySelector("#character-health").textContent = character.health;
  document.querySelector("#character-image").src = character.image;
  document.querySelector("#character-image").alt = character.name;
}

document.querySelector("#attack-button").addEventListener("click", function () {
  character.attacked();
});

document.querySelector("#level-button").addEventListener("click", function () {
  character.levelUp();
});

displayCharacter();