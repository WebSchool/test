text = 'привет как дела?';
key = '12345678901234567890123456789012345678901234567890123456789012345678901234567890df';

encryptedText = rc4(key, text);
decryptedText = rc4(key, encryptedText);


alert(decryptedText);


function rc4(key, text)
{
    var s, i, j, x, charCodeAt, res, y, sumIJ, mod, xor;

    // заполняем "s" от 0...255
    s = [];
    for (i = 0; i < 256; i++)
    {
        s[i] = i;
    }

    j = 0;
    x = 0;
    charCodeAt = '';
    for (i = 0; i < 256; i++)
    {
        /*

        charCodeAt = 49 (от 0)
        j = (0 + 0 + 49) % 256 = 49

        x = 0
        s[0] = 49
        s[49] = 0

        -----------------

        charCodeAt = 50 (от 1)
        j = (49 + 1 + 50) % 256 = 100

        x = 1
        s[1] = 100
        s[100] = 1

        -----------------

        charCodeAt = 51 (от 2)
        j = (100 + 2 + 51) % 256 = 153

        x = 2
        s[2] = 153
        s[153] = 2

        -----------------

        .
        .
        .
        .
        .

        */

        charCodeAt = key.charCodeAt(i % key.length);
        j = (j + s[i] + charCodeAt) % 256;

        x = s[i];
        s[i] = s[j];
        s[j] = x;
    }

    /*

    j = 104
    s = [....]

    */

    i = 0;
    x = 0;
    charCodeAt = '';
    sumIJ = 0;
    mod = 0;
    xor = 0;
    res = '';
    for (y = 0; y < text.length; y++)
    {
        /*

        i = (0 + 1) % 256 = 1
        j = (104 + 27) % 256 = 131

        x = 27
        s[1] = 121
        s[131] = 27

        charCodeAt = 1087 (от 0)
        sumIJ = 121 + 27 = 148
        mod = 148 % 256 = 148
        xor = 1087 ^ 29 = 1058

        -----------------

        i = (1 + 1) % 256 = 2
        j = (131 + 153) % 256 = 28

        x = 153
        s[2] = 38
        s[28] = 153

        charCodeAt = 1088 (от 1)
        sumIJ = 38 + 153 = 191
        mod = 191 % 256 = 191
        xor = 1088 ^ 44 = 1132

        -----------------

        .
        .
        .
        .
        .

        */

        i = (i + 1) % 256;
        j = (j + s[i]) % 256;

        x = s[i];
        s[i] = s[j];
        s[j] = x;

        charCodeAt = text.charCodeAt(y);
        sumIJ = s[i] + s[j];
        mod = sumIJ % 256;
        xor = charCodeAt ^ s[mod];

        res += String.fromCharCode(xor);
    }

    return res;
}