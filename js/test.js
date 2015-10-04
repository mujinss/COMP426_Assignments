$(document).ready(function() {
    var current_game = null;

    $("#speed_slider").slider({
        min:0,
        max:10000
    });

    /* click on the submit button will set up the game board.*/
    $("#submit").click(function(e) {
        e.preventDefault();

        var dim = parseInt($("#input_board_dim").val());

        var speed = $("#speed_slider").slider("option", "values");

        if (isNaN(dim) || dim < 20 || dim > 200) {
            alert("Invalid dimension: " + $("#input_board_dim").val() + "<br>" + "Please input an integer between 20 and 200.");
            return;
        }

        if(current_game != null) {
            current_game.kill();
        }

        current_game = new game_board_generation(dim);

    });

    $("#start_stop").click(function(e) {
        e.preventDefault();
        var now = new Date();
        if (start_date == null) {
            start_date = now;
            $(this).text("Stop");
            interval_timer = setInterval(update_cell, speed);
        } else {
            clearInterval(interval_timer);
            elapsed +=now.getTime() - start_date.getTime();
            start_date = null;
            $(this).text("Start");
            update_cell();
        }

    })

});

 /* generate the game board */

 var game_board_generation = function(dim) {
    this.dim = dim;
    this.killed = false;
    this.started = false;


    var board_width = 1200;
    var board_height = 1200;

    /* set up the new game */
    $("#game_board").css({width: board_width + 20,
                          height: board_height + 20
                          })
                    .append("<table></table>");
    $("table").css({
        width: board_width,
        height: board_height,
      });
    for (var y = 0; y <= dim - 1; y += 1) {
        var current_tr = $("<tr></tr>").appendTo("table");
        current_tr.css({
            width: board_width + "px",
            height: board_height/dim + "px"
            });

        for (var x = 0; x <= dim - 1; x += 1) {
            var current_td = $("<td></td>").appendTo(current_tr);
            current_td.css({
                width: 100*(1/dim) + "%"
            });
            $(current_td).attr("id", y*dim + x + 1);

        }
    }
}

game_board_generation.prototype.kill = function() {
    if(this.killed) {
        return true;
    }

    $("#game_board").empty();
    this.killed = true;

};


/* update cell status*/
var update_cell = function() {

}



