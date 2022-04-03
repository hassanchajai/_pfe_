
module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("client", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },

        fluide: {
            type: Sequelize.STRING,
            allowNull: false
        },
        n_compte: {
            type: Sequelize.STRING,
            required: false
        },
        date_compte: {
            type: Sequelize.DATE
        },
        reference: {
            type: Sequelize.STRING,
        },
        emails: {
            type: Sequelize.STRING,
        }
    }, {
        timestamps: true,
    });
    return Client;
};