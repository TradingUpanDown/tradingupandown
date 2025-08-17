//================= REGION LOCAL DATA =======================

function RegionLocalData(id, nameId, UTCOffset, beginTime, workTime)
{
    this.UTCOffset = UTCOffset*60*60*1000;
    this.workTime = workTime;
    this.beginTime = beginTime;
    this.nameId = nameId;
    this.id = id;
    this.vectorHolidays = [];
    this.weekend = [0,6];
    this.dstOffset = 0;
}

RegionLocalData.prototype.initDST = function(dstStart, dstEnd, dstOffset)
{
    this.dstStart = dstStart;
    this.dstEnd = dstEnd;
    this.dstOffset = dstOffset;
}
RegionLocalData.prototype.setWeekend = function(arr)
{
    this.weekend = arr;
}
RegionLocalData.prototype.setHolidays = function(arr)
{
    var index;
    for (index = 0; index < arr.length; ++index) {
        var hol = arr[index];
        var a = hol.split(".");
        var day = parseInt(a[0],10);
        var month = parseInt(a[1],10) - 1;

        this.vectorHolidays.push( { day:day, month:month} );
    }
}

RegionLocalData.prototype.getUTCTime = function()
{
    return this.date;//new Date(this.date.getTime() + ClockManager.utcCorrect);
}

RegionLocalData.prototype.getMarketStartTimeUTC = function()
{
    return (this.beginTime - (this.UTCOffset + this.curDstOffset) / 1000);
}

RegionLocalData.prototype.updateUTCTime = function(time)
{
    var dstActive = this.checkDst(time);
    this.curDstOffset = dstActive ? this.dstOffset*60*60*1000 : 0;
    time += this.UTCOffset + this.curDstOffset;
    this.date = new Date(time);
}

RegionLocalData.prototype.checkDst = function(time)
{
    if (!this.dstStart || !this.dstEnd) {
        return false;
    }

    var curTime = time + this.UTCOffset;
    var date = new Date(curTime);
    var curYear = date.getUTCFullYear();

    var startDstTime = this.dstStart.formatDate(curYear);
    var endDstTime = this.dstEnd.formatDate(curYear);

    if (startDstTime < endDstTime) {
        if (startDstTime < curTime && curTime < endDstTime) {
            return true;
        }
    }
    else {
        if (curTime < endDstTime || curTime > startDstTime) {
            return true;
        }
    }
    return false;
}

RegionLocalData.prototype.getMarketStatus = function()
{
  this.date = new Date(this.date.getTime());
    var dayTimeInSeconds = this.date.getUTCSeconds() + this.date.getUTCMinutes() * 60 + this.date.getUTCHours() * 60 * 60;
    var day = this.date.getUTCDay();

    for(var i = 0;i<this.weekend.length;i++) {
        if (day == this.weekend[i])
            return false;
    }

    var dayOfMonth = this.date.getUTCDate();
    var month = this.date.getUTCMonth();

    var index;
    for (index = 0; index < this.vectorHolidays.length; ++index) {
        holidayObj = this.vectorHolidays[index];
        if (holidayObj.day == dayOfMonth && holidayObj.month == month) {
            return false;
        }
    }

    if (dayTimeInSeconds > this.beginTime && dayTimeInSeconds < this.beginTime + this.workTime) {
        return true;
    }

    return false;
}

RegionLocalData.prototype.getName = function()
{
    return ClockManager.getText(this.nameId);
}


//===================== DST DATA =========================

function DstData(month, dayOrder)
{
    this.dayOrder = dayOrder;
    this.month = month;
}

DstData.prototype.formatDate = function(year)
{
    var dateDay = (this.dayOrder == DstData.DAY_LAST) ? ClockManager.getDaysCountInMonth(year, this.month) : 1;

    var date = new Date(Date.UTC(year, this.month, dateDay));
    var hourYTC = date.getUTCHours();
    var hour = date.getHours();

    var weekDay = date.getUTCDay();
    var difference;
    var monthDay;

    if(this.dayOrder > 0) {
        difference = (7 - weekDay) % 7;
        monthDay = difference + (this.dayOrder - 1) * 7;
       }
    else {
        monthDay = dateDay - weekDay;
    }

    return (new Date(Date.UTC(year, this.month, monthDay))).getTime();
}

DstData.DAY_LAST = -1;
DstData.DAY_FIRST = 1;
DstData.DAY_SECOND = 2;
DstData.DAY_THREE = 3;

//=================== STATIC CLOCK MANAGER ======================

var ClockManager = {};
ClockManager.REGIONS_COUNT = 18;
ClockManager.REGION_UTC = 19;

ClockManager.regionsVector = new Array();
ClockManager.utcCorrect = 0;
ClockManager.currentTimeZone = getCookie('time_zone');
if(!ClockManager.currentTimeZone)
{
    ClockManager.currentTimeZone = -new Date().getTimezoneOffset();
}
else
{
    var items = ClockManager.currentTimeZone.split(':');
    var h = parseInt(items[0],10);
    ClockManager.currentTimeZone = h*60;
    if(items.length>1)
    {
        if(h>0){
            ClockManager.currentTimeZone += parseInt(items[1], 10);
        }
        else{
            ClockManager.currentTimeZone -= parseInt(items[1], 10);
        }
    }
}

ClockManager.update = function()
{
    ClockManager.currentDate = new Date();
    var utcTime = ClockManager.currentDate.getTime();

    for (var i = 0; i < ClockManager.regionsVector.length; i++) {
        var regionData = ClockManager.regionsVector[i];
        regionData.updateUTCTime(utcTime);
    }
}

ClockManager.formatTimeToString = function(time)
{
    var timeStr = time.toString();
    if (time < 10) timeStr = "0" + timeStr;
    return timeStr;
}

ClockManager.getRegionData = function(index)
{
    return ClockManager.regionsVector[index - 1];
}

ClockManager.getRegionDataByName = function(name)
{
    for (var i = 0; i < ClockManager.regionsVector.length; i++) {
        var region = ClockManager.regionsVector[i];
        if(region.nameId == name) return region;
    };
    return null;
}

ClockManager.getText = function(id)
{
    var text = ClockManager.engDict[id];
    return text;
}

ClockManager.getDaysCountInMonth = function(year, month)
{
    switch (month)
    {
        case 3:
        case 5:
        case 8:
        case 10:
            return 30;
        break;

        case 1:
            if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) return 29;
            else return 28;
        default:
    }
    return 31;
}
//Когда кто работает timezone, local begin time, time work
ClockManager.regionsVector.push(new RegionLocalData(1, "REGION_WELLINGTON", 12,  36000, 24300)); // 2value how many hours open
ClockManager.regionsVector.push(new RegionLocalData(2, "REGION_SYDNEY", 10,  36000, 21600));
ClockManager.regionsVector.push(new RegionLocalData(3, "REGION_TOKYO", 9,  32400, 21600));
ClockManager.regionsVector.push(new RegionLocalData(4, "REGION_SINGAPORE", 8,  32400, 28800));
ClockManager.regionsVector.push(new RegionLocalData(5, "REGION_SHANGHAI", 8,  34200, 19800));
ClockManager.regionsVector.push(new RegionLocalData(6, "REGION_DUBAI", 4,  36000, 17100)); //14400 14:00 now 17100 14:45
ClockManager.regionsVector.push(new RegionLocalData(7, "REGION_MOSCOW", 3,  35400, 31740)); //34200 9:30 now 35400 9:50 34200
ClockManager.regionsVector.push(new RegionLocalData(8, "REGION_RIYADH", 3,  36000, 19200));
ClockManager.regionsVector.push(new RegionLocalData(9, "REGION_JOHANNESB", 2,  32400, 28800));
ClockManager.regionsVector.push(new RegionLocalData(10, "REGION_ZURICH", 1,  32400, 30600));
ClockManager.regionsVector.push(new RegionLocalData(11, "REGION_FRANKFURT", 1,  32400, 30600)); 
ClockManager.regionsVector.push(new RegionLocalData(12, "REGION_LONDON", 0,  28800, 30300));
ClockManager.regionsVector.push(new RegionLocalData(13, "REGION_NEW_YORK", -5,  34200, 23400));
ClockManager.regionsVector.push(new RegionLocalData(14, "REGION_TORONTO", -5,  34200, 23400));
ClockManager.regionsVector.push(new RegionLocalData(15, "REGION_CHICAGO", -6,  30600, 23400));
ClockManager.regionsVector.push(new RegionLocalData(16, "REGION_HONG_KOHG", 8, 34200, 23400));
ClockManager.regionsVector.push(new RegionLocalData(17, "REGION_MUMBAI", 5.5, 33300, 22500));
ClockManager.regionsVector.push(new RegionLocalData(18, "REGION_SAU_PAULO", -3, 36000, 24900)); // 24900 6h55min to 16-55 
ClockManager.regionsVector.push(new RegionLocalData(19, "REGION_UTC", 0, 32400, 21600));

//Переход на летнее и зимнее время dst
ClockManager.getRegionData(1).initDST(new DstData(8, DstData.DAY_LAST), new DstData(3, DstData.DAY_FIRST), 1);
ClockManager.getRegionData(2).initDST(new DstData(9, DstData.DAY_FIRST), new DstData(3, DstData.DAY_FIRST), 1);
ClockManager.getRegionData(10).initDST(new DstData(2, DstData.DAY_LAST), new DstData(9, DstData.DAY_LAST), 1);
ClockManager.getRegionData(11).initDST(new DstData(2, DstData.DAY_LAST), new DstData(9, DstData.DAY_LAST), 1);
ClockManager.getRegionData(12).initDST(new DstData(2, DstData.DAY_LAST), new DstData(9, DstData.DAY_LAST), 1);
ClockManager.getRegionData(13).initDST(new DstData(2, DstData.DAY_SECOND), new DstData(10, DstData.DAY_FIRST), 1);
ClockManager.getRegionData(14).initDST(new DstData(2, DstData.DAY_SECOND), new DstData(10, DstData.DAY_FIRST), 1);
ClockManager.getRegionData(15).initDST(new DstData(2, DstData.DAY_SECOND), new DstData(10, DstData.DAY_FIRST), 1);
//ClockManager.getRegionData(18).initDST(new DstData(9, DstData.DAY_THREE), new DstData(1, DstData.DAY_THREE), 1); //no dst change for sp since 2020
//


//holidays 2025
ClockManager.getRegionData(2).setHolidays(["01.01","27.01","18.04","21.04","25.04","09.06","04.08","06.10","25.12","26.12"]); //SYDNEY
ClockManager.getRegionData(3).setHolidays(["01.01","02.01","03.01","13.01","11.02","24.02","20.03","29.04","05.05","21.07","11.08","15.09","23.09","13.10","03.11","24.11","31.12"]); //TOKYO
ClockManager.getRegionData(16).setHolidays(["01.01","29.01","30.01","31.01","04.04","18.04","21.04","01.05","05.05","01.07","01.10","07.10","29.10","25.12","26.12"]);//HONG KONG
ClockManager.getRegionData(5).setHolidays(["01.01","28.01","29.01","30.01","31.01","03.02","04.02","04.04","01.05","02.05","05.05","01.10","02.10","03.10","06.10","07.10","08.10"]);//SHANGHAI
ClockManager.getRegionData(17).setHolidays(["26.02","14.03","31.03","01.04","10.04","18.04","01.05","12.05","15.08","27.08","05.09","02.10","21.10","22.10","05.11","25.12"]);//MUMBAI
ClockManager.getRegionData(8).setHolidays(["23.02","11.03","30.03","31.03","01.04","02.04","03.04","08.06","09.06","10.06","11.06","23.09"]);//RIYADH
ClockManager.getRegionData(7).setHolidays(["01.01","02.01","03.01","06.01","07.01","08.01","01.05","02.05","08.05","09.05","12.06","13.06","03.11","04.11","31.12"]);//MOSCOW
ClockManager.getRegionData(11).setHolidays(["01.01","18.04","21.04","01.05","25.12","26.12"]);//FRANKFURT
ClockManager.getRegionData(12).setHolidays(["01.01","18.04","05.05","26.05","04.08","25.08","25.12","26.12"]);//LONDON
ClockManager.getRegionData(13).setHolidays(["01.01","09.01","20.01","17.02","18.04","26.05","19.06","04.07","01.09","27.11","25.12"]);//NY
ClockManager.getRegionData(14).setHolidays(["01.01","18.04","21.04","01.07","01.09","30.09","13.10","25.12","26.12"]);//TORONTO
ClockManager.getRegionData(18).setHolidays(["01.01","03.03","04.03","05.03","18.04","21.04","01.05","19.06","24.10","20.11","25.12"]);//SAO PAULO


//weekend
ClockManager.getRegionData(6).setWeekend([5,6]);
ClockManager.getRegionData(8).setWeekend([5,6]);
ClockManager.engDict =
{
    "REGION_WELLINGTON" : "WELLINGTON",
    "REGION_SYDNEY" : "SYDNEY",
    "REGION_TOKYO" : "TOKYO",
    "REGION_SINGAPORE" : "SINGAPORE",
    "REGION_SHANGHAI" : "SHANGHAI",
    "REGION_DUBAI" : "DUBAI",
    "REGION_MOSCOW" : "MOSCOW",
    "REGION_RIYADH" : "RIYADH",
    "REGION_JOHANNESB" : "JOHANNESBURG",
    "REGION_ZURICH" : "ZURICH",
    "REGION_FRANKFURT" : "FRANKFURT",
    "REGION_LONDON" : "LONDON",
    "REGION_NEW_YORK" : "NEW YORK",
    "REGION_TORONTO" : "TORONTO",
    "REGION_CHICAGO" : "CHICAGO",
    "REGION_UTC" : "UTC",
    "REGION_HONG_KOHG":"HONG KOHG",
    "REGION_MUMBAI":"MUMBAI",
    "REGION_SAU_PAULO":" SÃO PAULO"
};

// Create the canvas
var canvas = document.createElement("canvas");
div = document.getElementById("content");
if(div){
    var group = document.createElement("div");
    group.style.width="607px";
    group.style.height="auto";
    var ctxBg = canvas.getContext("2d");
    canvas.width = 607;
    canvas.height = 607;
    canvas.style.position = 'absolute';
    canvas.style.left = 0;
    canvas.style.top = 40;
    group.appendChild(canvas);
    canvas = document.createElement("canvas");
    var ctxSectors = canvas.getContext("2d");
    canvas.width = 607;
    canvas.height = 607;
    canvas.style.position = 'absolute';
    canvas.style.left = 0;
    canvas.style.top = 40;
    group.appendChild(canvas);
    canvas = document.createElement("canvas");
    var ctxClock = canvas.getContext("2d");
    canvas.width = 607;
    canvas.height = 607;
    canvas.style.position = 'absolute';
    canvas.style.left = 0;
    canvas.style.top = 40;
    group.appendChild(canvas);
    div.appendChild(group);
    div.insertBefore(group, document.getElementById("cities"));

    var isRunning = true;

    var hAngle = 0;
    var mAngle = 0;
    var sAngle = 0;

    // images
    var bgImg = new Image();
    var dialImg = new Image();
    var hImg = new Image();
    var graySectors = new Image();
    var linesImg = new Image();
    var mImg = new Image();
    var sImg = new Image();
}

var imgArr = {};

imgArr["REGION_NEW_YORK"] = new SectorImage("ny", 303, 100, 7, 195, 295,700,0, "NEW-YORK", "ny");
imgArr["REGION_TORONTO"] = new SectorImage("toronto", 298, 100, 7, 203, 396, 700,0, "TORONTO");
imgArr["REGION_CHICAGO"] = new SectorImage("chicago", 301, 102, 3, 212, 491, 700,0, "CHICAGO");
imgArr["REGION_SAU_PAULO"] = new SectorImage("spaulo", 300, 88, 4, 228, 190, 700,0, "SAO-PAULO");
imgArr["REGION_WELLINGTON"] = new SectorImage("well", 305, 75, 5, 230, 0, 660,0,"WELLINGTON", "well");
imgArr["REGION_SYDNEY"] = new SectorImage("sydney", 308, 96, 6, 195, 120, 660,0,"SYDNEY", "sydney");
imgArr["REGION_DUBAI"] = new SectorImage("dubai", 305, 84, 6, 232, 93, 680,0,"DUBAI");
imgArr["REGION_RIYADH"] = new SectorImage("riyadh", 307, 118, 9, 206, 420, 680,0,"RIYADH", "riyadh");
imgArr["REGION_MUMBAI"] = new SectorImage("mumbai", 302, 118, 6, 202, 0, 680,0,"MUMBAI");
imgArr["REGION_SINGAPORE"] = new SectorImage("singapore", 302, 134, 6, 200, 270, 660,0,"SINGAPORE", "singapore");
imgArr["REGION_HONG_KOHG"] = new SectorImage("hk", 368, 163, 0, 0, 375, 660,-0.5,"HONG-KOHG", "hk");
imgArr["REGION_SHANGHAI"] = new SectorImage("shanghai", 300, 168, 6, 160, 481, 660,0,"SHANGHAI", "shanghai");
imgArr["REGION_TOKYO"] = new SectorImage("tokyo", 307, 186, 20, 60, 200, 660,1,"TOKYO", "tokyo");
imgArr["REGION_JOHANNESB"] = new SectorImage("johannes", 331, 224, 10, 108, 169, 680,0,"JOHANNESBURG");
imgArr["REGION_MOSCOW"] = new SectorImage("moscow", 306, 203,8, 119, 324, 680,0,"MOSCOW");
imgArr["REGION_FRANKFURT"] = new SectorImage("frankfurt", 318, 245, 12, 83, 80, 700,0,"FRANKFURT");
imgArr["REGION_ZURICH"] = new SectorImage("zurich", 309, 272, 20, 63, 0, 700,0,"ZURICH");
imgArr["REGION_LONDON"] = new SectorImage("london", 304, 270, 15, 56, 496, 680,0,"LONDON", "london");
//function checkRegion(){
//	if(typeof getRegionById === 'function'){
//		if(getRegionById(18).checkDst(new Date().getTime()))
//		{
//		   getRegionById(18).workTime-=3600;
//		   imgArr["REGION_SAU_PAULO"].path = 'spaulowt';
//		}
//	}
//	else{
//		setTimeout(checkRegion, 250);
//	}
//}
//checkRegion();
//$(document).ready(function(){
//
//
//});
//no dst change for spaulo since 2020

var zones = new Array();
zones[1] = new ZoneImage("zone1", 0, 0, 0, 0, 0);
zones[2] = new ZoneImage("zone2", 0, 0, 0, 0, 0);
zones[3] = new ZoneImage("zone3",0, 0, 0 , 0, 0);
zones[4] = new ZoneImage("zone4", 0, 0, 0, 0, 0);
zones[5] = new ZoneImage("zone5", 0, 0, 0, 0, 0);

function init(){
    $.get("/getUtc.php").done(function (data){
        ClockManager.utcCorrect = new Date(data*1000).getTime() - new Date().getTime();
        loadImages();
        startGameTimer();
        console.log("use server time");
    }).fail(function (){
        console.log("use localtime");
        loadImages();
        startGameTimer();
    });

}
var isDrawBase = false;
function loadImages()
{
    var folder = (getCookie('theme')=='dark'? "market_clock/mcl/dark_new/":'market_clock/mcl/light_new/')
    hImg.src = folder+"h.png";
    mImg.src = folder+"m.png";
    sImg.src = folder+"s.png";
    graySectors.src = folder+"zone_gray.png"
    linesImg.src = folder+"lines.png"
    dialImg.src = folder+"dial.png";

    bgImg.src = folder+"bg.png";
    update();
}

//Start game timer, i.e. setTimeout that calls itself taking into account the
//actual real difference in time. This is better than
function startGameTimer()
{
    var start = new Date().getTime();
    var time = 0;

    function timer()
    {
        time += 1000;
        var diff = (new Date().getTime() - start) - time;
        if(isRunning)
        {
            update();
            setTimeout(timer, (1000 - diff));
        }
    }

    if(isRunning)
        setTimeout(timer, 500);
}

function update()
{
    updateTime();
    //ctxBg.clearRect(0, 0, canvas.width, canvas.height);
    ctxBg.fillStyle = getCookie('theme')==='light'? "rgb(248,248,248)":"rgb(237,240,243)";
    //ctxBg.fillRect(0, 0, canvas.width, canvas.height);
    //Clear the screen (i.e. a draw a clear rectangle the size of the screen)
    ctxClock.clearRect(0, 0, canvas.width, canvas.width);
    ctxSectors.clearRect(0, 0, canvas.width, canvas.width);

    ctxBg.drawImage(bgImg, 0, 0);
    ctxBg.save();
    ctxBg.translate(303,303);
    ctxBg.rotate(DegToRad((((ClockManager.currentTimeZone*60) / 86400) * 360)))
    ctxBg.translate(-303,-303);
    ctxBg.drawImage(graySectors, 0, 0);
    ctxBg.restore();

    checkActiveZone();

    ctxBg.drawImage(dialImg, 0, 0);

    updateRegionsSectors();
    ctxSectors.save();
    ctxSectors.translate(303,303);
    ctxSectors.rotate(DegToRad((((ClockManager.currentTimeZone*60) / 86400) * 360)));
    ctxSectors.translate(-303,-303);
    //ctxSectors.drawImage(linesImg,0,0);
    ctxSectors.restore();
    //----- hours -----
    ctxClock.save();
    ctxClock.translate(303,303)
    ctxClock.rotate(DegToRad(hAngle));
    ctxClock.translate(-303,-303)
    ctxClock.drawImage(hImg, 0, 0);
    ctxClock.restore();

    //----- minutes -----
    ctxClock.save();
    ctxClock.translate(303, 303);
    ctxClock.rotate(DegToRad(mAngle));
    ctxClock.translate(-303,-303)
    ctxClock.drawImage(mImg, 0, 0);

    ctxClock.restore();

    //----- seconds -----
    ctxClock.save();
    ctxClock.translate(303,303)
    ctxClock.rotate(DegToRad(sAngle));
    ctxClock.translate(-303,-303)
    ctxClock.drawImage(sImg, 0, 0);

    ctxClock.restore();
}

function updateTime()
{
    ClockManager.update();

    var date = new Date(ClockManager.currentDate.getTime() + ClockManager.utcCorrect + (ClockManager.currentTimeZone * 60000));

    var sec = date.getUTCSeconds();
    var min = (date.getUTCMinutes() + sec/60);//+ClockManager.currentTimeZone%60;
    if(min>=60)
    {
        min -=60;
    }
    var hours = date.getUTCHours() + min/60; //+ parseInt(ClockManager.currentTimeZone/60,10);
    if(hours>=23)
    {
        hours-=24;
    }
    var h = hours>=10?parseInt(hours):"0"+parseInt(hours, 10);
    var m = min>=10?parseInt(min):"0"+parseInt(min, 10);
    var s = sec>=10?sec:"0"+sec;
    date.getUTCSeconds()
    var minutes = Math.abs(ClockManager.currentTimeZone%60);
    minutes = minutes<10?"0"+minutes:minutes;
    var hoursZone = parseInt( ClockManager.currentTimeZone/60, 10);
    hoursZone = hoursZone<0?hoursZone:"+"+hoursZone;
    document.getElementById("utc_clock").innerHTML="UTC"+hoursZone+":"+minutes+" "+h+":"+m+":"+s;
    hAngle = 360 * (hours / 24);
    mAngle = 360 * (min / 60);
    sAngle = 360 * (sec / 60);
}

function updateRegionsSectors()
{
    //draw ny points

    for (var i = 0; i < ClockManager.REGIONS_COUNT; i++)
    {
        var data = ClockManager.regionsVector[i];
        if (data) {
            var sector = imgArr[data.nameId];
            if (sector) {
                var status = data.getMarketStatus();
                var imgSector = sector.getImage(status, false);
                if(imgSector) {
                    var beginTime = data.getMarketStartTimeUTC()+ClockManager.currentTimeZone*60;
                    if(beginTime>=86400)
                    {
                        beginTime-=86400;
                    }
                    else if(beginTime<0)
                    {
                        beginTime+=86400;
                    }
                    var angle =  (beginTime / 86400) * 360 + sector.dopAngle;

                    ctxSectors.save();
                    ctxSectors.translate(303,303);
                    ctxSectors.rotate(DegToRad(angle));
                    ctxSectors.translate(-303,-303);
                    ctxSectors.drawImage(imgSector, 0, 0);
                    ctxSectors.restore();
                }
                document.getElementById(sector.name).style.color = status ? "#FF8800":"#757575";
            }
        }
    }
    //update points
    //draw ny
    drawPointSector(imgArr[ClockManager.regionsVector[12].nameId], 12);
    for (var i = 0; i < ClockManager.REGIONS_COUNT; i++)
    {

        var sector = imgArr[ClockManager.regionsVector[i].nameId]
        if(sector.pointName && i != 12)
        {
            drawPointSector(sector, i);
        }
    }
}
function drawPointSector(sector, i)
{
    if(!sector)
        return;
    var regionData = ClockManager.getRegionData(i+1);
    var beginTime = 0;
    if(i==12||i==13||i==14||i==17||i== 11)
    {
        beginTime = (!regionData.checkDst(new Date().getTime())? (ClockManager.getRegionData(i+1).dstOffset * 3600):0)+(ClockManager.currentTimeZone*60);
    }
    else
    {
        beginTime = (regionData.checkDst(new Date().getTime())? -(ClockManager.getRegionData(i+1).dstOffset * 3600):0)+(ClockManager.currentTimeZone*60);
    }
    if(beginTime>=86400)
    {
        beginTime-=86400;
    }
    else if(beginTime<0)
    {
        beginTime+=86400;
    }
    var angle =  (beginTime / 86400) * 360;
    ctxSectors.save();
    ctxSectors.translate(303,303);
    ctxSectors.rotate(DegToRad(angle));
    ctxSectors.translate(-303,-303);
    ctxSectors.drawImage(sector.getImagePoint(), 0, 0);
    ctxSectors.restore();
}
function checkActiveZone()
{
    var date = new Date(ClockManager.currentDate.getTime() + ClockManager.utcCorrect);
    var seconds = date.getUTCHours()*60*60 + date.getUTCMinutes()*60 + date.getUTCSeconds();

    var regionData = ClockManager.getRegionData(13); //NEW YORK
    var dstActive = regionData.checkDst(date.getTime());

    var zone = 0; // empty zone
    var zone_dop = 0; // empty zone
    var angle = (((ClockManager.currentTimeZone*60) / 86400) * 360);
    if (0 < seconds && seconds < 7200) zone = 1;
    if (25200 < seconds && seconds < 39600) zone = 2;
    if (45000 < seconds && seconds < 61200) zone = 3;
    if (dstActive) {
        if (68400 < seconds && seconds < 72000) zone = 4;
    }
    else {
        if (68400 < seconds && seconds < 75600) {
            zone = 4;
            zone_dop = 5;
        }
    }

    if (zone > 0) {
        var zoneImg = zones[zone];
        var img = zoneImg.getImage();
        if (img) {
            ctxBg.save();
            ctxBg.translate(303,303);
            ctxBg.rotate(DegToRad(angle));
            ctxBg.translate(-303,-303);
            ctxBg.drawImage(img, 0, 0);
            ctxBg.restore();
        }
        if (zone_dop > 0)
        {
            zoneImg = zones[zone_dop];
            img = zoneImg.getImage();
            if (img) {

                ctxBg.save();
                ctxBg.translate(303,303);
                ctxBg.rotate(DegToRad(angle));
                ctxBg.translate(-303,-303);
                ctxBg.drawImage(img, 0, 0);
                ctxBg.restore();
            }
        }
    }
}

function DegToRad(d)
{
    // Converts degrees to radians
    return d * 0.0174532925199432957;
}

function ZoneImage(path, x, y, cx, cy, angle ) {
    this.path = path;
    this.x = x;
    this.y = y;
    this.cx = cx;
    this.cy = cy;
    this.angle = angle;
}

ZoneImage.prototype.getImage = function()
{
    if(this.image) {
        return this.image;
    }
    else {
        this.image = new Image();
        this.image.src = (getCookie('theme')=='dark'? "market_clock/mcl/dark_new/":'market_clock/mcl/light_new/') + this.path + ".png";
    }
}

function SectorImage(path, sx, sy, scx, scy, cx, cy, angle, name, pointName)
{
    this.path = path;
    this.name = name;
    this.sx = sx;
    this.sy = sy;

    this.scx = scx;
    this.scy = scy;

    this.cx = cx;
    this.cy = cy;

    this.dopAngle = angle;
    this.pointName = pointName;
}

SectorImage.prototype.getImagePoint = function(active, isCity)
{
    var postfix = ".png";

    var imgStr = "point";

    var pathImg = (getCookie('theme')=='dark'? "market_clock/mcl/dark_new/lines_":'market_clock/mcl/light_new/lines_') + this.pointName + postfix;

    if(this[imgStr]) {
        return this[imgStr];
    }
    else {
        this[imgStr] = new Image();
        this[imgStr].src = pathImg;
        return     this[imgStr];
    }

    return null;
}
SectorImage.prototype.getImage = function(active, isCity)
{
    var pathPrefix = this.getSectorFolder();//"market_clock/mcl/light_new/sectors/";
    var postfix = ".png";

    var imgStr;

    if(active) {
        postfix = "_or" + postfix;
        imgStr = "active";
    }
    else {
        imgStr = "deactive";
    }

    if(isCity) {
        pathPrefix = "cities/";
        imgStr += "_city";
    }
    var pathImg = (getCookie('theme')=='dark'? "market_clock/mcl/dark_new/":'market_clock/mcl/light_new/') + pathPrefix + this.path + postfix;
    if(this[imgStr]) {
        return this[imgStr];
    }
    else {
        this[imgStr] = new Image();
        this[imgStr].src = pathImg;
    }

    return null;
}
SectorImage.prototype.getSectorFolder = function ()
{
    switch(this.path)
    {
        case "well":
            return ClockManager.currentTimeZone>= -12 * 60 && ClockManager.currentTimeZone<=-7 * 60 || ClockManager.currentTimeZone>= 5.5 * 60 && ClockManager.currentTimeZone<=14*60?'market_clock/mcl/light_new/sectors_upsdwn/':'market_clock/mcl/light_new/sectors/';
         break;
        case "sydney":
            return ClockManager.currentTimeZone>= -12 * 60 && ClockManager.currentTimeZone<=-8 * 60 || ClockManager.currentTimeZone>= 4.5 * 60 && ClockManager.currentTimeZone<=14*60?'market_clock/mcl/light_new/sectors_upsdwn/':'market_clock/mcl/light_new/sectors/';
         break;
        case "tokyo":
            return ClockManager.currentTimeZone>= -12 * 60 && ClockManager.currentTimeZone<=-10 * 60 || ClockManager.currentTimeZone>= 3.5 * 60 && ClockManager.currentTimeZone<=13*60?'market_clock/mcl/light_new/sectors_upsdwn/':'market_clock/mcl/light_new/sectors/';
         break;
        case "singapore":
            return ClockManager.currentTimeZone>= 2 * 60 && ClockManager.currentTimeZone<=12 * 60?'market_clock/mcl/light_new/sectors_upsdwn/':'market_clock/mcl/light_new/sectors/';
         break;
        case "shanghai":
        case "hk":
            return ClockManager.currentTimeZone== -12 * 60  || ClockManager.currentTimeZone>= 2 * 60 && ClockManager.currentTimeZone<=12.75 * 60?'market_clock/mcl/light_new/sectors_upsdwn/':'market_clock/mcl/light_new/sectors/';
         break;
        case "mumbai":
            return ClockManager.currentTimeZone>= 2 * 60 && ClockManager.currentTimeZone<=11 * 60?'market_clock/mcl/light_new/sectors_upsdwn/':'market_clock/mcl/light_new/sectors/';
         break;
        case "riyadh":
            return ClockManager.currentTimeZone>= -12 * 60 && ClockManager.currentTimeZone<=-5 * 60 || ClockManager.currentTimeZone>= 10 * 60 && ClockManager.currentTimeZone<=14*60?'market_clock/mcl/light_new/sectors_upsdwn/':'market_clock/mcl/light_new/sectors/';
         break;
        case "dubai":
            return ClockManager.currentTimeZone>= -12 * 60 && ClockManager.currentTimeZone<=-3 * 60 || ClockManager.currentTimeZone>= 11 * 60 && ClockManager.currentTimeZone<=14*60?'market_clock/mcl/light_new/sectors_upsdwn/':'market_clock/mcl/light_new/sectors/';
         break;
        case "london":
        case "zurich":
        case "frankfurt":
        case "moscow":
        case "johannes":
            return ClockManager.currentTimeZone>= -12 * 60 && ClockManager.currentTimeZone<=-6 * 60 || ClockManager.currentTimeZone>= 7 * 60 && ClockManager.currentTimeZone<=14*60?'market_clock/mcl/light_new/sectors_upsdwn/':'market_clock/mcl/light_new/sectors/';
         break;
        case "ny":
        case "toronto":
        case "chicago":
        case "spaulo":
            return ClockManager.currentTimeZone>= -12 || ClockManager.currentTimeZone>= 2 * 60 && ClockManager.currentTimeZone<=12*60?'market_clock/mcl/light_new/sectors_upsdwn/':'market_clock/mcl/light_new/sectors/';
         break;
    }
}

function getCookie(name) {

    var matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ))
    return matches ? decodeURIComponent(matches[1]) : undefined
}

if(div){
    init();
}
/*imgArr["REGION_NEW_YORK"] = new SectorImage("ny", 303, 100, 7, 195, 295,700,0, "NEW-YORK", "ny");
imgArr["REGION_TORONTO"] = new SectorImage("toronto", 298, 100, 7, 203, 396, 700,0, "TORONTO");
imgArr["REGION_CHICAGO"] = new SectorImage("chicago", 301, 102, 3, 212, 491, 700,0, "CHICAGO");
imgArr["REGION_SAU_PAULO"] = new SectorImage("spaulo", 300, 88, 4, 228, 190, 700,0, "SAO-PAULO");
imgArr["REGION_WELLINGTON"] = new SectorImage("well", 305, 75, 5, 230, 0, 660,0,"WELLINGTON", "well");
imgArr["REGION_SYDNEY"] = new SectorImage("sydney", 308, 96, 6, 195, 120, 660,0,"SYDNEY", "sydney");
imgArr["REGION_DUBAI"] = new SectorImage("dubai", 305, 84, 6, 232, 93, 680,0,"DUBAI");
imgArr["REGION_RIYADH"] = new SectorImage("riyadh", 307, 118, 9, 206, 420, 680,0,"RIYADH", "riyadh");
imgArr["REGION_MUMBAI"] = new SectorImage("mumbai", 302, 118, 6, 202, 0, 680,0,"MUMBAI");
imgArr["REGION_SINGAPORE"] = new SectorImage("singapore", 302, 134, 6, 200, 270, 660,0,"SINGAPORE", "singapore");
imgArr["REGION_HONG_KOHG"] = new SectorImage("hk", 368, 163, 0, 0, 375, 660,-0.5,"HONG-KOHG", "hk");
imgArr["REGION_SHANGHAI"] = new SectorImage("shanghai", 300, 168, 6, 160, 481, 660,0,"SHANGHAI", "shanghai");
imgArr["REGION_TOKYO"] = new SectorImage("tokyo", 307, 186, 20, 60, 200, 660,1,"TOKYO", "tokyo");
imgArr["REGION_JOHANNESB"] = new SectorImage("johannes", 331, 224, 10, 108, 169, 680,0,"JOHANNESBURG");
imgArr["REGION_MOSCOW"] = new SectorImage("moscow", 306, 203,8, 119, 324, 680,0,"MOSCOW");
imgArr["REGION_FRANKFURT"] = new SectorImage("frankfurt", 318, 245, 12, 83, 80, 700,0,"FRANKFURT");
imgArr["REGION_ZURICH"] = new SectorImage("zurich", 309, 272, 20, 63, 0, 700,0,"ZURICH");
imgArr["REGION_LONDON"] = new SectorImage("london", 304, 270, 15, 56, 496, 680,0,"LONDON", "london");*/
