$(function() {

    // get data from local storage
    function getData() {
        var data = localStorage.getItem("todoList");
        if (data != null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    // save changed/unchanged data to local storage
    function saveData(data) {
        localStorage.setItem("todoList", JSON.stringify(data));
    }

    // load data to show on the webpage
    function load() {
        var data = getData();
        $("ol, ul").empty();
        var todoCount = 0;
        var doneCount = 0;
        $.each(data, function(index, ele) {
            // console.log(ele.done);
            if (ele.done) {
                $("ul").prepend('<li><input type="checkbox"  checked="checked"><p>' + ele.todo + '</p><span><a index=' + index + ' href="javascript:;" ></a></span></li>');
                doneCount++;
            } else {
                $("ol").prepend('<li><input type="checkbox"  ><p>' + ele.todo + '</p><span><a index=' + index + ' href="javascript:;"></a></span></li>');
                todoCount++;
            }
        })
        $("#done span").text(doneCount);
        $("#ongoing span").text(todoCount);
    }

    load();
    // before every change, get data from local storage, then change data, then save data to local storage, then load data to webpage


    $("#list").on("keydown", function(e) {
        if (e.keyCode === 13) {
            if ($(this).val() !== "") {
                var localData = getData();
                localData.push({ "todo": $(this).val(), "done": false });
                saveData(localData);
                $("#list").val("");
                load();
            } else {
                alert("Please enter your plan")
            }
        }
    });
    // click delete link, delete the corresponding list
    // bind event on ul and ol, but trigger object is a links(event delegation,this is to a link)
    $("ol,ul").on("click", "a", function() {
        var index = $(this).attr("index");
        var data = getData();
        data.splice(index, 1);
        saveData(data);
        load();
    });


    // if checkbox in the In progress lists checked, lists should be shifted to the Has done lists/ if checkbox in the Has done lists unchecked, lists should to shifted to the In progress lists
    $("ol,ul").on("click", "input", function() {
        var data = getData();
        // console.log(data);
        var index = $(this).siblings("span").children("a").attr("index");
        data[index].done = $(this).prop("checked");
        // console.log($(this).prop("checked"));
        saveData(data);
        load();
    })




















})