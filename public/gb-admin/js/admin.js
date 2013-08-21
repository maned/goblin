function utf8_to_b64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

function b64_to_utf8(str) {
  return decodeURIComponent(escape(window.atob(str)));
}

function getAllPages() {

  //First, empty out any existing dropdowns
  $('#page_to_edit').empty();

  //Then make an AJAX Call to get the new ones.
  $.ajax({
    url: "/get-pages.json",
    type: "POST",
    dataType: "json",
    async: false,
    success: function (data) {

      _.each(data, function grabRoute(navObj) {

        $('#page_to_edit').append('<option class="option_values" value="' + navObj.id + '">' + navObj.url + '</option>')

      });

      $('#page_to_edit').append('<option value="new_page" id="new_page">Add a New Page...</option>');

    },

    error: function () {
      console.log('process error');
    },
  });
}

function makeNewList(page_id_to_save) {

  $.ajax({
    url: "/page-edit.json",
    type: "POST",
    dataType: "json",
    async: false,
    data: {
      page_id: page_id_to_save
    },
    success: function (data) {
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

      if ($('#page_id').val() !== "") {
        $('#page_title').prop('disabled', true);
        $('#page_url').prop('disabled', true);
      }

    },
    error: function () {
      console.log('Admin creation has failed. Please try again.');
    },
  });
}

function setSubmitEvent() {
  $('#submit').click(function () {
    //Get Beginning Id
    var begin_id = $('#page_id').val();

    //Automatically make page_id to be 100% sure for existing and for new ones!
    var saved_id = utf8_to_b64($('#page_title').val());
    console.log(saved_id);
    $('#page_id').val(saved_id);

    var page_id_to_saveX = $('#page_id').val();

    //Check to Make sure it's not blank
    if ($('#page_id').val() !== "") {
      //Go on with Ajax!
      $.ajax({
        url: "/admin-save.json",
        type: "POST",
        dataType: "json",
        data: {
          page_id: page_id_to_saveX,
          page_title: $('#page_title').val(),
          page_url: $('#page_url').val(),
          page_content: $('#page_content').val(),
          meta_description: $('#meta_description').val(),
          meta_keywords: $('#meta_keywords').val(),
          theme: "index.gob"
        },

        success: function (data) {

          if (begin_id === "") {

            console.log('Page has been created.');

            //getAllPages(saved_id);
            //makeNewList(saved_id);

            //TODO: Fix this.
            window.location.reload();

          } else {
            console.log('Page has been updated.');
          }

        },

        error: function () {
          console.log('Page update/creation has failed. Please try again.');
        },
      });
    } else {
      alert('Please enter information before page creation.');
    }

  });
}

function setDeleteEvent() {
  $('#delete').click(function () {
    if ($('#page_to_edit').val() !== "new_page" && $('#page_to_edit').val() !== "SG9tZQ==") {
      $.ajax({
        url: "/admin-delete.json",
        type: "POST",
        dataType: "json",
        data: {
          page_id: $('#page_id').val(),
          page_url: $('#page_url').val()
        },

        success: function (data) {
          console.log('Page has been deleted');

          //Re-get all pages.
          //getAllPages();

          //Initiate change event to get a new admin.
          //$('#page_to_edit').val($('#page_to_edit option:first').val());
          //makeNewList($('#page_to_edit').val());

          //Temp fix TODO: Fix this more cleanly.
          window.location.reload();
        },

        error: function () {
          console.log('Page deletion has failed. Please try again.');
        },
      });
    } else {
      alert('You cannot delete this.')
    }

  });
}

function setAdminArea() {
  $('#page_content').wysiwyg({
    controls: "bold,italic,|,undo,redo,image"
  });
}

//The Ready
$(document).ready(function () {

  //Get all pages information
  getAllPages();

  //Set up Change Event
  $('#page_to_edit').change(function () {
    makeNewList($(this).val());
  });

  $('#page_to_edit').change();
});