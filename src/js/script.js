
document.ready(function() {
    $(".btn").click($(".btn").click()+$('#res').text(function(){
        $('#editor').html())
    });

    function addHTML(tag) {
        var selection = window.getSelection();
        var range = selection.getRangeAt(0);
        var strong = document.createElement(tag);
        range.surroundContents(strong);
        $("#editor").focus()
    };

    var index;

    function image() {
      var url=prompt("Enter the URL of the image to insert");
      document.execCommand('insertImage', false, url)
    };

    $(document).on('keyup',function(){$('#res').text($('#editor').html())});
    $(document).on('click',function(){$('#res').text($('#editor').html())});
    $(".panel-default .panel-heading .btn-group .btn").on('click',function(){
        $('#res').text($('#editor').html())
    });

});