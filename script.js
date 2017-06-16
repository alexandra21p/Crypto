/**
 * Created by Alexandra on 13/10/2016.
 */

var alphabet = "_ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var key = [];
var tableLtrs = '';
var alphabetTbl = document.getElementById("alphabetTbl");
alphabetTbl.addEventListener("click", getLetter);
var validKey;

function getLetter(e) {
    if(e.target.nodeName == "TH") {
        console.log(e.target.innerHTML);
        //return e.target.innerHTML;
        tableLtrs = e.target.innerHTML.toLowerCase();
        document.getElementById('plaintext').value += tableLtrs;
    }
}
function generateKey() {
    var keyy = document.getElementById('key').value.toUpperCase();
    var hasSymbols = /[^_A-Za-z]/.test(keyy); // checks if the string contains any invalid chars
    console.log(hasSymbols);
    var row = document.getElementById('keyRow');
    row.innerHTML = '';

    if (keyy.length == 0) {
        key = alphabet.split("");
        var n = key.length;

        for(var i = n - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = key[i];
            key[i] = key[j];
            key[j] = tmp;
        }
        document.getElementById('key').value = key.join("");
        fillTable(key);
        row.style.color = "indianred";
        //return key.join("");

        validKey = true;
    }
    else if (keyy.length == 27 && !hasDuplicates(keyy.split("")) && !hasSymbols) {
        key = keyy.split("");
        fillTable(key);
        row.style.color = "indianred";

        validKey = true;
    }
    else {
        validKey = false;
    }
}

function fillTable(arr) {
    var row = document.getElementById('keyRow');
    row.innerHTML = '';
    for (var i = 0; i < arr.length; i++) {
        var cell = row.insertCell(i);
        cell.innerHTML = arr[i];
    }
}

// checks if there are any duplicate values in an array
function hasDuplicates(array) {
    var valuesSoFar = [];
    for (var i = 0; i < array.length; ++i) {
        var value = array[i];
        if (valuesSoFar.indexOf(value) !== -1) {
            return true;
        }
        valuesSoFar.push(value);
    }
    return false;
}

function encrypt(plaintext) {
    if (!validKey) {
        alert("INVALID KEY VALUE! Press the button to generate a valid key.");
        key = [];
        document.getElementById('key').value = '';
        document.getElementById('plaintext').value = '';
        document.getElementById('ciphertext').value = '';
    }
    else {
        var coded, i, ch, index, upper;
        upper = plaintext.toUpperCase();
        coded = "";
        var myKey = key.join("");
        for (i = 0; i < upper.length; i++) {
            console.log(upper);
            ch = upper.charAt(i);
            index = alphabet.indexOf(ch);
            if (index == -1) { // space
                coded += '';
            }
            else {
                coded += myKey.charAt(index);
            }
        }
        document.getElementById('ciphertext').value = coded;
        return coded;
    }
}

function decrypt(ciphertext) {
    var decoded, i, ch, index;
    decoded = "";
    var myKey = key.join("");
    var cipher = ciphertext.toUpperCase();
    for (i = 0; i < cipher.length; i++) {
        ch = cipher.charAt(i);
        index = myKey.indexOf(ch);
        if (index == -1) {
            decoded += '';
        }
        else {
            decoded += alphabet.charAt(index);
        }
    }
    document.getElementById('plaintext').value = decoded.toLowerCase();
    return decoded;
}

function reset() {
    key = [];
    document.getElementById('key').value = '';
    document.getElementById('plaintext').value = '';
    document.getElementById('ciphertext').value = '';
    document.getElementById('keyRow').innerHTML = '';
    tableLtrs = '';
}