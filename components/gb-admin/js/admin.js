$('#submit').click(function() {
    $.ajax({
        url: "/admin-save.json",
        type : "POST",
        dataType: "json",
        data: {
            id: $('#guid').val(),
            page_title: $('#page_title').val(),
            page_content: $('#page_content').val()
        },
        complete: function() {
          //called when complete
          console.log('process complete');
        },

        success: function(data) {
          console.log(data);
          console.log('process sucess');
       },

        error: function() {
          console.log('process error');
        },
      });
});