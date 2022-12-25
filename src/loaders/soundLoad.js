const soundLoad = async (url) => 
    new Promise(resolve => {
        const audio = new Audio(url)
        return audio.addEventListener("canplaythrough", () => {
            return resolve(audio)
        })
    })

export { soundLoad }