function Test(a_id, a_name, a_language, a_type, a_words )
{
    this.id = a_id;
    this.name = a_name;    
    this.language = a_language;
    this.type = a_type;
    //Optionally set
    this.words = a_words || [];  
};

module.exports = {
    Test : Test
};