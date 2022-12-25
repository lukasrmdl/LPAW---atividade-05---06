let key

function keyPress(element){
    element.addEventListener('keydown', e => {
        key = e.key
    })
}

export { keyPress, key}