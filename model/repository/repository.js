//Basicly interface for other Repositories
function Repository(a_db)
{
    this.db = a_db || rootRequire("model/db/dbconn.js").DbConn;
}

//Make sure all functions need to be overloaded to catch any possible errors!
Repository.prototype.add = function (a_sql, a_entity, a_callback)
{
    this.db.query(a_sql, function (err, result)
    {
        if (err)
        {
            a_callback(false);
            return;
        }
        
        a_entity.id = result.insertId;
        a_callback(true);
    }, a_entity);
};

Repository.prototype.update = function (a_sql, a_entity, a_callback)
{
    this.db.query(a_sql, function (err, result)
    {
        if (err)
        {
            a_callback(false);
        }
        else
        {
            a_callback(true);
        }
    }, a_entity);
};

Repository.prototype.deleteById = function (a_sql, a_id, a_callback)
{
    this.db.query(a_sql, function (err, result)
    {
        if (err)
        {
            a_callback(false);
        }
        else
        {
            a_callback(true);
        }
    }, 
    {
        id : a_id
    });
};

Repository.prototype.getById = function (a_sql, a_id, a_callback)
{
    this.db.query(a_sql, function (err, result)
    {
        if (err)
        {
            a_callback(null);
        }
        else
        {
            if (result.length > 0)
            {
                a_callback(result[0]);
            }
            else
            {
                a_callback(null);
            }
        }
    }, 
    {
        id: a_id
    });
};

//Well there is no Queryable like in C# but could be useful!
Repository.prototype.find = function (a_sql, a_callback, a_params)
{
    this.db.query(a_sql, function (err, reply)
    {
        //Do some logic maybe? Like transaction

        a_callback(err, reply);
    }, a_params);
};

Repository.prototype.all = function (a_sql, a_callback)
{
    //If data is null return empty array
    this.db.query(a_sql, function (err, a_rows)
    {
        if (err)
        {
            a_callback([]);
            return;
        }
        
        a_callback(a_rows);
    });
};

module.exports = {
    Repository : Repository
};