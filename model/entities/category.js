//The point of the category is to filter a word if needed. Since there are many words looking them up in a list can be tedious to say the least!
function Category(a_id, a_name)
{
    this.id = a_id;
    this.name = a_name;
};

module.exports = {
    Category : Category
};