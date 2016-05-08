var TestsPrettifier = {
    language: function (a_language)
    {
        switch (a_language)
        {
            case 0:
                return "Answers in User Language";
            case 1:
                return "Answers in Finnish";
            case 2:
                return "Random between finnish and UL.";
            default:
                return "";
        }
    },
    languageShort : function (a_language)
    {
        switch (a_language)
        {
            //Vash template automatically escapes the strings so FI-&gt;  would be FI-&gt; 
            case 0:
                return "FI->UL";
            case 1:
                return "UL->FI";
            case 2:
                return "Random";
            default:
                return "";
        }
    },
    type : function (a_type)
    {
        switch (a_type)
        {
            case 0:
                return "Write correct translation";
            case 1:
                return "Choose between 3 choices";            
            default:
                return "";
        }
    },
    typeShort: function (a_type)
    {
        switch (a_type)
        {
            case 0:
                return "Simple";
            case 1:
                return "3 choices";
            default:
                return "";
        }
    }
};

function getClass()
{
    return TestsPrettifier;
}

module.exports = {
    getClass: getClass
};