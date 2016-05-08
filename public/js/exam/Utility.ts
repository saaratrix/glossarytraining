module Exam
{
    export class Utility
    {
        static AjaxPost(a_url : string, a_data : any, a_callback : Function): void
        {             
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.addEventListener("load", function ()
            {
                a_callback(JSON.parse( xmlhttp.response ));
            }, false);

            xmlhttp.addEventListener("error", function ()
            {
                a_callback({ error:"XMLHttpRequest failed" }, true);
            }, false);

            xmlhttp.open("POST", a_url);

            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlhttp.send(JSON.stringify(a_data));
        }
    }
}

