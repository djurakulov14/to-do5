const box = document.querySelector('.blya')
const row = document.querySelector('#row_change')
const block = document.querySelector('#block_change')
const add_btn = document.querySelector('#add_btn')
const cont = document.querySelector('.container')
const modal = document.querySelector('.modal')
const modal_bg = document.querySelector('.modal_bg')
const form = document.forms.add
const form_edit = document.forms.edit
const edit_m = document.querySelector('.edit_m')
const edit_bg = document.querySelector('.edit_bg')
const delete_btn = document.querySelector('.delete')
const edit_btn = document.querySelector('.edit')
const search = document.querySelector('.search')
let data = []

search.onkeyup = () => {
    let filtered = data.filter(item => item.title.toLowerCase().includes(search.value.toLowerCase()))

    reload(filtered)
}


function fetch() {
    axios.get("http://localhost:3001/tasks")
    .then(res => {
        reload(res.data)
        data = res.data
    })
    
}

fetch()

function post(arr) {
    axios.post("http://localhost:3001/tasks", arr)
    .then(res => fetch())
    
}

function remove(id) {
    axios.delete("http://localhost:3001/tasks"+ "/" + id)
    .then(res => {
        console.log('success')
        fetch()
    })
}

function edit(id, arr) {
    axios.put("http://localhost:3001/tasks"+ "/" + id, arr)
    .then(res => {
        console.log('edit success')
        fetch()
    })
}


let idd = 0

    function reload(arr) {
        box.innerHTML = ''
        
        for(let item of arr) {
            
            box.innerHTML += `
            <div class="row" id="${item.id}">
            <p>${item.title}</p>
            
            <p class="dsc">${item.info}</p>
            
            <div class="time">
            <p>${item.data}</p>
            
            <p>${item.time}</p>
            </div>
            
        <p class="ready">${item.ready}</p>
        </div>
        `
        
        let change_block = document.querySelectorAll('.row')
        block.onclick = () => {
            
            let dsc = document.querySelectorAll('.dsc')
            
            change_block.forEach(element => {
                element.classList.remove('row')
                element.classList.add('block')
            });
            
            dsc.forEach(element => {
                element.style.width = 'auto'
            });
            
            box.classList.remove('blya')
            box.classList.add('blya2')
            
            row.classList.remove('clicked')
            row.classList.add('unclicked')
            
            block.classList.remove('unclicked')
            block.classList.add('clicked')
        }

        row.onclick = () => {

            let dsc = document.querySelectorAll('.dsc')
            
            change_block.forEach(element => {
                element.classList.remove('block')
                element.classList.add('row')
            });
            
            dsc.forEach(element => {
                element.style.width = '492px'
            });
            
            box.classList.remove('blya2')
            box.classList.add('blya')
            
            block.classList.remove('clicked')
            block.classList.add('unclicked')
            
            row.classList.remove('unclicked')
            row.classList.add('clicked')
        }

        change_block.forEach(el => {
            el.onclick = (e) => {
                let id = e.target.id
                idd = id
                console.log(id);
                open_edit()
            }
        })

        delete_btn.onclick = (e) => {
            let id = idd
            remove(id)
            console.log(id);
            close_edit()
        }
    }
}


add_btn.onclick = () => {
    modal.style.display = "block"
    modal_bg.style.display = "block"

    setTimeout(() => {
        modal.style.opacity = "1"
        modal_bg.style.opacity = "0.7"
    }, 200);
}

form.onsubmit = (e) => {

    e.preventDefault()

    let arr = {
        id: Math.round(Math.random()*100000000),
    }

    let fm = new FormData(form)

    fm.forEach((value, key) => {
        arr[key] = value
    })

    post(arr)
    close()
    

    if(box.classList.contains("blya2")) {
        alert("ФИШКА: Вид данных был переведен в ряд, пожалуйста обновите страницу")
    }
}

form_edit.onsubmit = (e) => {

    e.preventDefault()

    let arr = {
        id: idd,
    }

    let fm = new FormData(form_edit)

    fm.forEach((value, key) => {
        arr[key] = value
    })

    edit(idd, arr)
    close_edit()
    console.log(arr);
}

modal_bg.onclick = () => {
    close()
}

function close() {
    modal.style.opacity = "0"
    modal_bg.style.opacity = "0"
    
    setTimeout(() => {
        modal.style.display = "none"
        modal_bg.style.display = "none"
    }, 200);
}

function open_edit() {
    edit_m.style.display = "block"
    edit_bg.style.display = "block"
    setTimeout(() => {
        edit_m.style.opacity = "1"
        edit_bg.style.opacity = "0.7"
        
    }, 200);
}

edit_bg.onclick = () => {
    close_edit()
}

function close_edit() {
    edit_m.style.opacity = "0"
    edit_bg.style.opacity = "0"
    
    setTimeout(() => {
        edit_m.style.display = "none"
        edit_bg.style.display = "none"
    }, 200);
}
