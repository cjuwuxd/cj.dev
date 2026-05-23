/* loading animation */
            const phrases = [
                "stuff is happening",
                "have you tried SKRBL.ai?",
                "hol up lemme cook",
                "welcome to my website!",
                "hi ;)",
                "optimizing your experience"
            ]

            const loadingTexts = document.getElementById("loading-text");

            if (loadingTexts) {
                const random = Math.floor(Math.random() * phrases.length);
                loadingTexts.textContent = phrases[random];
            }


            window.addEventListener('load', () => {
                const loader = document.getElementById('loading-screen');
                if (loader) {
                    loader.classList.add('fade-out');
                }
                
            
                setTimeout(() => {
                    loader.style.display = 'none';
            }, 500);
            });