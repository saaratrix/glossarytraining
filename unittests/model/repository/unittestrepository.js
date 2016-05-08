//Basicly interface for other Repositories
function UnitTestRepository(a_options)
{
    a_options = a_options || {};

    this.data = [];
    this.idProperty = a_options.id || "id";

}
//Make sure all functions need to be overloaded to catch any possible errors!

UnitTestRepository.prototype.add = function (a_id, a_data, a_callback)
{
    this.data.push(a_data);
    a_callback(true);    
};

UnitTestRepository.prototype.update = function (a_id, a_data, a_callback)
{
    
};

UnitTestRepository.prototype.deleteById = function (a_id, a_callback)
{
    for (var i = 0; i < this.data.length; ++i)
    {
        var data = this.data[i];
        
        if (data.id === a_id)
        {
            this.data.splice(i, 1);
            return true;
        }        
    }

    return false;
};

UnitTestRepository.prototype.getById = function (a_id, a_callback)
{
    var idProperty = this.idProperty;

    for (var i = 0; i < this.data.length; ++i)
    {
        var data = this.data[i];

        if (data[idProperty] === a_id)
        {
            return data;
        }
    }

    return null;
};

UnitTestRepository.prototype.getByName = function (a_name, a_callback)
{
    a_property = a_property || "name";

    for (var i = 0; i < this.data.length; ++i)
    {
        var data = this.data[i];
        
        if (data[a_property] === a_name)
        {
            return data;
        }
    }
    
    return null;
};

UnitTestRepository.prototype.all = function (a_callback)
{
    a_callback(this.data);   
};

module.exports = {
    UnitTestRepository : UnitTestRepository
};