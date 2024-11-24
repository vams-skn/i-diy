let score = 0;

const bins = document.querySelectorAll('.bin');
const items = document.querySelectorAll('.item');

items.forEach(item => {
    item.addEventListener('dragstart', dragStart);
});

bins.forEach(bin => {
    bin.addEventListener('dragover', dragOver);
    bin.addEventListener('drop', drop);
});

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.dataset.type);
    e.dataTransfer.setData('text/html', e.target.outerHTML);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const type = e.dataTransfer.getData('text/plain');
    const binType = e.target.id.split('-')[0];
    const itemHTML = e.dataTransfer.getData('text/html');

    document.getElementById('correct').style.display = 'none';
    document.getElementById('incorrect').style.display = 'none';

    if (type === binType) {
        score += 10;
        const itemElement = document.createElement('div');
        itemElement.innerHTML = itemHTML;
        itemElement.firstChild.classList.add('invisible');
        e.target.appendChild(itemElement.firstChild);
        
        const itemToRemove = document.querySelector(`img[data-type="${type}"]:not(.invisible)`);
        if (itemToRemove) {
            itemToRemove.remove();
        }

        document.getElementById('correct').style.display = 'inline';
    } else {
        score -= 5;
        document.getElementById('incorrect').style.display = 'inline';
    }
    
    document.getElementById('score').innerText = 'Score: ' + score;
}
const infoButton = document.getElementById('info-button');
const infoPopup = document.getElementById('info-popup');
const closePopup = document.getElementById('close-popup');

infoButton.addEventListener('click', () => {
    infoPopup.style.display = 'block';
});

closePopup.addEventListener('click', () => {
    infoPopup.style.display = 'none';
});