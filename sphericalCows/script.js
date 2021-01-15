function just() {
    t = document.getElementById('1').value
    //there's a clever exploit here - whoever finds it and reverse engineers the password I'll google pay 200 rupees!
    //dm me if you do
    //-Aaradhya (schrodinger's kittens admin)

    t = parseFloat(t).toFixed(2)
    //sha2 the t and check a part of that for the url ig that should work client side
    let hash = CryptoJS.SHA256(t)
    let enc = hash.toString(CryptoJS.enc.Hex)
    let enc1 = enc.slice(0, 42)
    if (enc1 == '7932a07a8cbc0885919d30c43799f0247ef96badbc'){
        document.body.style.backgroundColor = "black";
        // s1 = t + enc 
        document.getElementById('1').value = (enc.slice(58, ))
        document.getElementById('2').innerHTML = '1B64'
    }
    else{
        document.getElementById('1').value = 'retry'
    }
}
