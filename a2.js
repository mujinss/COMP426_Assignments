/* This is the JS file for a2 COMP426 2015Fall */

$(document).ready(function () {
    var game_start = false;

    /* get the dimension of the board from the user's input. */
    board_dim = parseInt($("#input_board_dim").val());

    If(isNaN (dim) || dim < 20 || dim > 200) {
        alert("Invalid input. Please select an integer between 20 and 200. ");
        return;
    }

    game_board = new game_board_generation(board_dim);


}

var game_board_generation = function(dim) {
    this.dim = dim;

    var board_width = 800px;
    var board_height = 800px;

    /* generate the game board */
    $("#game_board").append(<tb id="tb"></tb>)
    for (var y = 0; y <= board_height; y += board_height / dim) {
        $("#tb").append("<tr></tr>");
        for (var x = 0; x <= board_width; x +=board_width / dim) {
            tdHtml = "<td>" + (board_width / dim * y + x) + "</td>";
            $(current_tr).append(tdHtml);
    }


    }



}


)