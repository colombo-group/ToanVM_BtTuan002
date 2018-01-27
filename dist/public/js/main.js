"use strict";
$(function () {
    $.fn.inner_float = function (options) {
        // đã nhận được biến options.
        var settings = $.extend({
            text: null,
            textColor: "black",
            pBoxbg: "orange",
            pBoxBd: "black",
            cBoxbg: "yellow",
            cBoxBd: "black",
            top: "10px",
            pBox_position: {},
        }, options);

        settings.pBox_position = $.extend({
            top: "200px",
            right: "10px",
            bottom: "10px",
            left: "10px",
        }, options.pBox_position);

        // console.log(settings)

        return this.each(function () {
            var pBox = `<div id="pBox"></div>`;
            $(this).append(pBox);

            var cBox = `<div id="cBox"></div>`;
            $('#pBox').append(cBox);



            let pBox_top = $('#pBox').offset().top;
            let cBox_top = $('#cBox').offset().top;

            console.log(settings.top + "  " + pBox_top)
            /*Khởi tạo giá trị*/
            if (settings.top < pBox_top) {
                $('#cBox').css('top', pBox_top + 2)
            }
            else {
                $('#cBox').css('top', (settings.top))
            }


            $(window).bind('scroll', function () {
                /*khai báo biến*/
                let scroll = parseInt($(window).scrollTop());

                console.log('pBox top = ' + pBox_top);
                console.log('cBox top = ' + cBox_top);
                // console.log('top = ' + scroll);
                let top = scroll + parseInt(settings.top);
                console.log('top2 = ' + top);


                /*xử lý hiệu ứng*/

                if (settings.top <= pBox_top ) {
                    $('#cBox').css('top', pBox_top + 2);
                }
                else {
                    $('#cBox').css('top', top)
                }

                if ((top + $('#cBox').height()) >= (pBox_top + $('#pBox').height())){
                    $('#cBox').css('top', (pBox_top + $('#pBox').height()-$('#cBox').height() )-2)
                }

            })
        });
        // return this;
    }
})