onBootstrapReady(() => {
    const accordionList = document.querySelectorAll('.accordion-collapse');

    accordionList.forEach(accordion => {
        accordion.addEventListener('show.bs.collapse', (event) => {
            event.target.classList.add('opening');
        });
        accordion.addEventListener('shown.bs.collapse', (event) => {
            event.target.classList.remove('opening');
        });
    });
});
