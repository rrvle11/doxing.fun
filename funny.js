const body = document.getElementsByTagName('body')
window.addEventListener('keydown', (event) => {
    if (event.ctrlKey && (event.key === 'S' || event.key === 's')) {
        event.preventDefault()
        body[0].innerHTML =
          'bruh i saw u tryna skid'
    }
    if (event.ctrlKey && event.key === 'C') {
        event.preventDefault()
        body[0].innerHTML =
            'bruh i saw u tryna skid'
    }
    if (event.ctrlKey && (event.key === 'E' || event.key === 'e')) {
        event.preventDefault()
        body[0].innerHTML =
          'bruh i saw u tryna skid'
    }
    if (
        event.ctrlKey &&
        (event.key === 'I' || event.key === 'i' || event.key === 'Ä\xB1')
    ) {
        event.preventDefault()
        body[0].innerHTML =
          'bruh i saw u tryna skid'
    }
    if (event.ctrlKey && (event.key === 'K' || event.key === 'k')) {
        event.preventDefault()
        body[0].innerHTML =
          'bruh i saw u tryna skid'
    }
    if (event.ctrlKey && (event.key === 'U' || event.key === 'u')) {
        event.preventDefault()
        body[0].innerHTML =
          'bruh i saw u tryna skid'
    }
})
document.addEventListener('contextmenu', function (e) {
    e.preventDefault()
})