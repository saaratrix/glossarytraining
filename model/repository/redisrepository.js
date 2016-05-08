var _repository = require("./repository.js").Repository;

function RedisRepository(a_tablePrefix, a_redisClient)
{
    //The prefix to use when getting & setting keys
    this.m_prefix = a_tablePrefix;
    //The redis client,  Dependancy injection because of unit testing!
    this.m_client = a_redisClient || rootRequire("model/db/redisclient.js");
    //If true it will stringify data when adding and parse when fetching
    this.m_usesJSON = false;

    _repository.call(this);
}

RedisRepository.prototype = new _repository();

RedisRepository.prototype.setUseJSON = function ()
{
    this.m_usesJSON = true;
};

RedisRepository.prototype.createEntity = function (a_data)
{
    throw new Error("Not implemented");
};

/**********************
 * Repository functions
 **********************/
RedisRepository.prototype.add = function (a_id, a_data, a_callback)
{
    var that = this;
    this.getById(a_id, function (result)
    {
        if (!result)
        {                    
            this.m_client.set(that.m_prefix + a_id, a_data, function (err, result)
            {
                //Returns true if err is null
                a_callback(!err);
            });
        }
        else
        {
            a_callback(false);
        }
    });    
};

RedisRepository.prototype.getById = function (a_id, a_callback)
{
    this.getByKey(categoryKey + a_id, a_callback);
}

RedisRepository.prototype.getByKey = function (a_key, a_callback)
{
    var that = this;
    this.m_client.get(a_key, function (err, result)
    {
        //If it doesn't exist   
        if (result !== null)
        {
            //If using json then convert it from string -> json
            if (that.m_usesJSON)
            {
                result = JSON.parse(result);
            }            
           
            //Create a new entity based on result and return it to the callback
            a_callback(that.createEntity(result));
        }
        else
        {           
            a_callback(null);
        }        
    });
}

RedisRepository.prototype.all = function (a_callback)
{    
    var that = this;
    
    this.m_client.keys(this.m_prefix + "*", function (err, result)
    {
        if (err)
        {
            result = [];
            a_callback(result);
        }
        else
        {
            var len = result.length;
            var count = 0;
            var data = [];
            //Callback function to use by getByKey
            function updateData(err, dataResult)
            {
                if (!err)
                {
                    if (that.m_usesJSON)
                    {
                        dataResult = JSON.parse(dataResult);
                    }                    
                    //Push the fetched entity into the array
                    data.push( that.createEntity(dataResult) );
                }
                ++count;
                
                if (count === len)
                {
                    a_callback(data);
                }
            }
            
            for (var i = 0; i < len; ++i)
            {
                that.getByKey(result[i], updateData);
            }
        }
    });    
}

module.exports = {
    RedisRepository : RedisRepository
};