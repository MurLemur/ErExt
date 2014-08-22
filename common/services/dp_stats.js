var players = [];
for (var i = 2; i < 7; i++) {
    players[i] = [];
}
var sum = 0;
var gsum = 0;


function count_length(el) {
    if (el != undefined) return el.length;
    else return 0;
}

function view_result(el, fraka) {
    $("#result").empty();
    var elements = "";
    $.each(el, function(i) {
        mas = el[i].split("|");
        elements += "<br><img src='http://img.ereality.ru/a/" + fraka + ".gif'><img title='" + mas[5] + "' src='http://img.ereality.ru/clan/" + mas[4] + ".gif'><b>" + mas[1] + "</b>[" + mas[2] + "]<a target='_blank' href='http://www.ereality.ru/info" + mas[0] + "'><img src='http://img.ereality.ru/inf.gif'></a>";
    })
    $(elements).appendTo($("#result"));
}

function calculate(lvl, fraka) {
    var element = $("#" + lvl + "_" + fraka);
    if (players[fraka][lvl] != undefined) {
        element.text(players[fraka][lvl].length);
        element.attr("href", "javascript:void(0);");
        element.on("click", function() {
            view_result(players[fraka][lvl], fraka);
        })
        return players[fraka][lvl].length;
    }
    return 0;
}

function create_mas(data) {
    var mas = data.match(/(.*\s)/g);
    $.each(mas, function(i) {
        var info = mas[i].split("|");
        if (players[info[9]][info[2]] === undefined) players[info[9]][info[2]] = [];
        players[info[9]][info[2]].push(mas[i]);
    });
    return;
}

function create_table() {
    for (var i = 2; i < 7; i++) {
        sum = 0;
        for (var j = 10; j < 23; j++) {
            sum = sum + calculate(j, i);
        }
        $("#" + i + "_all").text(sum);
        gsum = gsum + sum;
    }
    for (var j = 10; j < 23; j++) {
        sum = count_length(players[2][j]) + count_length(players[3][j]) + count_length(players[4][j]) + count_length(players[5][j]) + count_length(players[6][j]);
        $("#" + j + "_all").text(sum);
    }
    $("#all_all").text(gsum);
}



$.ajaxSetup({
    type: 'get',
    response: 'text',
    async: true,
    mimeType: "text/html;charset=windows-1251"
});
$.ajax({
    url: "http://ratings.ereality.ru/txt/r6_4.txt",
    success: function(data) {
        create_mas(data);
        $.ajax({
            url: "http://ratings.ereality.ru/txt/r6_5.txt",
            success: function(data) {
                create_mas(data);
                $.ajax({
                    url: "http://ratings.ereality.ru/txt/r6_6.txt",
                    success: function(data) {
                        create_mas(data);
                        $.ajax({
                            url: "http://ratings.ereality.ru/txt/r6_7.txt",
                            success: function(data) {
                                create_mas(data);
                                $.ajax({
                                    url: "http://ratings.ereality.ru/txt/r6_8.txt",
                                    success: function(data) {
                                        create_mas(data);
                                        create_table();
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});

var fraction_name = {
    2: "Игнесс",
    3: "Раанор",
    4: "Тарбис",
    5: "Витарра",
    6: "Дримнир"
}
$.get("http://ratings.ereality.ru/txt/r6_2.txt", function(data) {
    var mas = data.match(/(.*\s)/g);
    $.each(mas, function(i) {
        var info = mas[i].split("|");
        $("#f_" + info[2]).text(fraction_name[info[0]]);
        $("#f_" + info[2]).prepend($("<img src='http://img.ereality.ru/a/" + info[0] + ".gif'>"));
        $("#a_" + info[2]).text(info[1]);
    });
    return;
})


$.ajax({
    url: "http://ratings.ereality.ru/txt/r6_1.txt",
    success: function(data) {
        var mas = data.match(/(.*\s)/g);
        $.each(mas, function(i) {
            var info = mas[i].split("|");
            $("#sila_" + i).text(info[1]);
            $("#count_" + i).text(info[2]);
            $("#glava_" + i).text(info[3]);
            $("#glava_" + i).prepend($("<img src='http://img.ereality.ru/a/" + info[0] + ".gif'>"));
            $("#glava_" + i).append($("<a target='_blank' href='http://www.ereality.ru/~" + info[3] + "'><img src='http://img.ereality.ru/inf.gif'></a>"));
            $("#aktivka_" + i).text(info[4]);
        });
    }
});