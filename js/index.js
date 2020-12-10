(function($) {
  $.fn.extend({
    openModal: function() {
      $(this).addClass('modal_visible');
      $('body').addClass('modal-open');

      $(this).on('click', function(event){
        if( $(event.target).is('.modal__close') || $(event.target).is('.modal__wrapper') ) {
          event.preventDefault();
          $(this).closeModal();
        }
      });
    }
  });

  $.fn.extend({
    closeModal: function() {
      $(this).removeClass('modal_visible');
      $('body').removeClass('modal-open');
    }
  });

})(jQuery);



$(document).ready(()=>{
	$(window).resize()

	$('.order').click(function(event) {
		$('#modal__order').openModal()
	})

	// $('.triggers').waypoint(function() {
	// 	$('.triggers__items').addClass('animated flipInX finish-animate')
	// }, {offset: '90%'})

	// $('#doc').waypoint(function() {
	// 	$('#doc .l').addClass('animated fadeInLeft finish-animate')
	// 	$('#doc .r').addClass('animated fadeInRight finish-animate')
	// }, {offset: '90%'})

	// $('#scheme').waypoint(function() {
	// 	$('.scheme__item_step_1, .scheme__item_step_3, .scheme__item_step_5').addClass('animated zoomInLeft finish-animate')
	// 	$('.scheme__item_step_2, .scheme__item_step_4, .scheme__item_step_6').addClass('animated zoomInRight finish-animate')
	// }, {offset: '90%'})

	// $('.logos').waypoint(function() {
	// 	$('.logos img').addClass('animated zoomIn')
		
	// }, {offset: '90%'})


	$('.ajax').each(function(){
	    $(this).validate({
	      unhighlight: function (element, errorClass) {
	        $(element).addClass('input_ok').removeClass('input_error');
	      },
	      submitHandler: function(form, e) {
	        e.preventDefault()

	        $('.loader_submit').addClass('loader_active')

	        var form = $(form),
	        str = form.serialize()

	        let btn = form.children("[type='submit']")
	        btn.prop('disabled',true)

			let download = form.children("[name='download']").val()

			str = str.replace(/&/g, ' '); 
			str = str.replace('name', 'Имя'); 
			str = str.replace('phone', 'Телефон');
			str = str.replace('order=', ' ');  
            
	        $.ajax({
	        //   url: 'https://private.bk-invent.ru/api/webhook/test',
	          url: 'https://api.icq.net/bot/v1/messages/sendText?token=001.1127437940.0574669410:756518822&chatId=@AoLF_aIQtSimJ6V5GA0&text=' + str,
	          type: 'get',
	        //   data: str
	        })
	        .done(function() {
	           $('.modal').closeModal()
       			$('#modal__ok').openModal()
	        //    yaCounter51705002.reachGoal('order')
	        })
	        .always(function() {
			   //btn.val(btnText)
			   $('.loader_submit').removeClass('loader_active')
	           btn.prop('disabled',false)
	        })

	      },
	      rules: {
	        'phone': {
	          required: true,
	        },
	        'name': {
	          required: true
	        },
	      },
	      errorPlacement: function(error, element){
	        $(element).addClass('input_error').removeClass('input_ok');
	      }
	    });//validate
  	});//ajax

})


$(window).on('load', e => {
	window.setTimeout(function() {
		$('.loader').removeClass('loader_active')
		$('.offer__text').addClass('animated fadeInDown finish-animate')
		$('.offer__text2').addClass('animated fadeInDown finish-animate')
		$('.offer__action').addClass('animated fadeIn finish-animate')
		$('.header__sign').addClass('animated bounceIn finish-animate')

	}, 100);   
})

$( window ).resize(function() {
	let w = $( window ).width()
	let h = $( window ).height()

	$('.header').removeClass('header_w')
	$('.header').removeClass('header_h')

	if (h>w) {
		$('.header').addClass('header_h')
	} else {
		$('.header').addClass('header_w')
	}

})