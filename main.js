const spinners = [];
const spinWaitTimeMin = 100;
const spinWaitTimeMax = 1000;
const spinVariation = 0.1;
const overScaling = 1.5;
const spinFloor = 0.75;
const spinFloorVariation = 0.5;

class Spinner
{
    size = 1/20;
    name;
    image;
    available = true;
    spinDistanceTime;

    constructor(name, image, size = 1/20, spinDistanceTime = 5000)
    {
        this.name = name;
        this.image = chrome.runtime.getURL(image);
        this.size = size * overScaling;
        this.spinDistanceTime = spinDistanceTime;

        spinners.push(this);
    }
}

new Spinner("Kris", "./img/krisSpin.webp", 1/20, 9000);
new Spinner("Susie", "./img/susieSpin.webp", 1/20, 7000);
new Spinner("Ralsei", "./img/ralseiSpin.webp", 1/20, 8000);
new Spinner("Lancer", "./img/lancerSpin.webp", 1/20, 12000);
new Spinner("Queen", "./img/queenSpin.webp", 1/20, 9000);
new Spinner("Gerson", "./img/gersonSpin.webp", 1/20, 15000);
new Spinner("Tenna", "./img/tennaSpin.webp", 1/3, 11000);
new Spinner("Blue", "./img/blueSpin.webp", 1/20, 14000);
new Spinner("Flowery", "./img/flowerySpin.webp", 1/20, 10000);
new Spinner("Aqua & Seth", "./img/aquaSethSpin.webp", 1/20, 11000);

const spinKeyframes =
[
    { left: "100%", translate: "0% 0%" },
    { left: "0%", translate: "-100% 0%" }
];

async function leaveAReviewIfItMatters()
{
    const hometown = document.body.querySelector(".homepage-col-8");
    const dreemurrResidence = hometown.children[0];
    dreemurrResidence.style.position = "relative";
    dreemurrResidence.style.overflow = "hidden";
    dreemurrResidence.style.paddingBottom = `10em`;

    function spawnAvailableSpinner()
    {
        const availableSpinners = spinners.filter(spinner => spinner.available);
        if (availableSpinners.length < 1) return;

        const daSpinner = availableSpinners[Math.floor(Math.random() * availableSpinners.length)];
        daSpinner.available = false;

        const newImg = document.createElement("img");
        newImg.src = daSpinner.image;
        newImg.style.scale = `${daSpinner.size * 100}%`;

        const daSpinTimeVariation = (1.0 - spinVariation) + (Math.random() * spinVariation * 2);
        const daSpinTime = daSpinner.spinDistanceTime * daSpinTimeVariation;

        const spinTiming =
        {
            duration: daSpinTime,
            iterations: 1,
            easing: "linear",
            direction: "normal",
            fill: "forwards"
        };

        newImg.style.display = "block";
        newImg.style.position = "absolute";
        newImg.style.left = "100%";
        const daSpinFloorVariation = (1.0 - spinFloorVariation) + (Math.random() * spinFloorVariation * 2);
        const daSpinFloor = spinFloor * daSpinFloorVariation;
        newImg.style.bottom = `${daSpinFloor}em`;
        newImg.style.zIndex = 100 - Math.round(daSpinFloor * 100);
        newImg.style.transformOrigin = "bottom center";
        dreemurrResidence.appendChild(newImg);

        newImg.animate(spinKeyframes, spinTiming);

        setTimeout(() =>
        {
            dreemurrResidence.removeChild(newImg);
            daSpinner.available = true;
        }, daSpinTime);
    }

    // done like this instead of with an interval
    // for random spin timer
    function startSpinTimeout()
    {
        setTimeout(() =>
        {
            spawnAvailableSpinner();
            startSpinTimeout();
        }, spinWaitTimeMin + Math.random() * (spinWaitTimeMax - spinWaitTimeMin));
    }

    spawnAvailableSpinner();
    startSpinTimeout();
}

leaveAReviewIfItMatters();
