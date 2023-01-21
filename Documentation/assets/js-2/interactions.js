	/*-------------------------------------------------------------------------------
	  Show and Hide Content
	-------------------------------------------------------------------------------*/
    function ShowAndHide() {
        var x = document.getElementById('BlogReadMore'); 
        if (x.style.display == 'none') {
          $(x).fadeIn();
          x.style.display = 'block';
          
        } else {
          $(x).fadeOut();
          x.style.display = 'none';
        }

        var x = document.getElementById('BlogReadMore2'); 
        if (x.style.display == 'none') {
          $(x).fadeIn();
          x.style.display = 'block';
          
        } else {
          $(x).fadeOut();
          x.style.display = 'none';
        }

        var x = document.getElementById('BlogReadMore3'); 
        if (x.style.display == 'none') {
          $(x).fadeIn();
          x.style.display = 'block';
          
        } else {
          $(x).fadeOut();
          x.style.display = 'none';
        }
      }