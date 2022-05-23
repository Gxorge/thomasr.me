const colours = [
     // tailwind colours       // 400   // 50    // 100   // 700or800  // 800 or 900
    {"name": "red", "colours": ["F87171","FEF2F2","FEE2E2","991B1B","7F1D1D"]}, // orange and red
    // {"name": "ora", "colours": ["FB923C","FFF7ED","FFEDD5","9A3412","7C2D12"]}, // are too garish
    {"name": "yel", "colours": ["FACC15","FEFCE8","FEF9C3","854D0E","713F12"]},
    {"name": "eme", "colours": ["34D399","ECFDF5","D1FAE5","065F46","064E3B"]},
    {"name": "cya", "colours": ["22D3EE","ECFEFF","CFFAFE","155E75","164E63"]},
    {"name": "blu", "colours": ["60A5FA","EFF6FF","DBEAFE","1E40AF","1E3A8A"]},
    {"name": "ind", "colours": ["818CF8","EEF2FF","E0E7FF","3730A3","312E81"]},
    {"name": "pur", "colours": ["C084FC","FAF5FF","F3E8FF","6B21A8","581C87"]},
    {"name": "fuc", "colours": ["E879F9","FDF4FF","FAE8FF","86198F","701A75"]}
    // {"name": "ros", "colours": ["FB7185","FFF1F2","FFE4E6","9F1239","881337"]} 
];

if(localStorage.getItem('colours') !== 'off') {
    pickColour();
} else {
    document.getElementById('bw-button').href = 'javascript:enableColours()';
    document.getElementById('bw-button').innerHTML = '<i class="fas fa-fw fa-tint" aria-hidden="true"></i> Enable Colours';
}

function setCssAccent(a, c) {
    document.querySelector(':root').style.setProperty(`--accent${a}`, `#${c}`);
}

function setColour(c) {
    document.querySelector('meta[name="theme-color"]').content = `#${c.colours[0]}`;

    setCssAccent('', c.colours[0]);
    setCssAccent('Light', c.colours[1]);
    setCssAccent('LightIsh', c.colours[2]);
    setCssAccent('DarkIsh', c.colours[3]);
    setCssAccent('Dark', c.colours[4]);

    localStorage.setItem('last-colour', c.name);
}

function pickColour() {
    let randColour = colours[Math.floor(Math.random()*colours.length)];

    if(localStorage.getItem('last-colour') == randColour.name) {
        pickColour();
    } else {
        return setColour(randColour);
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