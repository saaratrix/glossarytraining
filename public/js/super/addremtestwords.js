window.addEventListener("load", function ()
{
    function onclick()
    {
        var checkbox = this.querySelector("input");
        var isChecked = checkbox.checked;

        //Tell server!
        var wordId = parseInt(checkbox.getAttribute("data-id"));

        sendToServer({
            isChecked: isChecked,
            wordId: wordId,
            testId: testId
        });
    };

    var testwordsRoot = document.getElementById("testwords");
    var rows = testwordsRoot.querySelectorAll("tbody tr");
    
    var testId = parseInt(testwordsRoot.getAttribute("data-testid"));
    
    var len = rows.length;
    for (var i = 0; i < len; ++i)
    {
        var row = rows[i];

        row.addEventListener("click", onclick);
    }

    function sendToServer(a_data)
    {
        var url = "/admin/tests/testword";
        
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", url);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify(a_data));
    }    
});