const section = document.querySelector('.spotlight-overlay').closest(".dnd-section");
const cursor = section.querySelector('.spotlight-overlay');

section.classList.add('position-relative', 'overflow-hidden', 'js-enabled');

section.addEventListener('mousemove', (e) => {
  const rect = section.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;

  section.style.setProperty('--x', `${x}%`);
  section.style.setProperty('--y', `${y}%`);
});

section.addEventListener('mouseleave', () => {
    cursor.style.setProperty('--spotlight-t', "1");
});

section.addEventListener('mouseenter', () => {
    cursor.style.setProperty('--spotlight-t', "0");
});