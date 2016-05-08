function Word(a_id, a_finnish, a_english, a_categoryId, a_category)
{
    this.id = a_id;
    this.finnish = a_finnish;
    this.english = a_english;
    //For now only 1 category per word.
    this.categoryId = a_categoryId;
    //Might not be set while setting categoryId
    this.category = a_category || null;
};

module.exports = {
    Word : Word
};