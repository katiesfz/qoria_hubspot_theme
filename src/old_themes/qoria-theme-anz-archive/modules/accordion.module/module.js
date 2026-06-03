const accordionList = document.querySelectorAll('.accordion-collapse');

for (i=0; i < accordionList.length; i++) {
    accordionList[i].addEventListener('show.bs.collapse', event => {
        $(event.target).addClass("opening");
    });
    accordionList[i].addEventListener('shown.bs.collapse', event => {
        $(event.target).removeClass("opening");
    });
}