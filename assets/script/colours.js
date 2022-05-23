if(localStorage.getItem('colours') !== 'off') {
    pickColour();
    document.body.classList.add('colours-enabled');
} else {
    document.getElementById('bw-button').href = 'javascript:enableColours()';
    document.getElementById('bw-button').innerHTML = '<i class="fas fa-fw fa-tint" aria-hidden="true"></i> Enable Colours';
}

function setCssAccent(a, c) {
    document.querySelector(':root').style.setProperty(`--accent${a}`, `${c}`);
}

function setColour(c) {
    document.querySelector('meta[name="theme-color"]').content = `${c[0]}`;

    setCssAccent('Dark', c[0]);
    setCssAccent('DarkIsh', c[1]);
    setCssAccent('', c[2]);
    setCssAccent('LightIsh', c[3]);
    setCssAccent('Light', c[4]);

}

function pickColour(hue) {
    let baseHue = hue ? hue : Math.floor(Math.random() * (359 - 1 + 1) + 1);

    if(
        // ensure new colour is more than 25deg from previous
        (Math.abs(parseInt(localStorage.getItem('last-colour')) - baseHue) <= 25)
        ||
        // avoid putrid yellows
        (baseHue > 45 && baseHue < 120)
    ) {
        return pickColour();    
    } else {        
        localStorage.setItem('last-colour', baseHue);

        return setColour([
            // hue, sat %, lum %
            // todo: perceived luminance correction 
            hslToHex(baseHue, 40, 10), // dark
            hslToHex(baseHue, 50, 20), // darkish
            hslToHex(baseHue, 40, 50), // base
            hslToHex(baseHue, 50, 80), // lightish
            hslToHex(baseHue, 35, 95) // light
        ]);
    }
}

function disableColours() {
    localStorage.setItem('colours', 'off');
    document.getElementById('bw-button').href = 'javascript:enableColours()';
    document.getElementById('bw-button').innerHTML = '<i class="fas fa-fw fa-tint" aria-hidden="true"></i> Enable Colours';
    window.location.reload();
}

function enableColours() {
    localStorage.setItem('colours', 'on');
    document.getElementById('bw-button').href = 'javascript:disableColours()';
    document.getElementById('bw-button').innerHTML = '<i class="fas fa-fw fa-tint-slash" aria-hidden="true"></i> Disable Colours';
    window.location.reload();
}

// konami code for colour changing!!
let pressedKeys = '';
document.addEventListener('keydown', e => {
  pressedKeys += e.code;
  if (pressedKeys == "ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightKeyBKeyA") {
      window.setInterval(pickColour, 1000);
  }
});

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