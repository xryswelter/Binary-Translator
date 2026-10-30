// 'etb' = English (text) to binary, 'bte' = binary to English (text)
let mode = 'etb';

const els = {
    segmented: document.querySelector('.segmented'),
    segments: document.querySelectorAll('.segment'),
    input: document.getElementById('original'),
    output: document.getElementById('trans'),
    inputLabel: document.getElementById('inputLabel'),
    outputLabel: document.getElementById('outputLabel'),
    hint: document.getElementById('hint'),
    stats: document.getElementById('stats'),
    copy: document.getElementById('copyButton'),
    clear: document.getElementById('clearButton'),
    swap: document.getElementById('swapButton'),
    breakdown: document.getElementById('breakdown'),
    chips: document.getElementById('chips'),
    announcer: document.getElementById('announcer'),
};

//* Text to binary
// Each character becomes its code point in binary, padded to a whole number of bytes
function toBinary(char) {
    const bits = char.codePointAt(0).toString(2);
    return bits.padStart(Math.ceil(bits.length / 8) * 8, '0');
}

function textToPairs(text) {
    // Spreading the string splits by code point, so emoji stay in one piece
    return [...text].map(char => ({ char, bin: toBinary(char) }));
}

//* Binary to text
function binaryToPairs(text) {
    const groups = text.trim().split(/\s+/).filter(Boolean);
    const bad = groups.find(g => !/^[01]+$/.test(g));
    if (bad) {
        throw new Error(`"${bad}" isn't binary. Use only 0s and 1s, separated by spaces.`);
    }
    return groups.map(bin => {
        const code = parseInt(bin, 2);
        if (code > 0x10FFFF) {
            throw new Error(`"${bin}" is too large to be a character.`);
        }
        return { char: String.fromCodePoint(code), bin };
    });
}

//* Rendering
function render() {
    const value = els.input.value;
    let pairs = [];
    let result = '';

    let hint = mode === 'etb'
        ? 'Translates as you type.'
        : 'Separate each byte with a space.';
    let invalid = false;

    try {
        if (mode === 'etb') {
            pairs = textToPairs(value);
            result = pairs.map(p => p.bin).join(' ');
        } else if (value.trim()) {
            pairs = binaryToPairs(value);
            result = pairs.map(p => p.char).join('');
        }
    } catch (err) {
        hint = err.message;
        invalid = true;
        pairs = [];
        result = '';
    }

    // The hint is a live region, so only touch it when the message changes;
    // rewriting identical text can make screen readers repeat it on every keystroke
    if (els.hint.textContent !== hint) {
        els.hint.textContent = hint;
    }
    els.hint.classList.toggle('error', invalid);
    // aria-invalid needs the literal "true"; an empty value counts as false
    if (invalid) {
        els.input.setAttribute('aria-invalid', 'true');
    } else {
        els.input.removeAttribute('aria-invalid');
    }

    els.output.textContent = result;
    els.copy.disabled = !result;
    els.stats.textContent = pairs.length
        ? `${pairs.length} character${pairs.length === 1 ? '' : 's'}`
        : ' ';
    renderChips(pairs);
}

function renderChips(pairs) {
    els.breakdown.hidden = pairs.length === 0;
    els.chips.replaceChildren(...pairs.map(({ char, bin }) => {
        const chip = document.createElement('li');
        chip.className = 'chip';

        const c = document.createElement('span');
        c.className = 'chip-char';
        if (char === ' ') {
            // Show a visible space symbol, but have screen readers say "space"
            const symbol = document.createElement('span');
            symbol.setAttribute('aria-hidden', 'true');
            symbol.textContent = '␣';
            const label = document.createElement('span');
            label.className = 'visually-hidden';
            label.textContent = 'space';
            c.append(symbol, label);
        } else {
            c.textContent = char;
        }

        const b = document.createElement('span');
        b.className = 'chip-bin';
        b.textContent = bin;

        chip.append(c, ' ', b);
        return chip;
    }));
}

function setMode(next) {
    mode = next;
    els.segmented.dataset.mode = mode;
    els.segments.forEach(btn => {
        const active = btn.dataset.mode === mode;
        btn.classList.toggle('active', active);
        btn.setAttribute('aria-pressed', active);
    });
    els.inputLabel.textContent = mode === 'etb' ? 'Text' : 'Binary';
    els.outputLabel.textContent = mode === 'etb' ? 'Binary' : 'Text';
    els.input.placeholder = mode === 'etb' ? 'Hello, world!' : '01001000 01101001';
    render();
}

//* Events
els.segments.forEach(btn => btn.addEventListener('click', () => setMode(btn.dataset.mode)));

els.input.addEventListener('input', render);

// Swap moves the current output into the input and flips direction
els.swap.addEventListener('click', () => {
    const result = els.output.textContent;
    setMode(mode === 'etb' ? 'bte' : 'etb');
    els.input.value = result;
    render();
    els.input.focus();
});

els.clear.addEventListener('click', () => {
    els.input.value = '';
    render();
    els.input.focus();
});

els.copy.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(els.output.textContent);
        els.copy.textContent = 'Copied!';
        els.announcer.textContent = `${els.outputLabel.textContent} copied to clipboard`;
    } catch {
        els.copy.textContent = 'Copy failed';
        els.announcer.textContent = 'Copy failed';
    }
    setTimeout(() => {
        els.copy.textContent = 'Copy';
        els.announcer.textContent = '';
    }, 1500);
});

render();
