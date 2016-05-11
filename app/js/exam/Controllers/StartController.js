var Exam;
(function (Exam) {
    var StartController = (function () {
        function StartController(a_program) {
            this.m_program = a_program;
        }
        StartController.prototype.add = function (a_rootElement, a_data) {
            if (a_data === void 0) { a_data = {}; }
            var startWrapper = this.getControllerElement();
            if (startWrapper != null) {
                if (this.m_startButton == null) {
                    this.initEvents();
                }
            }
            else {
                this.getDataFromServer(a_rootElement);
            }
        };
        StartController.prototype.getControllerElement = function () {
            return document.getElementById("startwrapper");
        };
        StartController.prototype.getDataFromServer = function (a_rootElement) {
            Exam.Utility.AjaxPost("/exam/api/start", {}, function (a_response) {
                //var response: StartResponse = a_response as StartResponse;
                if (a_response.error) {
                }
                else {
                    //Get the html text!                   
                    var htmlText = a_response.html;
                    var placeholderElement = document.createElement("div");
                    placeholderElement.innerHTML = htmlText;
                    a_rootElement.appendChild(placeholderElement.firstChild);
                }
            });
        };
        StartController.prototype.initEvents = function () {
            var that = this;
            this.m_startButton = document.getElementById("starttest");
            this.m_startButton.addEventListener("click", function () {
                var testSelector = document.getElementById("testselector");
                if (testSelector.value != "") {
                    var testId = parseInt(testSelector.value);
                    var selectedElement = testSelector.options[testSelector.selectedIndex];
                    var type = Exam.EnumConverter.ExamTypeFromString(selectedElement.getAttribute("data-type"));
                    var language = Exam.EnumConverter.ExamLanguageFromString(selectedElement.getAttribute("data-language"));
                    if (testId > 0) {
                        var data = {
                            testId: testId,
                            language: language,
                            type: type
                        };
                        //This will remove the startwrapper!
                        that.m_program.changeState(Exam.ExamState.CURRENT, that, data);
                    }
                    ;
                }
            });
        };
        StartController.prototype.remove = function () {
            var startWrapper = this.getControllerElement();
            if (startWrapper != null) {
                //Remove the children!
                //startWrapper.innerHTML = "";
                //Remove the element from parentNode (examwrapper)
                startWrapper.parentNode.removeChild(startWrapper);
            }
            this.m_startButton = null;
        };
        return StartController;
    }());
    Exam.StartController = StartController;
})(Exam || (Exam = {}));
//# sourceMappingURL=StartController.js.map