function utf8_to_b64( str ) {
    return window.btoa(unescape(encodeURIComponent( str )));
}
 
function b64_to_utf8( str ) {
    return decodeURIComponent(escape(window.atob( str )));
}

function setSubmitEvent() {
  $('#submit').click(function() {
      $.ajax({
          url: "/admin-save.json",
          type : "POST",
          dataType: "json",
          data: {
              page_id: $('#page_id').val(),
              page_title: $('#page_title').val(),
              page_content: $('#page_content').val()
          },
          complete: function() {
            //called when complete
            console.log('process complete');
          },

          success: function(data) {
            console.log('process success');
         },

          error: function() {
            console.log('process error');
          },
        });
  });
}

function getAllPages() {
  $.ajax({
      url: "/get-pages.json",
      type : "POST",
      dataType: "json",
      async: false,
      complete: function() {
        //called when complete
        console.log('process complete');
      },

      success: function(data) {
        var page_selection_options = ich.page_options(data);
        $('#page_to_edit').append(page_selection_options);
     },

      error: function() {
        console.log('process error');
      },
    });
}


//The Ready
$(document).ready(function () {
  //For Save of Page Information

  //Get all pages information
  getAllPages();

  //Set up Change Event
  $('#page_to_edit').change(function() {
      /*if ($(this).val() !== "new_page") {
        
      } else {
        $('#admin-area').empty();
            //Rebuild the template with the new data
            var adminHTML = ich.page_admin_new();
            //Append it
            $('#admin-area').append(adminHTML);
            //Set Submit Event
            setSubmitEvent();
      }*/
      
      $.ajax({
          url: "/page-edit.json",
          type : "POST",
          dataType: "json",
          data: {
              page_id: $(this).val()
          },
          success: function(data) {
            //Empty the admin area
            $('#admin-area').empty();
            //Rebuild the template with the new data
            var adminHTML = ich.page_admin(data);
            //Append it
            $('#admin-area').append(adminHTML);
            //Set Submit Event
            setSubmitEvent();
         },
          error: function() {
            console.log('process error');
          },
        });
  });

  //Initiate it By Default
  $('#page_to_edit').change();
});