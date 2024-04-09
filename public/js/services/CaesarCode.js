// CaesarCode.js

"use strict";

class CaesarCode {
	#deviation;

	constructor() {
		this.invulveld1 = document.getElementById("invulveld1");
		this.invulveld2 = document.getElementById("invulveld2");
		this.deviatieSlider = document.getElementById("deviatie-slider");
		this.deviatieLabel = document.getElementById("deviatie-label");
		this.bestand = document.getElementById("bestand");

		this.#createEventListeners();
		this.#setDeviation();
	}

	#createEventListeners() {
		this.invulveld1.addEventListener("input", this.#encode.bind(this));
		this.invulveld2.addEventListener("input", this.#decode.bind(this));
		this.deviatieSlider.addEventListener("input", this.#setDeviation.bind(this));
		this.bestand.addEventListener("change", this.#readFile.bind(this));
	}

	#encode() {
		this.invulveld2.value = this.#rotate(this.invulveld1.value, Number(this.#deviation));
	}

	#decode() {
		this.invulveld1.value = this.#rotate(this.invulveld2.value, Number(this.#deviation) * -1);
	}

	#rotate(input, deviation) {
		const ALPHABET_LENGTH = 26;
		let output = "";

		for (let i = 0; i < input.length; i++) {
			const charCode = input.charCodeAt(i);
			let modifier = 0;

			if (charCode >= 65 && charCode <= 90) {
				modifier = 65;
			} else if (charCode >= 97 && charCode <= 122) {
				modifier = 97;
			}

			output += modifier !== 0 ? String.fromCharCode(((((charCode - modifier + deviation) % ALPHABET_LENGTH) + ALPHABET_LENGTH) % ALPHABET_LENGTH) + modifier) : input[i];
		}

		return output;
	}

	#setDeviation() {
		this.#deviation = this.deviatieLabel.innerText = this.deviatieSlider.value;
	}

	#readFile(event) {
		const file = event.target.files[0];
		const fileReader = new FileReader();

		fileReader.readAsText(file);

		fileReader.onload = (event) => {
			this.invulveld1.value = event.target.result;
			this.#encode();
		};
	}
}

export default CaesarCode;
