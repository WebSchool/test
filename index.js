text = 'привет как дела?';
key = 'asgddshasdgashw4523hesdxtjt7isuezwsklg;doritrrudhjkldtasdfasdghweewty45657o6p875fd';
encryptedText = rc4(key, text);
decryptedText = rc4(key, encryptedText);


alert(decryptedText);


function rc4(key, str)
{
    var s = [], j = 0, x, res = '';

    for (var i = 0; i < 256; i++) {
        s[i] = i;
    }

    for (i = 0; i < 256; i++) {
        j = (j + s[i] + key.charCodeAt(i % key.length)) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
    }

    i = 0;
    j = 0;

    for (var y = 0; y < str.length; y++) {
        i = (i + 1) % 256;
        j = (j + s[i]) % 256;
        x = s[i];
        s[i] = s[j];
        s[j] = x;
        res += String.fromCharCode(str.charCodeAt(y) ^ s[(s[i] + s[j]) % 256]);
    }

    return res;
}