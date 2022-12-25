const imageLoad = async (url) =>
    new Promise(resolve => {
        const img = new Image()
        img.addEventListener('load', () => {
            return resolve(img)
        })
        img.src = url
    }
)

export { imageLoad }