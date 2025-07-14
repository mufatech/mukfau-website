
        // Get the navigation elements
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
        const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav-links a');
        const sections = document.querySelectorAll('section[id]');
        const body = document.body;

        // Mobile menu toggle functionality
        function toggleMobileMenu() {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
            body.classList.toggle('menu-open');
        }

        // Close mobile menu
        function closeMobileMenu() {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            body.classList.remove('menu-open');
        }

        // Function to handle scroll events
        function handleScroll() {
            // Check if the page has been scrolled
            if (window.scrollY > 0) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Update active navigation link
            updateActiveLink();
        }

        // Function to update active navigation link
        function updateActiveLink() {
            let currentSection = '';
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });

            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
                
                // Add active class to current section link
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }

        // Event listeners
        hamburger.addEventListener('click', toggleMobileMenu);
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
        window.addEventListener('scroll', handleScroll);

        // Initialize active link on page load
        updateActiveLink();

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    // Close mobile menu if open
                    closeMobileMenu();
                    
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                
                    // Update active link immediately after click
                    setTimeout(updateActiveLink, 100);
                }
            });
        });

        // Close mobile menu on window resize if screen becomes larger
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        });

        // Close mobile menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMobileMenu();
            }
        });