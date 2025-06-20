(function(jQuery) {

  "use strict";
  
  /*------------------------------------
    HT Predefined Variables
  --------------------------------------*/
  var jQuerywindow = jQuery(window),
      jQuerydocument = jQuery(document),
      jQuerybody = jQuery('body');
  
  //Check if function exists
  jQuery.fn.exists = function () {
    return this.length > 0;
  };
  
  
  /*------------------------------------
    HT PreLoader
  --------------------------------------*/
  function preloader() {
     jQuery('#ht-preloader').fadeOut();
  };
  
  
  /*------------------------------------
    HT menu
  --------------------------------------*/
  function menu() {  
    jQuery('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
     if (!jQuery(this).next().hasClass('show')) {
       jQuery(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
     }
     var jQuerysubMenu = jQuery(this).next(".dropdown-menu");
     jQuerysubMenu.toggleClass('show');
   
     jQuery(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
       jQuery('.dropdown-submenu .show').removeClass("show");
     });
   
     return false;
   });
   };
  
  
  
  /*------------------------------------
    HT Counter
  --------------------------------------*/
  function counter() {  
    var elementSelector = jQuery('.count-number');
      elementSelector.each(function(){
          elementSelector.appear(function(e) {
              var el = this;
              var updateData = jQuery(el).attr("data-count");
              var od = new Odometer({
                  el: el,
                  format: 'd',
                  duration: 2000
              });
              od.update(updateData);
          });
      });
  };
  
  
  /*------------------------------------
    HT Owl Carousel
  --------------------------------------*/
  function owlcarousel() {
  jQuery('.owl-carousel').each( function() {
    var jQuerycarousel = jQuery(this);
    jQuerycarousel.owlCarousel({
        items : jQuerycarousel.data("items"),
        slideBy : jQuerycarousel.data("slideby"),
        center : jQuerycarousel.data("center"),
        loop : true,
        margin : jQuerycarousel.data("margin"),
        dots : jQuerycarousel.data("dots"),
        nav : jQuerycarousel.data("nav"),      
        autoplay : jQuerycarousel.data("autoplay"),
        autoplayTimeout : jQuerycarousel.data("autoplay-timeout"),
        navText : [ '<span class="bi bi-arrow-left"><span>', '<span class="bi bi-arrow-right"></span>' ],
        responsive: {
          0:{items: jQuerycarousel.data('xs-items') ? jQuerycarousel.data('xs-items') : 1},
          576:{items: jQuerycarousel.data('sm-items')},
          768:{items: jQuerycarousel.data('md-items')},
          1024:{items: jQuerycarousel.data('lg-items')},
          1200:{items: jQuerycarousel.data("items")}
        },
    });
  });
  };
  
  
  /*------------------------------------
    HT Magnific Popup
  --------------------------------------*/
  function magnificpopup() {
  jQuery('.popup-gallery').magnificPopup({
      delegate: 'a.popup-img',
      type: 'image',
      tLoading: 'Loading image #%curr%...',
      mainClass: 'mfp-img-mobile',
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0,1] // Will preload 0 - before current, and 1 after the current image
      },
      image: {
        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
        titleSrc: function(item) {
          return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
        }
      }
    });
  if (jQuery(".popup-youtube, .popup-vimeo, .popup-gmaps").exists()) {
       jQuery('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
      });
    }
  
  };     
  
  /*------------------------------------
    HT Scroll to top
  --------------------------------------*/
  function scrolltop() {
  //Scroll back to top
          
          var progressPath = document.querySelector('.scroll-top path');
          var pathLength = progressPath.getTotalLength();
          progressPath.style.transition = progressPath.style.WebkitTransition = 'none';
          progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
          progressPath.style.strokeDashoffset = pathLength;
          progressPath.getBoundingClientRect();
          progressPath.style.transition = progressPath.style.WebkitTransition = 'stroke-dashoffset 10ms linear';      
          var updateProgress = function () {
              var scroll = jQuery(window).scrollTop();
              var height = jQuery(document).height() - jQuery(window).height();
              var progress = pathLength - (scroll * pathLength / height);
              progressPath.style.strokeDashoffset = progress;
          }
          updateProgress();
          jQuery(window).scroll(updateProgress);  
          var offset = 50;
          var duration = 550;
          jQuery(window).on('scroll', function() {
              if (jQuery(this).scrollTop() > offset) {
                  jQuery('.scroll-top').addClass('active-progress');
              } else {
                  jQuery('.scroll-top').removeClass('active-progress');
              }
          });             
          jQuery('.scroll-top').on('click', function(event) {
              event.preventDefault();
              jQuery('html, body').animate({scrollTop: 0}, duration);
              return false;
          })
  };
  
  
  
  /*------------------------------------
    HT Fixed Header
  --------------------------------------*/
  function fxheader() {
    jQuery(window).on('scroll', function () {
      if (jQuery(window).scrollTop() >= 100) {
        jQuery('#header-wrap').addClass('fixed-header');
      } else {
        jQuery('#header-wrap').removeClass('fixed-header');
      }
    });
  };
  
  /*------------------------------------
    HT Fixed Header changing colors
  --------------------------------------
  
  jQuery(document).ready(function($) {
  
    // 1. Scroll animato al click sui link della navbar
    $('#header-wrap nav a').not('.themeht-btn').on('click', function(e) {
      e.preventDefault(); // Previene il comportamento predefinito del link
      var target = $(this).attr('href'); // Ottieni il valore dell' href (ad esempio "#nomeDiv")
      var headerHeight = $('#header-wrap').outerHeight(); // Altezza dell'header fisso
      // Esegui lo scroll animato alla sezione
      $('html, body').animate({
        scrollTop: $(target).offset().top - headerHeight
      }, 600); // 600ms per l'animazione
    });
  
    // 2. Evidenzia il link attivo in base alla posizione della sezione
    var nav = $('#header-wrap');
    var navHeight = nav.outerHeight();
    
    // Seleziona tutti i div con un id
    var sections = $('section');
    var lastSection = sections.last(); // Ultima sezione (footer)
    var certificationsSection = $('#certificazioni'); // Sezione delle certificazioni
    
    $(window).on('scroll', function() {
      var curPos = $(this).scrollTop() + 10; // Piccolo offset per maggiore precisione
      var scrollBottom = curPos + $(window).height();
      var activeFound = false; // Variabile per controllare se una sezione è già stata evidenziata
  
      // Cicla su tutte le sezioni e evidenzia la sezione visibile
      sections.each(function() {
        var top = $(this).offset().top - navHeight; 
        var bottom = top + $(this).outerHeight(); 
        var offset = 100; // L'offset per anticipare l'evidenziazione
    
        if (curPos >= top - offset && curPos < bottom - offset) {
          nav.find('a').removeClass('active');
          nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
          activeFound = true;
        }
      });
  
      // **Forza la visualizzazione del footer quando la sezione delle certificazioni non è visibile**
      if (!activeFound) {
        var certificationsBottom = certificationsSection.offset().top + certificationsSection.outerHeight();
        if (curPos >= certificationsBottom) {
          nav.find('a').removeClass('active');
          nav.find('a[href="#' + lastSection.attr('id') + '"]').addClass('active');
        }
      }
    });
  
  });
  
  
  
  
  
  /*------------------------------------------
    HT Text Color, Background Color And Image
  ---------------------------------------------*/
  function databgcolor() {
      jQuery('[data-bg-color]').each(function(index, el) {
       jQuery(el).css('background-color', jQuery(el).data('bg-color'));  
      });
      jQuery('[data-text-color]').each(function(index, el) {
       jQuery(el).css('color', jQuery(el).data('text-color'));  
      });
      jQuery('[data-bg-img]').each(function() {
       jQuery(this).css('background-image', 'url(' + jQuery(this).data("bg-img") + ')');
      });
  };
  
  
  /*------------------------------------
    HT Contact Form
  --------------------------------------*/
  function contactform() { 
      // when the form is submitted
      jQuery('#contact-form, #main-form').on('submit', function (e) {
  
      // if the validator does not prevent form submit
      if (!e.isDefaultPrevented()) {
          var url = "php/contact.php";
  
          // POST values in the background the the script URL
          jQuery.ajax({
              type: "POST",
              url: url,
              data: jQuery(this).serialize(),
              success: function (data)
              {
              // data = JSON object that contact.php returns
  
              // we recieve the type of the message: success x danger and apply it to the 
              var messageAlert = 'alert-' + data.type;
              var messageText = data.message;
  
              // let's compose Bootstrap alert box HTML
              var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
              
              // If we have messageAlert and messageText
              if (messageAlert && messageText) {
                  // inject the alert to .messages div in our form
                  jQuery('#contact-form, #main-form').find('.messages').html(alertBox).show().delay(2000).fadeOut('slow');
                  // empty the form
                  jQuery('#contact-form, #main-form')[0].reset();
              }
            }
          });
          return false;
      }
   })   
  };
  
  
  /*------------------------------------
    HT ProgressBar
  --------------------------------------*/
    function progressbar () {
      var progressBar = jQuery('.progress');
      if(progressBar.length) {
        progressBar.each(function () {
          var Self = jQuery(this);
          Self.appear(function () {
            var progressValue = Self.data('value');
  
            Self.find('.progress-bar').animate({
              width:progressValue+'%'           
            }, 1000);
          });
        })
      }
  };
  
  
  /*------------------------------------
    HT Countdown
  --------------------------------------*/
  function countdown() {
    jQuery('.countdown').each(function () {
      var jQuerythis = jQuery(this),
        finalDate = jQuery(this).data('countdown');
      jQuerythis.countdown(finalDate, function (event) {
        jQuery(this).html(event.strftime('<li><span>%-D</span><p>Days</p></li>' + '<li><span>%-H</span><p>Hours</p></li>' + '<li><span>%-M</span><p>Minutes</p></li>' + '<li><span>%S</span><p>Seconds</p></li>'));
      });
    });
  };
  
  /*------------------------------------
    HT btnproduct
  --------------------------------------*/
  function btnproduct() {
    jQuery('.btn-product-up').on('click', function (e) {
      e.preventDefault();
      var numProduct = Number(jQuery(this).next().val());
      if (numProduct > 1) jQuery(this).next().val(numProduct - 1);
    });
    jQuery('.btn-product-down').on('click', function (e) {
      e.preventDefault();
      var numProduct = Number(jQuery(this).prev().val());
      jQuery(this).prev().val(numProduct + 1);
    }); 
  };
  
  /*------------------------------------
    HT Wow Animation
  --------------------------------------*/
  function wowanimation() {
      var wow = new WOW({
          boxClass: 'wow',
          animateClass: 'animate__animated',
          offset: 0,
          mobile: false,
          live: true
      });
      wow.init();
  }
  
  
  /*------------------------------------
    HT Window load and functions
  --------------------------------------*/
  jQuery(document).ready(function() {
      menu(),
      owlcarousel(),
      counter(),
      magnificpopup(),
      scrolltop(),
      fxheader(),
      databgcolor(),  
      contactform(),
      progressbar(),
      countdown(),
      btnproduct();
  });
  
  jQuery(window).on('load', function() {
      preloader(),
      wowanimation();
  });
  
  })(jQuery);
  
  

  
  
  /*------------------------------------------
    modifica bottoni
  ---------------------------------------------*/
  document.addEventListener("DOMContentLoaded", function() {
    const buttons = document.querySelectorAll(".themeht-btn");
  
    buttons.forEach(button => {
        button.addEventListener("click", function() {
            setTimeout(() => {
                this.blur(); // Rimuove il focus per ripristinare lo stato iniziale
            }, 100);
        });
    });
  });
  
  
  
  /*------------------------------------------
    modal
  ---------------------------------------------*/
  
  document.addEventListener("DOMContentLoaded", function() {
    const privacyLink = document.getElementById("privacy-link");
    const modal = document.getElementById("privacy-modal");
    const closeBtn = document.querySelector("#privacy-modal .close");
  
    // Funzione per aprire il modal con transizione
    privacyLink.addEventListener("click", function(event) {
      event.preventDefault(); // Impedisci comportamento predefinito
      modal.classList.add("show"); // Aggiungi la classe per l'animazione
    });
  
    // Funzione per chiudere il modal con transizione
    closeBtn.addEventListener("click", function() {
      modal.classList.remove("show"); // Rimuove la classe per nasconderlo
    });
  
    // Chiudi il modal se l'utente clicca fuori dal contenuto
    window.addEventListener("click", function(event) {
      if (event.target === modal) {
        modal.classList.remove("show");
      }
    });
  });
  
  /*------------------------------------------
  certificazini iso
  ---------------------------------------------*/
  
  
  // Per il secondo div
  $('.col-md-5.text-center.p-4.bg-white.shadow.rounded.ms-md-4.mt-4.mt-md-0').on('click', function() {
    window.open('https://www.iso.org/standards/popular/iso-9000-family', '_blank'); // Apri in una nuova finestra o tab
  });
  $('.col-md-5.text-center.p-4.bg-white.shadow.rounded.ms-md-4.mt-4.mt-md-0').css('cursor', 'pointer');
  
  
  // Per il primo div
  $('.col-md-5.text-center.p-4.bg-white.shadow.rounded').on('click', function() {
    window.open('https://www.iso.org/standard/27001', '_blank'); // Apri in una nuova finestra o tab
  });
  $('.col-md-5.text-center.p-4.bg-white.shadow.rounded').css('cursor', 'pointer');
  
  
  /*------------------------------------------
  scorrimento pagina
  ---------------------------------------------*/
  
  // Funzione per gestire lo scroll automatico e aggiungere l'evidenziazione
  function highlightActiveLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    let activeSectionId = '';
    const scrollPosition = window.scrollY + 85; // Offset per la navbar
  
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        activeSectionId = section.getAttribute('id');
      }
    });
  
    // Se siamo quasi in fondo alla pagina, forziamo l'attivazione del footer (id "contatti")
    const nearBottomThreshold = 50; // Puoi regolare questo valore
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - nearBottomThreshold) {
      activeSectionId = 'contatti';
    }
  
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === activeSectionId) {
        link.classList.add('active');
      }
    });
  }
  
  // Aggiunge l'evento scroll alla finestra
  window.addEventListener('scroll', highlightActiveLink);
  
  // Script per lo scroll fluido
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
  
       // Chiudiamo la navbar al clic del link
      const navbarCollapse = document.getElementById('navbarNav');
      const bootstrapCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
      bootstrapCollapse.hide();
  
      if (targetElement) {
        const start = window.pageYOffset;
        const target = targetElement.offsetTop - 80 + 30; // Correzione per l'offset
        const distance = target - start;
        const duration = 800; // Durata totale in ms
        let startTime = null;
  
        function scrollStep(currentTime) {
          if (!startTime) startTime = currentTime;
          const elapsed = currentTime - startTime;
  
          if (elapsed < duration) {
            const position = easeOutQuad(elapsed, start, distance, duration);
            window.scrollTo(0, position);
            requestAnimationFrame(scrollStep);
          } else {
            window.scrollTo(0, target);
          }
        }
  
        // Funzione di easing: decelera verso la fine
        function easeOutQuad(t, b, c, d) {
          t /= d;
          return -c * t * (t - 2) + b;
        }
  
        requestAnimationFrame(scrollStep);
      }
    });
  });
  
  // Eseguire la funzione una volta al caricamento per assegnare lo stato attivo iniziale
  window.addEventListener('load', highlightActiveLink);
  
  
  