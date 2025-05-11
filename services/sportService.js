const sportRepository = require('../repositories/sportRepository');
const bcrypt = require('bcrypt');

class SportService {

    async getSchedule() {
        try {
            return await sportRepository.getGames();
        } catch (error) {
            throw new Error('Не вдалося отримати розклад');
        }
    }

    async searchByTeam(team) {
        if (!team) return [];

        try {
            const games = await sportRepository.getGames();
            return games.filter(game => game.team1.name === team || game.team2.name === team);
        } catch (error) {
            throw new Error('Не вдалося знайти ігри для команди');
        }
    }

    async addGame(date, participants) {
        const teams = await sportRepository.getAllTeams();
        const [team1, team2] = participants;

        const team1Id = teams.find(team => team.name === team1)?.id;
        const team2Id = teams.find(team => team.name === team2)?.id;

        if (!team1Id || !team2Id) {
            const error = new Error('Одна з команд не знайдена в базі даних');
            error.statusCode = 404;
            throw error;
        }

        await sportRepository.addGame(date, team1Id, team2Id);
    }


    async updateGameDate(gameId, newDate) {
        try {
            await sportRepository.updateGameDate(gameId, newDate);
        } catch (error) {
            throw new Error('Не вдалося оновити дату гри');
        }
    }

    async deleteGame(gameId) {
        try {
            await sportRepository.deleteResult(gameId);
            await sportRepository.deleteGame(gameId);
        } catch (error) {
            throw new Error('Не вдалося видалити гру або її результат');
        }
    }


    async getTeams() {
        try {
            return await sportRepository.getAllTeams();
        } catch (error) {
            throw new Error('Не вдалося отримати список команд');
        }
    }

    async updateGameResult(gameId, score) {
        try {
            const games = await sportRepository.getGames();
            const game = games.find(g => g.id === gameId);

            if (!game) {
                throw new Error('Гра з таким ID не знайдена');
            }

            if (game.Result?.score && game.score !== "Немає результату") {
                await sportRepository.updateGameResult(gameId, score);
            } else {
                await sportRepository.addResult(gameId, score);
            }
        } catch (error) {
            console.error('Помилка при оновленні/додаванні результату:', error);
            throw new Error('Не вдалося оновити або додати результат гри');
        }
    }

    async addTeam(teamName) {
        try {
            await sportRepository.addTeam(teamName);
        } catch (error) {
            throw new Error('Не вдалося додати команду');
        }
    }

    async deleteTeam(teamId) {
        try {
            await sportRepository.deleteTeam(teamId);
        } catch (error) {
            throw new Error('Не вдалося видалити команду');
        }
    }

    async hasMatchOnDate(teamName, date) {
        try {
            const games = await sportRepository.getGames();
            const matchesForTeam = games.filter(game => (game.team1.name === teamName || game.team2.name === teamName) && game.date === date);
            return matchesForTeam.length > 0;
        } catch (error) {
            throw new Error('Не вдалося перевірити наявність матчів для команди');
        }
    }

    async login(username, password) {
        const user = await sportRepository.getUserByUsername(username);
        if (!user) throw new Error('Користувача не знайдено');

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) throw new Error('Невірний пароль');

        return {id: user.id, username: user.username};
    }

    // async teamExists(teamName) {
    //     const team = await Team.findOne({where: {name: teamName}});
    //     return !!team;
    // }

}

module.exports = new SportService();
