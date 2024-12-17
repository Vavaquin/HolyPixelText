const tabs = JSON.parse(localStorage.getItem('tabs')) || [];
let activeTab = null;

function renderTabs() {
  const tabList = document.getElementById('tabList');
  tabList.innerHTML = '';
  tabs.forEach((tab, index) => {
    const li = document.createElement('li');
    const span = document.createElement('span');

    li.textContent = tab.name;
    li.onclick = () => switchTab(index);
    li.style.cursor = 'pointer';

    span.textContent = ' X';
    span.style.color = 'red';
    span.style.cursor = 'pointer';
    span.onclick = (event) => {
      event.stopPropagation();
      deleteTab(index);
    };

    li.appendChild(span);
    tabList.appendChild(li);
  });
}

function createNewTab() {
  const name = prompt('Name of the new sacred note:');
  if (name) {
    const newTab = { name, content: '' };
    tabs.push(newTab);
    saveTabs();
    renderTabs();
    switchTab(tabs.length - 1);
  }
}

function deleteTab(index) {
  const confirmation = confirm(`Are you sure you want to delete this holy note"${tabs[index].name}"?`);
  if (confirmation) {
    tabs.splice(index, 1);
    saveTabs();
    renderTabs();
    if (activeTab === index) {
      activeTab = null;
      document.getElementById('editor').innerHTML = '';
    } else if (activeTab > index) {
      activeTab--;
    }
    if (tabs.length > 0 && activeTab === null) {
      switchTab(0);
    }
  }
}

function switchTab(index) {
  activeTab = index;
  const editor = document.getElementById('editor');
  editor.innerHTML = tabs[index].content || '';
}

document.getElementById('editor').addEventListener('input', () => {
  if (activeTab !== null) {
    tabs[activeTab].content = document.getElementById('editor').innerHTML;
    saveTabs();
  }
});

function saveTabs() {
  localStorage.setItem('tabs', JSON.stringify(tabs));
}

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

    renderTabs();
    if (tabs.length > 0) switchTab(0);
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
    const pauseButton = document.getElementById('Pause');
    pauseButton.addEventListener('click', function() {
        if (backgroundMusic.paused) {
            backgroundMusic.play().catch(error => {
                console.log('Error playing music:', error);
            });
        } else {
            backgroundMusic.pause();
        }
    });
});
