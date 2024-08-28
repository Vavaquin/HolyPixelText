function changeFontSize() {
    const size = document.getElementById('fontSizeInput').value;
    if (size) {
        const editor = document.getElementById('editor');
        editor.style.fontSize = size + 'px';
    }
}
function execCmd(command) {
    document.execCommand(command, false, null);
}

document.getElementById('editor').addEventListener('keydown', function(event) {
    if (event.ctrlKey) {
        switch(event.key) {
            case 'b':
                event.preventDefault();
                execCmd('bold');
                break;
            case 'i':
                event.preventDefault();
                execCmd('italic');
                break;
            case 'u':
                event.preventDefault();
                execCmd('underline');
                break;
        }
    }
});


function saveFile() {
    const content = document.getElementById('editor').innerText;
    const blob = new Blob([content], { type: 'text/plain'});
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'document.txt';
    a.click();
}


function loadFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('editor').innerText = e.target.result;
    };
    reader.readAsText(file);
}


function changeFont() {
    const font = document.getElementById('fontSelector').value;
    const editor = document.getElementById('editor');
    const divs = editor.getElementsByTagName('div');

    document.getElementById('editor').style.fontFamily = font;

    for (let div of divs) {
        div.style.fontFamily = font;
    }
}


// autosave
const editor = document.getElementById('editor');

editor.addEventListener('input', function() {
    
    saveContent();
});

function saveContent() {
    const content = editor.innerHTML; 
    localStorage.setItem('autosave_content', content); 
}

document.addEventListener('DOMContentLoaded', function() {
    const savedContent = localStorage.getItem('autosave_content');
    if (savedContent) {
        editor.innerHTML = savedContent; 
    }
});

setInterval(saveContent, 30000);




const editor2 = document.getElementById('editor');

editor2.addEventListener('input', function() {
    countWordsAndCharacters();
});

function countWordsAndCharacters() {
    const text = editor.innerText;

    const words = text.trim().split(/\s+/).length;

    const characters = text.length;


    const paragraphs = text.split(/\n\n+/).length;

    
    document.getElementById('wordCount').textContent = `Holy-Words: ${words}`;
    document.getElementById('charCount').textContent = `Sacred-Characters: ${characters}`;
    document.getElementById('paragraphCount').textContent = `Sanctified-Paragraph: ${paragraphs}`;
}


function handleDragEnter(event) {
    event.preventDefault();
    event.stopPropagation();

    event.target.classList.add('drag-over');
}

function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
}

function handleDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();
    
    event.target.classList.remove('drag-over');
}

function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    event.target.classList.remove('drag-over');

    if (event.dataTransfer.files.length > 0) {
        const file = event.dataTransfer.files[0];
        if (file.type === 'text/plain') {
           
            const reader = new FileReader();
            reader.onload = function(e) {
                const content = e.target.result;
      
                document.getElementById('editor').innerText = content;
            };
            reader.readAsText(file);
        } else {
            alert('My diet is restricted, I only accept .txt files ;-; ');
        }
    }
}

function changeWidth() {
    const width = document.getElementById('widthInput').value;
    if (width) {
        const editor = document.getElementById('editor');
        editor.style.width = width + '%';
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const backgroundMusic = new Audio('Psalm135.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.play().catch(error => {
        console.log('Autoplay failed due to browser policies:', error);
    });
});