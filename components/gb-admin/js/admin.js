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