var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');

const gifs = [
    'https://media.giphy.com/media/1ykU65sMyvhz8RSTlL/giphy.gif',
    'https://media2.giphy.com/media/PR7JuscEIXIyKpUgxf/source.gif',
    'https://i.giphy.com/media/3o72FaKt5kTvpJUnXG/giphy.webp',
    'https://media3.giphy.com/media/nmXzfuNWmGzTi/giphy.gif?cid=790b76115d2489323339586c6f2606d8&rid=giphy.gif',
    'https://media3.giphy.com/media/8L1Ln3ZH1UJBW9dIXw/giphy.gif?cid=790b76115d2489567637714d6704ace8&rid=giphy.gif',
    'https://media.giphy.com/media/3oEjI1QxmUxOb5FZuw/giphy.gif',
    'https://media3.giphy.com/media/Jos6XdrEG6kASSSq3W/giphy.gif?cid=790b76115d2489c6784f69314df83add&rid=giphy.gif',
    'https://media3.giphy.com/media/eroy7AoB8XOKc/giphy.gif?cid=790b76115d24864669515a7151948968&rid=giphy.gif',
    'https://media2.giphy.com/media/4K1HwMH9HU0UzBErQp/giphy.gif?cid=790b76115d248ac93437752f6b5c89cf&rid=giphy.gif',
    'https://media2.giphy.com/media/mXVj8BglZJ2QhFNrw0/giphy.gif?cid=790b76115d248ae17354474367ef2ccd&rid=giphy.gif',
    'https://media1.giphy.com/media/PoG4HiCBA6yg7vDvN5/giphy.gif?cid=790b76115d248b0a307947374104d11f&rid=giphy.gif',
    'https://media2.giphy.com/media/26DNh6nLbSNji14wU/giphy.gif?cid=790b76115d248b403251444567143e9f&rid=giphy.gif',
    'https://media0.giphy.com/media/11IA1G8frCKRAA/giphy.gif',
    'https://media1.tenor.com/images/d5f100ce924e0365863590864f04363c/tenor.gif?itemid=4979259',
    'https://66.media.tumblr.com/241f0581283c9eef6451e407b5506c46/tumblr_pi0jn3eCW01rosb88o1_640.gif',
    'https://thumbs.gfycat.com/GrandioseObeseHectorsdolphin-size_restricted.gif',
    'https://media.giphy.com/media/641arBi22PAty/giphy.gif'
];

const gifIndex = Math.floor(Math.random() * gifs.length) +0;


function save(localVar,value){
    localStorage.setItem(localVar, value);
}

function get(localVar){
    return localStorage.getItem(localVar);
}

function newValue(){
    getCurrentWindowActiveTabIndex().then(tabIndex => {
        var localValue = get("mti_"+utc);
        var lastTab = get("mtil_"+utc); 
        var todaysTabs = JSON.parse(get("mtit_"+utc)); 

        if(lastTab != tabIndex) {
                localValue++;
            save("mti_"+utc,localValue || 1);
            if(!todaysTabs){
                todaysTabs = [tabIndex];
            } else if(todaysTabs.indexOf(tabIndex) === -1){
                todaysTabs.push(tabIndex);
            }
        }
        save("mtil_"+utc,tabIndex);
        save("mtit_"+utc,JSON.stringify(todaysTabs));

        document.getElementById("Points").innerHTML = localValue || 1;
    });
}

function getCurrentWindowActiveTabIndex () {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({
            currentWindow: true,
            active: true,
        }, (currentWindowActiveTabs = []) => {
            if (!currentWindowActiveTabs.length) reject();
            resolve(currentWindowActiveTabs[0].index);
        });
    });
}

function setBackground(){
    const element = document.getElementById("MainWrapper");
    if(!element.style){
        return;
    }
    element.style.background = "url('" + gifs[gifIndex] + "') center center no-repeat";
    element.style.backgroundSize = "cover";
    element.style.opacity = 1;
}


document.onreadystatechange = function(){
    if(document.readyState === 'complete'){
        setBackground();
        newValue();
    }
}


