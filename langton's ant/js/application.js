/*Copyright (C) 2015  Seiman Andrei

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This implementation is Langton's ant game that can be found 
    here https://en.wikipedia.org/wiki/Langton's_ant, representing a 
    celular automata algorithm

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
    
    If modifying or altering it please mention the author, Thank you
*/





var steps = 500;

var i = 0;





function init() {
    if($("#startProcess").attr('clicked') == 0){
        new startProgress('#' + $('td img')[0].id);
        $("#startProcess").attr('clicked',1);
    }else if($("#startProcess").attr('clicked') == 1){
        new startProgress('#' + $('td img')[1].id);
        $("#startProcess").attr('clicked',2);
    }else{
        new startProgress('#' + $('td img')[2].id);
        $("#startProcess").attr('clicked',0);
    }
}







function turn90Right(ant) {
    var currentTile = $(ant).parent();
    var angle = $(ant).attr('rotate');
    angle = parseInt(angle) + 90;
    if (angle == 360) {
        angle = 0;
    }
    $(ant).css({
        transform: 'rotate(' + angle + 'deg)'
    });
    $(ant).attr('rotate', angle);
    flipColor(currentTile, ant)
    moveForward(angle, ant);
}

function turn90Left(ant) {
    var currentTile = $(ant).parent();
    var angle = $(ant).attr('rotate');
    if (angle == 0) {
        angle = 360;
    }
    angle = parseInt(angle) - 90;
    $(ant).css({
        transform: 'rotate(' + angle + 'deg)'
    });
    $(ant).attr('rotate', angle);
    flipColor(currentTile, ant)
    moveForward(angle, ant);
}

function moveForward(angle, ant) {
    var img = $(ant);
    var currTRindex = $(ant).closest('tr').index();
    var currTDindex = $(ant).parent().index();
    if (angle == 0 || angle == 360) {
        //move up
        if (currTRindex != 0) {
            currTRindex -= 1;
            $('tr:eq(' + currTRindex + ') td:eq(' + currTDindex + ')').append(img);
        }
    } else if (angle == 90) {
        //move right
        if (currTDindex != 29) {
            currTDindex += 1;
            $('tr:eq(' + currTRindex + ') td:eq(' + currTDindex + ')').append(img);
        }
    } else if (angle == 180) {
        //move down
        if (currTRindex != 29) {
            currTRindex += 1;
            $('tr:eq(' + currTRindex + ') td:eq(' + currTDindex + ')').append(img);
        }
    } else {
        //move left
        if (currTDindex != 0) {
            currTDindex -= 1;
            $('tr:eq(' + currTRindex + ') td:eq(' + currTDindex + ')').append(img);
        }
    }
}

function flipColor(currentTile, ant) {
    var currentTile = $(ant).parent();
    if (currentTile.css('backgroundColor') == 'rgb(0, 0, 0)') {
        currentTile.css('backgroundColor', '#FFF');
    } else {
        currentTile.css('backgroundColor', 'rgb(0, 0, 0)');
    }
}

function startProgress(ant) {


    var currentTile = $(ant).parent();
    if (currentTile.css('backgroundColor') == 'rgb(0, 0, 0)') {
        turn90Left(ant);
    } else {
        turn90Right(ant);
    }
    if (i < steps) {
        setTimeout(function() {
            i += 1;
            startProgress(ant);
        }, 500);
    }
}
