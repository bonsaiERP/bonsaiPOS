/**
 * @author Kevin O'Toole
 */

var AllegedRC4 = function () {

	this.encrypt = function(mesage1,key1) {
		var input = mesage1;
		var key = key1;
		try {
			return (strToHex(cipher(input, key))).toUpperCase();
		}
		catch(ex) {
			console.log("ERROR: " + ex);
		}
	}

	function decrypt(mesage1,key1) {
		var input = mesage1.toLowerCase();
		var key = key1;
		try {
			return (cipher(hexToStr(input), key));
		}
		catch(ex) {
			console.log("ERROR: " + ex);
		}
	}




	function cipher(input, key) {
		var state = initState(key);
		var x = 0;
		var y = 0;
		var temp = 0;
		var output = "";
		for (i = 0; i < input.length; i = i + 1)
		{
			x = (x + 1) % 256;
			y = (state[x] + y) % 256;
			temp = state[x];
			state[x] = state[y];
			state[y] = temp;
			output = output + String.fromCharCode(input.charCodeAt(i) ^ state[(state[x] + state[y]) % 256]);
		}
		return output;
	}

	function initState(key) {
		var state = new Array(255);
		if (key.length > 0) {
			var j = 0;
			var temp = 0;
			for (i = 0; i <= 255; i = i + 1) {
				state[i] = i;
			}
			for (i = 0; i <= 255; i = i + 1) {
				j = (j + state[i] + key.charAt(i % key.length).charCodeAt(0)) % 256;
				temp = state[i];
				state[i] = state[j];
				state[j] = temp;
			}
		} else {
			throw("Blank Key")
		}
		return state;
	}

	function strToHex(str) {
		var hex = "";
		for (i = 0; i < str.length; i = i + 1) {
			hex = hex + decToHex(str.charCodeAt(i));
		}
		return hex;
	}

	function hexToStr(hex) {
		var str = "";
		if (isValidHex(hex)) {
			for (i = 0; i < hex.length; i = i + 2) {
				str = str + String.fromCharCode(hexToDec(hex.substr(i, 2)));
			}
		}
		else {
			throw("Invalid Hex");
		}
		return str;
	}

	function decToHex(dec) {
		var hex = dec.toString(16);
		if (hex.length < 2) {
			hex = "0" + hex;
		}
		else if (hex.length > 2) {
			throw("Unsupported Input")
		}
		return hex;
	}

	function hexToDec(hex) {
		return parseInt(hex, 16);
	}

	function isValidHex(hex) {
		re = new RegExp(/^([a-fA-F0-9]{2})+$/);
		if (hex.match(re)) {
			isValid = true;
		}
		else {
			isValid = false;
		}
		return isValid;
	}

}
