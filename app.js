const express = require("express");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

const brigade = {
    members: [
        {
            id: 1,
            firstName: "Андрій",
            lastName: "Соха",
            age: 18,
            course: 2,
            group: "ІС-31",
            skills: ["Python (Flask, Django, Tkinter, SQLAlchemy, Asyncio)", "JS", "Java", "C++", "SQLite3", "PostgreSQL", "Docker"],
            photo: "/images/sokha.jpg"
        },
        {
            id: 2,
            firstName: "Андрій",
            lastName: "Шевчук",
            age: 19,
            course: 2,
            group: "ІС-31",
            skills: ["C#/.Net", "ASP.NET Core", "HTML", "CSS", "JS", "MySQL", "SQLServer", "MongoDB"],
            photo: "/images/shevchuk.JPG"
        },
        {
            id: 3,
            firstName: "Дарія",
            lastName: "Хоменко",
            age: 18,
            course: 2,
            group: "ІС-33",
            skills: ["JS", "React", "HTML", "CSS", "C#/.Net"],
            photo: "/images/daria.jpg"
        },
        {
            id: 4,
            firstName: "Анастасія",
            lastName: "Яловіца",
            age: 19,
            course: 2,
            group: "ІС-31",
            skills: ["C#/.Net", "HTML", "CSS", "JS", "MySQL", "SQLServer"],
            photo: "/images/anastasia.jpeg"
        },
        {
            id: 5,
            firstName: "Ілля",
            lastName: "Шмигельський",
            age: 18,
            course: 2,
            group: "ІС-31",
            skills: ["C++", "C#/.Net", "HTML", "CSS", "MySQL", "SQLServer", "1C Enterprice", "Python"],
            photo: "/images/ilya.jpg"
        }
    ],
};

app.get("/member/:id", (req, res) => {
    const memberId = parseInt(req.params.id);
    const member = brigade.members.find(m => m.id === memberId);
    if (member) {
        res.render("member", { member });
    } else {
        res.status(404).send("Член не знайдений.");
    }
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.listen(PORT, () => {
    console.log(`Сервер працює: http://localhost:${PORT}`);
});
