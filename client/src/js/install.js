const butInstall = document.getElementById('buttonInstall');


window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
  
    if (promptEvent) {
      promptEvent.prompt();
  
      promptEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        window.deferredPrompt = null;
      });
    }
  
    butInstall.classList.toggle('hidden', true);
  });

window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
