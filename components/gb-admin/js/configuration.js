function utf8_to_b64( str ) {
    return window.btoa(unescape(encodeURIComponent( str )));
}
 
function b64_to_utf8( str ) {
    return decodeURIComponent(escape(window.atob( str )));
}

function paintConfig() {
	//Make ajax call and paint values
	$.ajax({
          url: "/config-page.json",
          type : "POST",
          dataType: "json",
          data: {},
          success: function(data) {
          	console.log(data)
            //Empty the admin area
            $('#admin-area').empty();
            //Rebuild the template with the new data
            var configHTML = ich.config_page(data);
            //Append it
            $('#admin-area').append(configHTML);

            //Submit Event
            setSubmitEvent();

            //If there are none in the default database, then load them from page_routes
            if (!$('.nav_item_count').length) {
              getPages();
            }
            
            $("#nav_conf").sortable({
                revert: false,
                stop: function( event, ui ) {
                    var idsInOrder = $(this).sortable("toArray");

                    var nav_info = JSON.stringify(
                        idsInOrder.map(
                            function (e) {
                                return {
                                        'id': e,
                                        'url': atob(e).toLowerCase().replace(/\s/g, '_') + '.html',
                                        'item_name' : atob(e)
                                       }; // I converted the string to URL as I expect you wanted
                            }
                        ),
                    0, 4);

                    alert(nav_info)
                }
            });

            $( "ul, li" ).disableSelection();
         },
          error: function() {
            console.log('process error');
          }
     });
}

function getPages() {
  $.ajax({
      url: "/get-pages.json",
      type : "POST",
      dataType: "json",
      async: false,

      success: function(data) {
        console.log(data)
          for (key in data) {
            //Create a Closure because Javascript is strange, dude!
            (function(key1) {
              //In the looping, make sure you don't take the ID or Revision Number from the DB
              if (key1 !== "_id" && key1 !== "_rev") {
                //Add option to dropdown
                $('#nav_conf').append('<li id="' + key1 + '" class="ui-state-default">' + b64_to_utf8(key1) + '</li>')
              }
             }
            )(key)
          }
     },

      error: function() {
        console.log('process error');
      },
    });
}

function setSubmitEvent() { 
	$('#submit').click(function() {
		$.ajax({
          url: "/config-save.json",
          type : "POST",
          dataType: "json",
          data: {
          	ga_id: $('#ga_id').val()
          },
          success: function(data) {
          	console.log(data)
          	paintConfig();
         },
          error: function() {
            console.log('process error');
          }
     	});
	});
}

$(document).ready(function() {

	
	paintConfig();


	//Create Sorting

});