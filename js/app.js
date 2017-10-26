document.addEventListener('DOMContentLoaded', () => {

    console.log('siemanko');
    
    let canvas = document.querySelector('#canvas');
    let c = canvas.getContext('2d');
    let innerWidth = canvas.width = window.innerWidth;
    let innerHeight = canvas.height = window.innerHeight - 50;
    let button = document.querySelector('#button');
    
    // --- Events ---
    
    canvas.addEventListener('click', function() {
        init();
    });
    
    window.addEventListener('resize', function() {
        innerWidth = canvas.width = window.innerWidth;
        innerHeight = canvas.height = window.innerHeight - 50;
        
        init();
    });
    
    button.addEventListener('click', function() {
        let raindropsNumber = document.querySelector('#raindropsNumber').value;

        dropsNumber = raindropsNumber;
        init();
    });

    // --- Utility functions ---

    function randomIntFromRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    // --- Base Class ---

    class Rectangle {
        constructor(x, y, dy, width, height, color) {
            this.x = x;
            this.y = y;
            this.dy = dy;
            this.width = width;
            this.height = height;
            this.color = color;
        }

        draw() {
            c.fillRect(this.x, this.y, this.width, this.height);
            c.fillStyle = this.color;
        };

        update() {

            // Restart cycle (inifinity)
            if (this.y > innerHeight) {
                this.y = randomIntFromRange(-100, -500);
            }
            // Larger raindrops are faster 
            if (this.width >= 3 && this.height >= 10) {
                this.dy = randomIntFromRange(11, 14); 
            }

            this.y += this.dy;
            this.draw();
        }
    }

    
    // --- Dynamic elements ---

    let rainDrop;
    let rainArray;
    let dropsNumber = 400;

    function init() {
        rainArray = [];
        for (let i = 0; i < dropsNumber; i++) {
            let x = randomIntFromRange(10, innerWidth - 10);
            let y = randomIntFromRange(-100, -300);
            let dy = randomIntFromRange(6, 10);
            let width = randomIntFromRange(2, 4);
            let height = randomIntFromRange(10, 14);
            // Alternative raidrop size to create more raindrops in background
            let widthBg = 2;
            let heightBg = 10;
            let color = 'rgb(139, 85, 139)';
            let halfDropsNumber = dropsNumber / 2;
            // Creating more raindrops on the background (realistic effect)
            if (i < halfDropsNumber) {
                rainArray.push(new Rectangle(x, y, dy, width, height, color));
            } else {
                rainArray.push(new Rectangle(x, y, dy, widthBg, heightBg, color));
            }
        }
    }


    // --- Main animation loop ---
    
    (() => {
        function main() {
            let stopMain = window.requestAnimationFrame(main);
            c.clearRect(0, 0, innerWidth, innerHeight);
            let length = rainArray.length;
            for (let i = 0; i < length; i++) {
                rainArray[i].update();
            }
          
          // Main loop content.
        }
        init(); // Initialize canvas with objects.
        main(); // Start the cycle.
    })();

})