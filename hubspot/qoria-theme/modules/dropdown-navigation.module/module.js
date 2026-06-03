document.addEventListener('click', function(event) {
  const closeButton = event.target.closest('.close-dropdown');

  if (closeButton) {
    const dropdownMenu = closeButton.closest('.dropdown-menu');
    if (dropdownMenu) {
      const dropdownToggle = dropdownMenu.previousElementSibling;
      bootstrap.Dropdown.getInstance(dropdownToggle)?.hide();
    }
  }
});