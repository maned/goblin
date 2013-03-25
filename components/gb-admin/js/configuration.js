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
         },
          error: function() {
            console.log('process error');
          }
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
	$( "#sortable" ).sortable({
	    revert: false,
	    stop: function( event, ui ) {
	        var idsInOrder = $(this).sortable("toArray");
	        alert(idsInOrder)
	    }
	});

	$( "ul, li" ).disableSelection();
});