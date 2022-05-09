/**
 * Chad Williamson - Final Project
 */

// Markers are a global variable
var markers = [
    {id: 1, name: "Sofi Stadium", location: "Inglewood, California", x: "17.1%", y: "58%", teams: ["Los Angeles Rams, Los Angeles Chargers"]},
    {id: 2, name: "Levi's Stadium", location: "Santa Clara, California", x: "13%", y: "42%", teams: ["San Francisco 49ers"]},
    {id: 3, name: "Lumen Field", location: "Seattle, Washington", x: "17.7%", y: "5%", teams: ["Seattle Seahawks"]},
    {id: 4, name: "Allegiant Stadium", location: "Paradise, Nevada", x: "21.9%", y: "50.7%", teams: ["Las Vegas Raiders"]},
    {id: 5, name: "State Farm Stadium", location: "Glendale, Arizona", x: "25.9%", y: "63.7%", teams: ["Arizona Cardinals"]},
    {id: 6, name: "Empower Field at Mile High", location: "Denver, Colorado", x: "37.5%", y: "44%", teams: ["Denver Broncos"]},
    {id: 7, name: "Arrowhead Field", location: "Kansas City, Missouri", x: "53%", y: "45.2%", teams: ["Kansas City Chiefs"]},
    {id: 8, name: "Lucas Oil Stadium", location: "Indianapolis, Indiana", x: "65.2%", y: "43%", teams: ["Indianapolis Colts"]},
    {id: 9, name: "NRG Stadium", location: "Houston, Texas", x: "52%", y: "83%", teams: ["Houston Texans"]},
    {id: 10, name: "Nissan Stadium", location: "Nashville, Tennessee", x: "64.8%", y: "57%", teams: ["Tennessee Titans"]},
    {id: 11, name: "TIAA Bank Field", location: "Jacksonville, Florida", x: "74%", y: "77%", teams: ["Jacksonville Jaguars"]},
    {id: 12, name: "Raymond James Stadium", location: "Tampa, Florida", x: "73.9%", y: "85%", teams: ["Tampa Bay Buccaneers"]},
    {id: 13, name: "Caesars Superdome", location: "New Orleans, Louisiana", x: "60.8%", y: "81%", teams: ["New Orleans Saints"]},
    {id: 14, name: "Mercedez Benz Stadium", location: "Atlanta, Georgia", x: "69.8%", y: "65%", teams: ["Atlanta Falcons"]},
    {id: 15, name: "Bank of America Stadium", location: "Charlotte, North Carolina", x: "75%", y: "57.7%", teams: ["Carolina Panthers"]},
    {id: 16, name: "Soldier Field", location: "Chicago, Illinois", x: "62.4%", y: "36%", teams: ["Chicago Bears"]},
    {id: 17, name: "Ford Field", location: "Detriot, Michigan", x: "68.6%", y: "32%", teams: ["Detriot Lions"]},
    {id: 18, name: "Lambeau Field", location: "Green Bay, Wisconsin", x: "61.4%", y: "26%", teams: ["Green Bay Packers"]},
    {id: 19, name: "U.S. Bank Stadium", location: "Minneapolis, Minnesota", x: "54.6%", y: "25.1%", teams: ["Minnesota Vikings"]},
    {id: 20, name: "Paul Brown Stadium", location: "Cincinnati, Ohio", x: "68%", y: "44%", teams: ["Cincinnati Bengals"]},
    {id: 21, name: "FirstEnergy Stadium", location: "Cleveland, Ohio", x: "71%", y: "35%", teams: ["Cleveland Browns"]},
    {id: 22, name: "Heinz Field", location: "Pittsburgh Pennsylvania", x: "74%", y: "38%", teams: ["Pittsburgh Steelers"]},
    {id: 23, name: "M&T Bank Stadium", location: "Baltimore, Maryland", x: "78.7%", y: "40.1%", teams: ["Baltimore Ravens"]},
    {id: 24, name: "Highmark Stadium", location: "Orchard Park, New York", x: "75%", y: "28%", teams: ["Buffalo Bills"]},
    {id: 25, name: "MetLife Stadium", location: "East Rutherford, New Jersey", x: "82.2%", y: "31.9%", teams: ["New York Jets", "New York Giants"]},
    {id: 26, name: "Gillette Stadium", location: "Foxborough, Massachusetts", x: "85.2%", y: "26%", teams: ["New England Patriots"]},
    {id: 27, name: "Hard Rock Stadium", location: "Miami Gardens, Florida", x: "77.7%", y: "92.6%", teams: ["Miami Dolphins"]},
    {id: 28, name: "AT&T Stadium", location: "Arlington, Texas", x: "50%", y: "70.6%", teams: ["Dallas Cowboys"]},
    {id: 29, name: "FedEx Field", location: "Landover, Maryland", x: "78%", y: "42.1%", teams: ["Washington Commanders"]},
    {id: 30, name: "Lincoln Financial Field", location: "Philadelphia, Pennsylvania", x: "80.2%", y: "36.7%", teams: ["Philidelphia Eagles"]},
];

// Runs on page load
(function () {
    // Place markers on map
    drawMarkers();
    document.getElementById("modal-close").addEventListener("click", hideModal, false);
})();

function drawMarkers() {
    var map = document.getElementById("content");
    markers.forEach(marker =>{ 
        let circle = document.createElement('div');
        circle.id = "marker_" + marker.id;
        circle.classList.add("map-marker")
        circle.style.position = "absolute";
        circle.style.width = "1vw";
        circle.style.height = "1vw";
        circle.style.top = marker.y;
        circle.style.left = marker.x;
        circle.style.borderRadius = "1vw";
        circle.style.backgroundColor = "#E0E1DD";
        circle.style.cursor = "pointer";
        circle.addEventListener("mouseover", markerOnHover, false);
        map.append(circle);
    });

};

function markerOnHover(e) {
    let map = document.getElementById("content");
    var rect = map.getBoundingClientRect();
    let id = e.target.id;
    id = id.split("_")[1];
    let item = markers[id - 1];
    let popup = document.createElement('div');
    popup.style.position = "absolute";
    popup.id = "p_" + (id - 1);
    popup.classList.add("pop-up");
    popup.style.border = "3px solid black";
    let size = getScreenSize();
    let x = (size.x * .18)
    let y = (size.x * .07);
    popup.style.width = x + "px";
    popup.style.height = y + "px";
    let topShift = (e.clientY >= (size.y / 2)) ? 3 : 1;
    let leftShift = (e.clientX >= (size.x / 2)) ? 3 : 1;
    let top = ((e.clientY - 0) - (topShift * y / 4));
    let left = ((e.clientX - rect.left) - (leftShift * x / 4))
    popup.style.top = top + "px";
    popup.style.left = left + "px";
    popup.style.backgroundColor = "#040406";
    popup.style.border = "2px solid white";
    popup.style.zIndex = 100;
    popup.addEventListener("mouseleave", popupOnLeave, false);
    popup.style.cursor = "pointer";
    popup.style.opacity = 0.8;
    document.body.prepend(popup); 
    
    let fieldName = document.createElement("span");
    fieldName.classList.add("pop-up-field-name");
    fieldName.innerHTML = item.name;
    popup.appendChild(fieldName);

    let location = document.createElement("span");
    location.classList.add("pop-up-location");
    location.innerHTML = item.location;
    popup.appendChild(location);

    let link = document.createElement("span");
    link.classList.add("pop-up-link");
    link.innerHTML = "Click to view stadium data";
    popup.appendChild(link);
    popup.addEventListener("click", showModal, false);
}

function getScreenSize() {
    // From: https://stackoverflow.com/questions/3437786/get-the-size-of-the-screen-current-web-page-and-browser-window
    var win = window,
    doc = document,
    docElem = doc.documentElement,
    body = doc.getElementsByTagName('body')[0],
    x = win.innerWidth || docElem.clientWidth || body.clientWidth,
    y = win.innerHeight|| docElem.clientHeight|| body.clientHeight;
    return {x: x, y: y};
}

function popupOnLeave(e) {
    let elements = document.getElementsByClassName("pop-up");
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

var data = [
    {
        id: 1, 
        name: "Sofi Stadium", 
        location: "Inglewood, California", 
        teams: ["Los Angeles Rams, Los Angeles Chargers"],
        surface: "Turf",
        roof: "Closed",
        opened: "2020",
        cost: "$5,000,000,000",
        capacity: "70,000",
        fanRanking: "2",
        ticketPrice: "$90.00",
        concessionPrice: "$11.00",
        parkingPrice: "$133"
    },
    {
        id: 2, 
        name: "Levi's Stadium", 
        location: "Santa Clara, California", 
        teams: ["San Francisco 49ers"],
        surface: "Grass Mixture",
        roof: "Open",
        opened: "2014",
        cost: "$1,200,000,000",
        capacity: "68,500",
        fanRanking: "25",
        ticketPrice: "$139.71",
        concessionPrice: "$11.50",
        parkingPrice: "$104"
    },
        
    {
        id: 3, 
        name: "Lumen Field", 
        location: "Seattle, Washington", 
        teams: ["Seattle Seahawks"],
        surface: "Turf",
        roof: "Open",
        opened: "2002",
        cost: "$430,000,000",
        capacity: "69,000",
        fanRanking: "4",
        ticketPrice: "$117.86",
        concessionPrice: "$10.50",
        parkingPrice: "$112"
    },
    {
        id: 4, 
        name: "Allegiant Stadium", 
        location: "Paradise, Nevada", 
        teams: ["Las Vegas Raiders"],
        surface: "Bermuda Grass",
        roof: "Closed",
        opened: "2020",
        cost: "$1,800,000,000",
        capacity: "65,000",
        fanRanking: "5",
        ticketPrice: "$153.47",
        concessionPrice: "$9.00",
        parkingPrice: "$90"
    },
    {
        id: 5, 
        name: "State Farm Stadium", 
        location: "Glendale, Arizona", 
        teams: ["Arizona Cardinals"],
        surface: "Bermuda Grass",
        roof: "Retractable",
        opened: "2006",
        cost: "$455,000,000",
        capacity: "63,400",
        fanRanking: "12",
        ticketPrice: "$84.83",
        concessionPrice: "$6.50",
        parkingPrice: "$18"
    },
    {
        id: 6, 
        name: "Empower Field at Mile High", 
        location: "Denver, Colorado", 
        teams: ["Denver Broncos"],
        surface: "Kentucky Bluegrass",
        roof: "Open",
        opened: "2001",
        cost: "$401,000,000",
        capacity: "76,125",
        fanRanking: "14",
        ticketPrice: "$104.99",
        concessionPrice: "$7.50",
        parkingPrice: "$115"
    },
    {
        id: 7, 
        name: "Arrowhead Field", 
        location: "Kansas City, Missouri", 
        teams: ["Kansas City Chiefs"],
        surface: "Bermuda Grass",
        roof: "Open",
        opened: "1972",
        cost: "$43,000,000",
        capacity: "76,416",
        fanRanking: "8",
        ticketPrice: "$94.63",
        concessionPrice: "$8.50",
        parkingPrice: "$61"
    },
    {
        id: 8, 
        name: "Lucas Oil Stadium", 
        location: "Indianapolis, Indiana", 
        teams: ["Indianapolis Colts"],
        surface: "Turf",
        roof: "Retractable",
        opened: "2008",
        cost: "$720,000,000",
        capacity: "67,000",
        fanRanking: "11",
        ticketPrice: "$95.98",
        concessionPrice: "$8.00",
        parkingPrice: "$122"
    },
    {
        id: 9, 
        name: "NRG Stadium", 
        location: "Houston, Texas", 
        teams: ["Houston Texans"],
        surface: "Turf",
        roof: "Retractable",
        opened: "2002",
        cost: "$352,000,000",
        capacity: "72,220",
        fanRanking: "18",
        ticketPrice: "$118.07",
        concessionPrice: "$6.00",
        parkingPrice: "$33"
    },
    {
        id: 10, 
        name: "Nissan Stadium", 
        location: "Nashville, Tennessee", 
        teams: ["Tennessee Titans"],
        surface: "Bermuda Grass",
        roof: "Open",
        opened: "1999",
        cost: "$290,000,000",
        capacity: "69,143",
        fanRanking: "23",
        ticketPrice: "$92.16",
        concessionPrice: "$10.50",
        parkingPrice: "$161"
    },
    {
        id: 11, 
        name: "TIAA Bank Field", 
        location: "Jacksonville, Florida", 
        teams: ["Jacksonville Jaguars"],
        surface: "Bermuda Grass",
        roof: "Open",
        opened: "1995",
        cost: "$121,000,000",
        capacity: "69,132",
        fanRanking: "26",
        ticketPrice: "$80.09",
        concessionPrice: "$11.50",
        parkingPrice: "$143"
    },
    {
        id: 12, 
        name: "Raymond James Stadium", 
        location: "Tampa, Florida", 
        teams: ["Tampa Bay Buccaneers"],
        surface: "Bermuda Grass",
        roof: "Open",
        opened: "1998",
        cost: "$194,000,000",
        capacity: "65,890",
        fanRanking: "17",
        ticketPrice: "$89.48",
        concessionPrice: "$11.50",
        parkingPrice: "$52"
    },
    {
        id: 13, 
        name: "Caesars Superdome", 
        location: "New Orleans, Louisiana", 
        teams: ["New Orleans Saints"],
        surface: "Turf",
        roof: "Closed",
        opened: "1975",
        cost: "$134,000,000",
        capacity: "73,208",
        fanRanking: "10",
        ticketPrice: "$104.50",
        concessionPrice: "$11.50",
        parkingPrice: "$138"
    },
    {
        id: 14, 
        name: "Mercedez Benz Stadium", 
        location: "Atlanta, Georgia", 
        teams: ["Atlanta Falcons"],
        surface: "Turf",
        roof: "Retractable",
        opened: "2017",
        cost: "$1,600,000,000",
        capacity: "71,000",
        fanRanking: "7",
        ticketPrice: "$106.06",
        concessionPrice: "$5.00",
        parkingPrice: "$61"
    },
    {
        id: 15, 
        name: "Bank of America Stadium", 
        location: "Charlotte, North Carolina", 
        teams: ["Carolina Panthers"],
        surface: "Turf",
        roof: "Open",
        opened: "1996",
        cost: "$248,000,000",
        capacity: "75,523",
        fanRanking: "27",
        ticketPrice: "$109.81",
        concessionPrice: "$10.50",
        parkingPrice: "$108"
    },
    {
        id: 16, 
        name: "Soldier Field", 
        location: "Chicago, Illinois", 
        teams: ["Chicago Bears"],
        surface: "Kentucky Bluegrass",
        roof: "Open",
        opened: "1924",
        cost: "$690,000,000",
        capacity: "61,500",
        fanRanking: "16",
        ticketPrice: "$122.90",
        concessionPrice: "$11.00",
        parkingPrice: "$154"
    },
    {
        id: 17, 
        name: "Ford Field", 
        location: "Detriot, Michigan", 
        teams: ["Detriot Lions"],
        surface: "Turf",
        roof: "Closed",
        opened: "2002",
        cost: "$500,000,000",
        capacity: "65,000",
        fanRanking: "22",
        ticketPrice: "$91.89",
        concessionPrice: "$5.00",
        parkingPrice: "$182"
    },
    {
        id: 18, 
        name: "Lambeau Field", 
        location: "Green Bay, Wisconsin", 
        teams: ["Green Bay Packers"],
        surface: "Hybrid",
        roof: "Open",
        opened: "1957",
        cost: "$960,000",
        capacity: "81,441",
        fanRanking: "1",
        ticketPrice: "$128.93",
        concessionPrice: "$9.50",
        parkingPrice: "$239"
    },
    {
        id: 19, 
        name: "U.S. Bank Stadium", 
        location: "Minneapolis, Minnesota", 
        teams: ["Minnesota Vikings"],
        surface: "Turf",
        roof: "Closed",
        opened: "2016",
        cost: "$1,100,000,000",
        capacity: "66,655",
        fanRanking: "3",
        ticketPrice: "$108.79",
        concessionPrice: "$10.00",
        parkingPrice: "$67"
    },
    {
        id: 20, 
        name: "Paul Brown Stadium", 
        location: "Cincinnati, Ohio", 
        teams: ["Cincinnati Bengals"],
        surface: "Turf",
        roof: "Open",
        opened: "2000",
        cost: "$455,000,000",
        capacity: "65,515",
        fanRanking: "28",
        ticketPrice: "$79.37",
        concessionPrice: "$5.27",
        parkingPrice: "$64"
    },
    {
        id: 21, 
        name: "FirstEnergy Stadium", 
        location: "Cleveland, Ohio", 
        teams: ["Cleveland Browns"],
        surface: "Kentucky Bluegrass",
        roof: "Open",
        opened: "1999",
        cost: "$283,000,000",
        capacity: "67,895",
        fanRanking: "21",
        ticketPrice: "$82.82",
        concessionPrice: "$6.50",
        parkingPrice: "$195"
    },
    {
        id: 22, 
        name: "Heinz Field", 
        location: "Pittsburgh Pennsylvania", 
        teams: ["Pittsburgh Steelers"],
        surface: "Kentucky Bluegrass",
        roof: "Open",
        opened: "2001",
        cost: "$281,000,000",
        capacity: "68,400",
        fanRanking: "9",
        ticketPrice: "$114.24",
        concessionPrice: "$9.29",
        parkingPrice: "$104"
    },
    {
        id: 23, 
        name: "M&T Bank Stadium", 
        location: "Baltimore, Maryland", 
        teams: ["Baltimore Ravens"],
        surface: "Bermuda Grass",
        roof: "Open",
        opened: "1998",
        cost: "$220,000,000",
        capacity: "71,008",
        fanRanking: "20",
        ticketPrice: "$110.53",
        concessionPrice: "$6.50",
        parkingPrice: "$128"
    },
    {
        id: 24, 
        name: "Highmark Stadium", 
        location: "Orchard Park, New York", 
        teams: ["Buffalo Bills"],
        surface: "Turf",
        roof: "Open",
        opened: "1973",
        cost: "$22,000,000",
        capacity: "71,608",
        fanRanking: "13",
        ticketPrice: "$74.95",
        concessionPrice: "$11.00",
        parkingPrice: "$72"
    },
    {
        id: 25, 
        name: "MetLife Stadium", 
        location: "East Rutherford, New Jersey", 
        teams: ["New York Jets", "New York Giants"],
        surface: "Turf",
        roof: "Open",
        opened: "2010",
        cost: "$1,600,000,000",
        capacity: "82,500",
        fanRanking: "29",
        ticketPrice: "$104.74",
        concessionPrice: "$5.00",
        parkingPrice: "$71"
    },
    {
        id: 26, 
        name: "Gillette Stadium", 
        location: "Foxborough, Massachusetts", 
        teams: ["New England Patriots"],
        surface: "Turf",
        roof: "Open",
        opened: "2002",
        cost: "$325,000,000",
        capacity: "66,829",
        fanRanking: "19",
        ticketPrice: "$131.45",
        concessionPrice: "$10.50",
        parkingPrice: "$200"
    },
    {
        id: 27, 
        name: "Hard Rock Stadium", 
        location: "Miami Gardens, Florida", 
        teams: ["Miami Dolphins"],
        surface: "Bermuda Grass",
        roof: "Open",
        opened: "1987",
        cost: "$115,000,000",
        capacity: "65,326",
        fanRanking: "24",
        ticketPrice: "$84.36",
        concessionPrice: "$11.00",
        parkingPrice: "$125"
    },
    {
        id: 28, 
        name: "AT&T Stadium", 
        location: "Arlington, Texas", 
        teams: ["Dallas Cowboys"],
        surface: "Turf",
        roof: "Retractable",
        opened: "2009",
        cost: "$1,300,000,000",
        capacity: "80,000",
        fanRanking: "6",
        ticketPrice: "$99.50",
        concessionPrice: "$9.50",
        parkingPrice: "$117"
    },
    {
        id: 29, 
        name: "FedEx Field", 
        location: "Landover, Maryland", 
        teams: ["Washington Commanders"],
        surface: "Bermuda Grass",
        roof: "Open",
        opened: "1997",
        cost: "$250,000,000",
        capacity: "82,000",
        fanRanking: "30",
        ticketPrice: "$113.46",
        concessionPrice: "$14.00",
        parkingPrice: "$104"
    },
    {
        id: 30, 
        name: "Lincoln Financial Field", 
        location: "Philadelphia, Pennsylvania", 
        teams: ["Philadelphia Eagles"],
        surface: "Hybrid",
        roof: "Open",
        opened: "2003",
        cost: "$512,000,000",
        capacity: "69,596",
        fanRanking: "15",
        ticketPrice: "$127.06",
        concessionPrice: "$11.00",
        parkingPrice: "$79"
    }
];

function showModal(e) {
    let id = e.target.id;
    id = id.split("_")[1];
    let item = data[id];
    document.getElementById("m-stadium-name").innerHTML = item.name;
    Object.keys(item).forEach( key => {
        if (document.getElementById("s-" + key + "-val") != null) {
            document.getElementById("s-" + key + "-val").innerHTML = (item[key] == "" || item[key] == null) ? " -- " : item[key];
        }
    });
    document.getElementById("modal-content").style.display = "block";
    document.getElementById("modal-content").style.opacity = 0.9;
    popupOnLeave(null);
}

function hideModal() {
    document.getElementById("modal-content").style.display = "none";
    document.getElementById("modal-content").style.opacity = 0;
}