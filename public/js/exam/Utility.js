var Exam;
(function (Exam) {
    var Utility = (function () {
        function Utility() {
        }
        Utility.AjaxPost = function (a_url, a_data, a_callback) {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.addEventListener("load", function () {
                a_callback(JSON.parse(xmlhttp.response));
            }, false);
            xmlhttp.addEventListener("error", function () {
                a_callback({ error: "XMLHttpRequest failed" }, true);
            }, false);
            xmlhttp.open("POST", a_url);
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlhttp.send(JSON.stringify(a_data));
        };
        return Utility;
    }());
    Exam.Utility = Utility;
})(Exam || (Exam = {}));
//# sourceMappingURL=Utility.js.map