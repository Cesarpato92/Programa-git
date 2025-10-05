 // Control de menús para todos los dispositivos
        document.addEventListener('DOMContentLoaded', function() {
            const menuContainer = document.querySelector('.menu-container');
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            
            if (isTouchDevice) {
                document.body.classList.add('touch-mode');
                
                // Delegación de eventos para mejor rendimiento
                menuContainer.addEventListener('click', function(e) {
                    const link = e.target.closest('.has-submenu > a');
                    if (link) {
                        e.preventDefault();
                        const parentLi = link.parentElement;
                        const submenu = link.nextElementSibling;
                        
                        // Cerrar otros submenús del mismo nivel
                        const siblings = parentLi.parentElement.children;
                        for (let sibling of siblings) {
                            if (sibling !== parentLi && sibling.querySelector('.submenu-visible')) {
                                sibling.querySelector('.submenu-visible').classList.remove('submenu-visible');
                                sibling.setAttribute('aria-expanded', 'false');
                            }
                        }
                        
                        // Alternar el submenú actual
                        submenu.classList.toggle('submenu-visible');
                        parentLi.setAttribute('aria-expanded', submenu.classList.contains('submenu-visible'));
                    }
                });
                
                // Cerrar menús al hacer clic fuera
                document.addEventListener('click', function(e) {
                    if (!e.target.closest('.menu-container')) {
                        const openMenus = document.querySelectorAll('.submenu-visible');
                        openMenus.forEach(menu => {
                            menu.classList.remove('submenu-visible');
                            menu.parentElement.setAttribute('aria-expanded', 'false');
                        });
                    }
                });
            } else {
                // Comportamiento para desktop (hover)
                const menuItems = document.querySelectorAll('.has-submenu');
                
                menuItems.forEach(item => {
                    item.addEventListener('mouseenter', function() {
                        this.querySelector('.submenu').classList.add('submenu-visible');
                        this.setAttribute('aria-expanded', 'true');
                    });
                    
                    item.addEventListener('mouseleave', function() {
                        this.querySelector('.submenu').classList.remove('submenu-visible');
                        this.setAttribute('aria-expanded', 'false');
                    });
                });
            }
            
            // Manejo del redimensionamiento
            window.addEventListener('resize', function() {
                if (!isTouchDevice && window.innerWidth <= 768) {
                    document.body.classList.add('touch-mode');
                } else if (!isTouchDevice) {
                    document.body.classList.remove('touch-mode');
                }
            });
        });

   