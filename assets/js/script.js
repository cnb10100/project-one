
// Scripts

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

//Justin

var userInput;

function searchDisc () {
  userInput = $("#generic-search").val();

  console.log("userInput", userInput);
  $.ajax({
    type:"GET",
    url:"https://www.theaudiodb.com/api/v1/json/2/search.php?s=" + userInput,
    async:true,
    dataType: "json",
    success: function(json) {
          //getEvents.json = json;
  			  //showEvents(json);
          console.log(json)
  		   },
    error: function(xhr, status, err) {
  			  console.log(err);
  		   }
  });
}

$("#search-btn").on("click", searchDisc);





// var userInputTwo;
// var data;

// function artistInput () {

//   userInputTwo = $("#artist-search").val.trim();

//   console.log(userInputTwo);
// }

// $("#submit-btn").on("click", artistInput);








// Justin

//Disography Search


var key = "523532";
var input = document.getElementById("keyword");  // change to input id 

var page = 0;

function getEvents(page) {

  $('#events-panel').show();
  $('#attraction-panel').hide();

  if (page < 0) {
    page = 0;
    return;
  }
  if (page > 0) {
    if (page > getEvents.json.page.totalPages-1) {
      page=0;
    }
  }
}



















// Irene

var userInputTwo;


function artistInput () {

  userInputTwo = $("#artist-search").val();
  console.log(userInputTwo);
}

$("#submit-btn").on("click", getEvents);








// Irene




var page = 0;

function getEvents() {
  event.preventDefault();
  userInputTwo = $("#artist-search").val();

$("#container-panel").show();
$('#events-panel').show();
$('#attraction-panel').hide();
console.log(userInputTwo);
if (page < 0) {
  page = 0;
  return;
}
if (page > 0) {
  if (page > getEvents.json.page.totalPages-1) {
    page=0;
  }
}
//change url to include input
$.ajax({
  type:"GET",
  url:`https://app.ticketmaster.com/discovery/v2/events.json?&apikey=dOZdUiHBshQqEPJLEZPEVR1AZZuPkqZV&keyword=${userInputTwo}`,
  async:true,
  dataType: "json",
  success: function(json) {
        getEvents.json = json;
        showEvents(json);
       },
  error: function(xhr, status, err) {
        console.log(err);
       }
});
}

function showEvents(json) {

var items = $('#events .list-group-item');
items.hide();
var events = json._embedded.events;
var item = items.first();
for (var i=0;i<events.length;i++) {
  item.children('.list-group-item-heading').text(events[i].name);
  item.children('.list-group-item-text').text(events[i].dates.start.localDate);
  item.children('.list-group-item-url').attr("src", events[i].url);
  try {
    item.children('.venue').text(events[i]._embedded.venues[0].name + " in " + events[i]._embedded.venues[0].city.name);
    item.children(".list-group-item-url").text(events[i].url);
  } catch (err) {
    console.log(err);
  }
  item.show();
  item.off("click");
  item.click(events[i], function(eventObject) {
    console.log(eventObject.data);
    try {
      getAttraction(eventObject.data._embedded.attractions[0].id);
    } catch (err) {
    console.log(err);
    }
  });
  item=item.next();
}
}


function getAttraction(id) {
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v2/attractions/"+id+".json?apikey=dOZdUiHBshQqEPJLEZPEVR1AZZuPkqZV",
  async:true,
  dataType: "json",
  success: function(json) {
        showAttraction(json);
       },
  error: function(xhr, status, err) {
        console.log(err);
       }
});
}

function showAttraction(json) {
  
$('#events-panel').hide();
$('#attraction-panel').show();

$('#attraction-panel').click(function() {
  getEvents(page);
});

$('#attraction .list-group-item-heading').first().text(json.name);
$('#attraction img').first().attr('src',json.images[0].url);
$('#classification').text(json.classifications[0].segment.name + " - " + json.classifications[0].genre.name + " - " + json.classifications[0].subGenre.name);
$('#youtube-weblink').text(json.externalLinks.youtube[0].url);
$('#youtube-weblink').click(function() {
  window.location.href = json.externalLinks.youtube[0].url;
});
$('#itunes-weblink').text(json.externalLinks.itunes[0].url);
$('#itunes-weblink').click(function() {
  window.location.href = json.externalLinks.itunes[0].url;
});
$('#homepage-weblink').text(json.externalLinks.homepage[0].url);
$('#homepage-weblink').click(function() {
  window.location.href = json.externalLinks.homepage[0].url;
});
$('#tm-weblink').text(json.url);
$('#tm-weblink').click(function() {
window.location.href = json.url;
});
}
getEvents(page);