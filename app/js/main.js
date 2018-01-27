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

            /*khai báo biến*/
            let scroll = $(window).scrollTop();

            let pBox_top = $('#pBox').offset().top;
            let cBox_top = $('#cBox').offset().top;

            console.log(settings.top +"  "+ pBox_top)
            if(settings.top < pBox_top ){
                $('#cBox').css('top', 2)
            }
            else{
                $('#cBox').css('top', scroll-(pBox_top-settings.top))
            }


            $(window).bind('scroll', function () {


                console.log('pBox top = ' + pBox_top);
                console.log('cBox top = ' + cBox_top);


                /*xử lý hiệu ứng*/

                console.log(settings.top +"  "+ pBox_top)
                if(settings.top < pBox_top ){
                    $('#cBox').css('top', 2)
                }
                else{
                    $('#cBox').css('top', scroll-(pBox_top-settings.top))
                }




            })
        });
        // return this;
    }
})