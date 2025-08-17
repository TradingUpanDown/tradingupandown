function createLocalClock(idElement, region){
    // Create the canvas
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 199;
    canvas.height = 220;
    document.getElementById(idElement).appendChild(canvas);
    var center = 95
    var isRunning = true;
    var theme = getCookie('theme');
    if(!theme)
    {
        theme = "light";
    }
    var urlParams;
    var regionData;

    var hAngle = 0;
    var mAngle = 0;
    var sAngle = 0;

    // images
    var bgImg = new Image();
    var hImg = new Image();
    var mImg = new Image();
    var sImg = new Image();

    var imgArr = {};
    imgArr["REGION_WELLINGTON"] = new SectorImage("well", 26, 113);
    imgArr["REGION_SYDNEY"] = new SectorImage("sydney", 29, 120);
    imgArr["REGION_TOKYO"] = new SectorImage("tokyo", 36, 128);
    imgArr["REGION_SINGAPORE"] = new SectorImage("singapore", 24, 111);
    imgArr["REGION_SHANGHAI"] = new SectorImage("shanghai", 36, 128);
    imgArr["REGION_DUBAI"] = new SectorImage("dubai", 45, 133);
    imgArr["REGION_MOSCOW"] = new SectorImage("moscow", 23, 89);
    imgArr["REGION_RIYADH"] = new SectorImage("riyadh", 36, 128);
    imgArr["REGION_JOHANNESB"] = new SectorImage("johannes", 24, 111);
    imgArr["REGION_ZURICH"] = new SectorImage("zurich", 23, 106);
    imgArr["REGION_FRANKFURT"] = new SectorImage("frankfurt", 23, 106);
    imgArr["REGION_LONDON"] = new SectorImage("london", 27, 116);
    imgArr["REGION_NEW_YORK"] = new SectorImage("ny", 29, 120);
    imgArr["REGION_TORONTO"] = new SectorImage("toronto", 29, 120);
    imgArr["REGION_CHICAGO"] = new SectorImage("chicago", 36, 123);
    imgArr["REGION_HONG_KOHG"] = new SectorImage("hk", 29, 120);
    imgArr["REGION_MUMBAI"] = new SectorImage("mumbai", 32, 123);
    imgArr["REGION_SAU_PAULO"] = new SectorImage("spaulo", 24, 111);

    function init(){
        $.get("getUtc.php").done(function (data){
            ClockManager.utcCorrect = new Date(data*1000).getTime() - new Date().getTime();
            loadImages();
            startGameTimer();
            console.log("use server time");
        }).fail(function (){
            console.log("use localtime");
            loadImages();
            startGameTimer();
        });
        var regionStr = "REGION_" + region;
        regionData = ClockManager.getRegionDataByName(regionStr);
    }

    function loadImages()
    {
        hImg.src = "market_clock/mcl/light_new/"+theme+"/h.png";
        mImg.src = "market_clock/mcl/light_new/"+theme+"/m.png";
        sImg.src = "market_clock/mcl/light_new/"+theme+"/s.png";

        bgImg.src = "market_clock/mcl/light_new/"+theme+"/bg.png";
        bgImg.onload = function(){ update(); };
    }

    //Start game timer, i.e. setTimeout that calls itself taking into account the
    //actual real difference in time. This is better than
    function startGameTimer()
    {
        var start = new Date().getTime();
        var time = 0;

        function timer()
        {
            time += 250;
            var diff = (new Date().getTime() - start) - time;
            if(isRunning)
            {
                update();
                setTimeout(timer, (250 - diff));
            }
        }

        if(isRunning)
            setTimeout(timer, 250);
    }

    function update()
    {
        ClockManager.update();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = theme==='light'? "rgb(248,248,248)":"rgb(237,240,243)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bgImg, 0, 0);

        updateRegionSector();
        updateTime();
        updateText();

        //----- hours -----
        ctx.save();

        ctx.translate(center, center);
        ctx.rotate(DegToRad(hAngle));
        ctx.translate(-center, -center);
        ctx.drawImage(hImg, 0, 0);

        ctx.restore();

        //----- minutes -----
        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(DegToRad(mAngle));
        ctx.translate(-center, -center);
        ctx.drawImage(mImg, 0, 0);

        ctx.restore();

        //----- seconds -----
        ctx.save();

        ctx.translate(center, center);
        ctx.rotate(DegToRad(sAngle));
        ctx.translate(-center, -center);
        ctx.drawImage(sImg, 0, 0);

        ctx.restore();
    }

    function updateTime()
    {

        if (regionData) {
            var date = regionData.getUTCTime();

            var sec = date.getUTCSeconds();
            var min = date.getUTCMinutes() + sec/60;
            var hours = date.getUTCHours() + min/60;

            hAngle = 360 * (hours / 24);
            mAngle = 360 * (min / 60);
            sAngle = 360 * (sec / 60);
        }
    }

    function updateText()
    {
        if (regionData) {
            var date = regionData.getUTCTime();
            var timeStr = ClockManager.formatTimeToString(date.getUTCHours()) + ":" +ClockManager.formatTimeToString(date.getUTCMinutes()) + ":" + ClockManager.formatTimeToString(date.getUTCSeconds());

            ctx.save();
            ctx.font = '11pt Arial';
            ctx.textAlign = 'center';
            ctx.fillStyle = "rgb(42,52,63)";// 'dark blue';
            ctx.fillText(timeStr, center, 200);
            ctx.fillText(regionData.getName(), center, 220);
            ctx.restore();
        }
    }

    function updateRegionSector()
    {
        if (regionData) {
            var sector = imgArr[regionData.nameId];
            if (sector) {
                var status = regionData.getMarketStatus();
                var imgSector = sector.getImage(status);
                if(imgSector) {
                    ctx.drawImage(imgSector, 0, 0);
                }
            }
        }
    }

    function DegToRad(d)
    {
        // Converts degrees to radians
        return d * 0.0174532925199432957;
    }

    // (sx,sy) - place of sector image
    function SectorImage(path, sx, sy)
    {
        this.path = path;

        this.sx = sx;
        this.sy = sy;
    }

    SectorImage.prototype.getImage = function(active)
    {
        var pathPrefix = "market_clock/mcl/light_new/sectors/";
        var postfix = ".png";

        var imgStr;

        if(active) {
            postfix = "_or" + postfix;
            imgStr = "active";
        }
        else {
            imgStr = "deactive";
        }

        var pathImg = "market_clock/mcl/light_new/" + theme + "/" + pathPrefix + this.path + postfix;

        if(this[imgStr]) {
            return this[imgStr];
        }
        else {
            this[imgStr] = new Image();
            this[imgStr].src = pathImg;
        }

        return null;
    }

    init();
	function getCookie(name) {

		var matches = document.cookie.match(new RegExp(
		  "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		))
		return matches ? decodeURIComponent(matches[1]) : undefined
	}
}

