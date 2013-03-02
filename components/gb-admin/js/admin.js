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
            console.log(data);
            console.log('process success');
         },

          error: function() {
            console.log('process error');
          },
        });
  });
}

//The Ready
$(document).ready(function () {
  //For Save of Page Information

  var dataX = {
   "_id": "pages_info",
   "_rev": "1-c0f9ea18e67631024f346de9257781e4",
   "pages": [
       {
           "name": "Home",
           "page-id": "index",
           "page-url": "index.html"
       },
       {
           "name": "About",
           "page-id": "about",
           "page-url": "about.html"
       },
       {
           "name": "How It Works",
           "page-id": "how_it_works",
           "page-url": "how_it_works.html"
       },
       {
           "name": "Contribute",
           "page-id": "contribute",
           "page-url": "contribute.html"
       },
       {
           "name": "Contact",
           "page-id": "contact",
           "page-url": "contact.html"
       }
   ]
}
  var page_selection_options = ich.page_options(dataX)
  $('#page_to_edit').append(page_selection_options);

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
       },
        error: function() {
          console.log('process error');
        },
      });
  });
  //Initiate it By Default
  $('#page_to_edit').change();
});