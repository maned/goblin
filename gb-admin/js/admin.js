function utf8_to_b64( str ) {
    return window.btoa(unescape(encodeURIComponent( str )));
}
 
function b64_to_utf8( str ) {
    return decodeURIComponent(escape(window.atob( str )));
}

function getAllPages() {

  //First, empty out any existing dropdowns
  $('#page_to_edit').empty();
  
  //Then make an AJAX Call to get the new ones.
  $.ajax({
      url: "/get-pages.json",
      type : "POST",
      dataType: "json",
      async: false,

      success: function(data) {
          for (key in data) {
            //Create a Closure because Javascript is strange, dude!
            (function(key1) {
              //In the looping, make sure you don't take the ID or Revision Number from the DB
              if (key1 !== "_id" && key1 !== "_rev") {
                //Add option to dropdown
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

function setSubmitEvent() {
  $('#submit').click(function() {
    //Get Beginning Id
    var begin_id = $('#page_id').val();

    //Automatically make page_id to be 100% sure for existing and for new ones!
    $('#page_id').val(utf8_to_b64($('#page_title').val()));

    var page_id_to_save = $('#page_id').val();

    //Check to Make sure it's not blank
    if ($('#page_id').val() !== "") {
      //Go on with Ajax!
      $.ajax({
          url: "/admin-save.json",
          type : "POST",
          dataType: "json",
          data: {
              page_id: page_id_to_save,
              page_title: $('#page_title').val(),
              page_url: $('#page_url').val(),
              page_content: $('#page_content').val(),
              meta_description: $('#meta_description').val(),
              meta_keywords: $('#meta_keywords').val()
          },

          success: function(data) {

            if (begin_id === "") {

              //Reload the pages
              getAllPages();

              //Correct the select field and launch change (TODO: Fix this.)
              //$('#page_to_edit').val(page_id_to_save);
              $('#page_to_edit').change();

              console.log('Page has been created.');

            } else {
              console.log('Page has been updated.');
            }

          },

          error: function() {
            console.log('Page update/creation has failed. Please try again.');
          },
        });
    } else {
      alert('Please enter information before page creation.');
    }
    
  });
}

function setDeleteEvent() {
  $('#delete').click(function() {
    $.ajax({
          url: "/admin-delete.json",
          type : "POST",
          dataType: "json",
          data: {
              page_id: $('#page_id').val(),
              page_url: $('#page_url').val()
          },

          success: function(data) {
            console.log('Page has been deleted');

            //Re-get all pages.
            getAllPages();
            
            //Initiate change event to get a new admin.
            $('#page_to_edit').change();
          },

          error: function() {
            console.log('Page deletion has failed. Please try again.');
          },
    });
  });
}

function setAdminArea() {
  $('#page_content').wysiwyg({
    controls:"bold,italic,|,undo,redo,image"
  });
}

//The Ready
$(document).ready(function () {

  //Get all pages information
  getAllPages();

  //Set up Change Event
  $('#page_to_edit').change(function() {
      
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

            //Set up Delete Event
            setDeleteEvent();

            //Initate Admin Area
            setAdminArea();

            console.log($('#page_to_edit').val())
            if ($('#page_to_edit').val() !== "new_page") {
              $('#page_title').prop('disabled', true);
              $('#page_url').prop('disabled', true);
            }

         },
          error: function() {
            console.log('Admin creation has failed. Please try again.');
          },
        });
  });

  //Initiate it By Default
  $('#page_to_edit').change();
});