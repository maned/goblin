function utf8_to_b64(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

function b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
}

function paintConfig() {
    //Make ajax call and paint values
    $.ajax({
        url: "/gb-admin/get-config.json",
        type: "GET",
        dataType: "json",
        success: function (data) {

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
                revert: false
            });

            $("ul, li").disableSelection();
        },
        error: function () {
            console.log('process error');
        }
    });
}

function createNavJSON() {

    var idsInOrder = $('#nav_conf').sortable("toArray");

    var nav_info = JSON.stringify(
        idsInOrder.map(
            function (e) {
                var esc_e = e.replace(/[=]/g, "\\=");
                var id = '#' + esc_e;
                return {
                    'id': e,
                    'url': $(id).attr('data-url'),
                    'item_name': atob(e)
                }
            }
        ),
        0, 4);

    return $.parseJSON(nav_info);
}

function getPages() {
    $.ajax({
        url: "/gb-admin/get-pages.json",
        type: "POST",
        dataType: "json",
        success: function (data) {
            console.log(data)
            for (key in data) {
                //Create a Closure because Javascript is strange, dude!
                (function (key1) {
                    //In the looping, make sure you don't take the ID or Revision Number from the DB
                    if (key1 !== "_id" && key1 !== "_rev") {
                        //Add option to dropdown
                        $('#nav_conf').append('<li id="' + key1 + '" class="ui-state-default">' + b64_to_utf8(key1) + '</li>')
                    }
                })(key)
            }
        },

        error: function () {
            console.log('process error');
        },
    });
}

function setSubmitEvent() {
    $('#submit').click(function () {
        $.ajax({
            url: "/gb-admin/config-save.json",
            type: "POST",
            dataType: "json",
            data: {
                ga_id: $('#ga_id').val(),
                nav: createNavJSON(),
                site_title: $('#site_title').val(),
                site_description: $('#site_description').val()
            },
            success: function (data) {
                paintConfig();

                window.location.reload();
            },
            error: function () {
                console.log('process error');
            }
        });
    });
}

$(document).ready(function () {


    paintConfig();


    //Create Sorting

});