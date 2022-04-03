const bcrypt=require("bcryptjs")
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
        },
        password: {
            type: Sequelize.STRING,
            required: true,
             set(value) {
                // console.log(value);
                const salt =  bcrypt.genSaltSync(10);

                let hashpwdpassword =  bcrypt.hashSync(value, 12);
            console.log(hashpwdpassword);
                this.setDataValue('password', hashpwdpassword);
              }
        },
    }, {
        timestamps: true,
    });
    return User;
};