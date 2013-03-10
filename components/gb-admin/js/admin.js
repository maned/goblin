function utf8_to_b64( str ) {
    return window.btoa(unescape(encodeURIComponent( str )));
}
 
function b64_to_utf8( str ) {
    return decodeURIComponent(escape(window.atob( str )));
}

function setSubmitEvent() {
  $('#submit').click(function() {
    //Automatically make page_id to be 100% sure for existing and for new ones!
    $('#page_id').val(utf8_to_b64($('#page_title').val()));

    //Check to Make sure it's not blank
    if ($('#page_id').val() !== "") {
      //Go on with Ajax!
      $.ajax({
          url: "/admin-save.json",
          type : "POST",
          dataType: "json",
          data: {
              page_id: $('#page_id').val(),
              page_title: $('#page_title').val(),
              page_url: $('#page_url').val(),
              page_content: $('#page_content').val(),
              meta_description: $('#meta_description').val(),
              meta_keywords: $('#meta_keywords').val()
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
    } else {
      alert('Please enter information before page creation.');
    }
    
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
        console.log(data)
          for (key in data) {
            //Create a Closure because Javascript is strange, dude!
            (function(key1) {
              //In the looping, make sure you don't take the ID or Revision Number from the DB
              if (key1 !== "_id" && key1 !== "_rev") {
                //Set route for value
                console.log(key1)

                $('#page_to_edit').append('<option value="' + key1 + '">' + b64_to_utf8(key1) + '</option>')

              }
             }
            )(key)
          }

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