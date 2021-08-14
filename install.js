let buttonInstall = document.getElementById('install');
let defferedPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    defferedPrompt = e;
    console.log('beforenstallprompt was fired');
})

buttonInstall.addEventListener('click', async () => {
    defferedPrompt.prompt();
    const { outcome } = await defferedPrompt.userChoice;
    console.log(`Use response to the install prompt: ${outcome}`);
    defferedPrompt = null;
})