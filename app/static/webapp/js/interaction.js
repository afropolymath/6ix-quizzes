$(document).ready(function() {
  Interactions = {
    init: function() {
      $('#activate-login').on('click', function() {
        $('.ui.modal').modal('show');
      });

      $('.ui.dropdown').dropdown();
    }
  }

  Interactions.init();
})
