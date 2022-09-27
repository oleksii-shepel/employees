module.exports = function(sequelize, DataTypes){
    return sequelize.define('Employee', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
    
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'compositeIndex'
        },
    
        position: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'compositeIndex'
        },
    
        description: {
            type: DataTypes.STRING(1500)
        }
    }, {
        tableName: 'Employees',
        timestamps: true
    });
};