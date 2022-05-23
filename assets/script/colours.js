if(localStorage.getItem('colours') !== 'off') {
    pickColour();
} else {
    disableColours(true);
}

function setCssAccent(a, c) {
    document.querySelector(':root').style.setProperty(`--accent${a}`, `${c}`);
}

function setColour(hue) {
    localStorage.setItem('last-colour', hue);
    document.querySelector('meta[name="theme-color"]').content = `${hslToHex(hue, 40, 50)}`;

    setCssAccent('Dark', hslToHex(hue, 40, 10));
    setCssAccent('DarkIsh', hslToHex(hue, 50, 20));
    setCssAccent('', hslToHex(hue, 40, 50));
    setCssAccent('LightIsh', hslToHex(hue, 50, 80));
    setCssAccent('Light', hslToHex(hue, 35, 95));
}

function pickColour(hue) {
    let randomHue = hue ? hue : Math.floor(Math.random() * (359 - 1 + 1) + 1);

    if(
        // ensure new colour is more than 25deg from previous
        (Math.abs(parseInt(localStorage.getItem('last-colour')) - randomHue) <= 25)
        // ||
        // avoid putrid yellows
        // (baseHue > 45 && baseHue < 120)
    ) {
        return pickColour();    
    } else {        
        setColour(randomHue);
    }
}

function disableColours(noreload) {
    localStorage.setItem('colours', 'off');
    document.getElementById('bw-button').href = 'javascript:enableColours(true)';
    document.getElementById('bw-button').innerHTML = '<i aria-hidden="true">🎨</i> Enable Colours';
    document.getElementById('col-button').style.display = 'none';
    if(!noreload) window.location.reload();
}

function enableColours(noreload) {
    localStorage.setItem('colours', 'on');
    document.getElementById('bw-button').href = 'javascript:disableColours()';
    document.getElementById('bw-button').innerHTML = '<i aria-hidden="true">🎨</i> Disable Colours';
    document.getElementById('col-button').style.display = 'inline';
    
    if(noreload) pickColour();
    if(!noreload) window.location.reload();
}

// // konami code for colour changing!!
// let pressedKeys = '';
// document.addEventListener('keydown', e => {
//     pressedKeys += e.code;
//     if (pressedKeys == "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightKeyBKeyA") {
//         rainbowomg(parseInt(localStorage.getItem('last-colour')));
//     }
// });


let rainbowCurrentHue = 0;
function rainbowomg(startAt) {
    if(startAt) rainbowCurrentHue = startAt;
    if(rainbowCurrentHue < 0 || rainbowCurrentHue > 360) rainbowCurrentHue = 0;
    
    setColour(rainbowCurrentHue);
    rainbowCurrentHue++;

    window.setTimeout(rainbowomg, 20);
} 
// Thank you, icl7126
// https://stackoverflow.com/a/44134328/6325767
function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }