const express = require("express");
const bodyParser = require('body-parser');
const axios = require("axios");
const cheerio = require("cheerio");
const dotenv = require("dotenv");

dotenv.config({ path: './config.env' });

const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = new Sequelize(`postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@postgres:5432/db`)

const Employee = require("employee")(sequelize, DataTypes);

const seed = async function() {
    console.log('Establishing connection...');
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    const response = await axios.get("https://jetup.digital/team")
    const $ = cheerio.load(response.data);

    let employees = [];
    $('h2.user-name, .js-anim-h2').each(function (index, item) {
        employees.push($(this).text());
    })


    let positions = [];
    $('h3.position, .js-anim-h3').each(function (index, item) {
        positions.push($(this).text());
    })

    let descriptions = [];
    $("p.user-text, .js-anim-text").each(function (index, item) {
        descriptions.push($(this).text().replace(/\n/g, ''));
    })

    await Employee.sync({ force: true });
    
    for (let i = 0; i < employees.length; i++) {
        const employee = await Employee.create({
            name: employees[i],
            position: positions[i],
            description: descriptions[i]
        });

        await employee.save();
    }
}

seed();

const app = express();
const port = +process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', async (req, res) => {
    let { name, position } = req.query;
    if(!name) { name = ''; }
    if(!position) { position = ''; }
    
    const employees = await Employee.findAll({
        where: {
          name: {
            [Op.like]: `%${name}%`
          },
          position: {
            [Op.like]: `%${position}%`
          }
        },
        paranoid: false
      });
    res.status(200).json(employees);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});