function toggleOldTileset() {
    // Check if the script is running on the index.html page
    if (window.location.pathname === '/index.html') {
      // Get the element with the specified link
      var linkElement = document.querySelector('link[href="../tileset/tileset01.png"]');
  
      // Check if the element is found
      if (linkElement) {
        // Store the original and alternative links
        var originalLink = '../tileset/tileset01.png';
        var alternativeLink = '../tileset/tileset01-old.png';
  
        // Toggle the link
        if (linkElement.href === originalLink) {
          linkElement.href = alternativeLink;
        } else {
          linkElement.href = originalLink;
        }
      }
    }
  }
  



document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.querySelector('.menubutton');
    const menuZhyv = document.querySelector('#menuzhyv');
    const subscribeButton = document.querySelector('.subscribebutton');
    const subscribemenuZhyv = document.querySelector('#subscribemenu');
    const overlay = document.querySelector('#overlay');

    function toggleMenu(menu, overlay) {
        menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
        overlay.style.display = (menu.style.display === 'flex') ? 'block' : 'none';
    }

    function closeMenu(menu, overlay) {
        menu.style.display = 'none';
        overlay.style.display = 'none';
    }

    menuButton.addEventListener('click', function () {
        toggleMenu(menuZhyv, overlay);
    });

    subscribeButton.addEventListener('click', function () {
        toggleMenu(subscribemenuZhyv, overlay);
    });

    overlay.addEventListener('click', function () {
        closeMenu(menuZhyv, overlay);
        closeMenu(subscribemenuZhyv, overlay);
    });

    const closeButtons = document.querySelectorAll('[data-close-button]');
    closeButtons.forEach(function (closeButton) {
        closeButton.addEventListener('click', function () {
            closeMenu(menuZhyv, overlay);
            closeMenu(subscribemenuZhyv, overlay);
        });
    });
});



/* uwu */

class MessageManager {
    constructor(messageElementId) {
      this.messageElement = document.getElementById(messageElementId);
      this.isMessageVisible = false;
    }
  
    toggleMessage() {
      this.isMessageVisible = !this.isMessageVisible;
      this.updateMessageVisibility();
    }
  
    updateMessageVisibility() {
      if (this.isMessageVisible) {
        this.messageElement.style.display = 'block';
      } else {
        this.messageElement.style.display = 'none';
      }
    }
  }
  
  // Example usage:
  const myMessageManager = new MessageManager('PreferencesSex');
  
  function toggleMyMessage() {
    myMessageManager.toggleMessage();
  }
  
  // Now you can call toggleMyMessage() in your specific JavaScript function~
  
