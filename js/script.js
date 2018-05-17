var level = {
    name: '',
    diff: 4,
    img: null
}
var temp;

var scalePos = (size, gt, lt) => {
    return (((size * 100) / lt) * ((gt - lt) / 2)) / 100;
}

var sliceBox = (elem) => {
    var text = `<div class="box-l${level.diff}"></div>`;
    var res = '';
    for (var i = 0; i < level.diff; i++) {
        res += text;
    }
    temp = res;
    elem.innerHTML = res;
}

var execUpload = (file) => {
    var image = document.querySelector('#input-image');
    if (file.type === 'image/jpeg') {
        level.img = file;
        var reader = new FileReader();
        reader.onload = (e) => {
            var objImg = new Image();
            objImg.onload = (ee) => {
                var width = ee.target.width;
                var height = ee.target.height;
                if (width > height) {
                    var pos = scalePos(380, width, height);
                    image.style.background = `url(${e.target.result}) -${pos}px 0`;
                } else if (width < height) {
                    var pos = scalePos(380, height, width);
                    image.style.background = `url(${e.target.result}) 0 -${pos}px`;
                } else {
                    image.style.background = `url(${e.target.result})`;
                }
                image.classList.add('del-outline');
                sliceBox(image);
            }
            objImg.src = e.target.result;
        }
        reader.readAsDataURL(file);
    } else {
        alert('Please upload JPG image!');
    }
}

$(document).ready(() => {
    var image = document.querySelector('#input-image');
    var input = document.querySelector('#form-image');
    var radio = document.querySelectorAll('input[type=radio]');
    var notify = document.querySelector('#notify');

    input.addEventListener('change', (e) => {
        e.preventDefault();
        if (e.target.files.length === 1) {
            var file = e.target.files[0];
            execUpload(file);
        }
    })
    image.addEventListener('drop', (e) => {
        e.preventDefault();
        image.classList.remove('ii-hover');
        if (e.dataTransfer.files.length === 1) {
            var file = e.dataTransfer.files[0];
            execUpload(file);
        }
    })
    image.addEventListener('dragover', (e) => {
        e.preventDefault();
        image.classList.add('ii-hover');
        if (level.img !== null) {
            notify.classList.add('notify');
            image.innerHTML = '';
        }
    })
    image.addEventListener('dragleave', (e) => {
        e.preventDefault();
        image.classList.remove('ii-hover');
        if (level.img !== null) {
            notify.classList.remove('notify');
            image.innerHTML = temp;
        }
    })
    radio.forEach((v) => {
        v.addEventListener('change', (e) => {
            level.diff = e.target.value;
            if (level.img !== null) {
                sliceBox(image);
            }
        })
    })
    image.addEventListener('mouseover', (e) => {
        if (level.img !== null) {
            notify.classList.add('notify');
            image.innerHTML = '';
        }
    })
    notify.addEventListener('mouseover', (e) => {
        if (level.img !== null) {
            notify.classList.add('notify');
            image.innerHTML = '';
        }
    })
    image.addEventListener('mouseout', (e) => {
        if (level.img !== null) {
            notify.classList.remove('notify');
            image.innerHTML = temp;
        }
    })
    notify.addEventListener('mouseout', (e) => {
        if (level.img !== null) {
            notify.classList.remove('notify');
            image.innerHTML = temp;
        }
    })
})