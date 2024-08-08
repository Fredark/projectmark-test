import Score from "./score.js"
import Board from "./board.js"
import Message from "./message.js"
import PlayAgain from "./playAgain.js"

const getRandomPlayerId = (players) => {
  const min = 0
  const max = players.length - 1
  return Math.round(Math.random() * (max - min) + min)
}

export default {
  data() {
    return {
      players: [
        {
          name: "Player 1",
          symbol: "O",
          score: 0,
        },
        {
          name: "Player 2",
          symbol: "X",
          score: 0,
        },
      ],
      playerTurn: 0,
      message: "It's a draw",
      gameState: "ended",
    }
  },
  methods: {
    startGame() {
      this.gameState = "started"

      const randomFirstPlayerId = getRandomPlayerId(this.players)
      this.playerTurn = randomFirstPlayerId
      this.message = `It's ${this.players[randomFirstPlayerId].name}'s turn`
    },
    switchPlayers() {
      this.playerTurn = this.playerTurn === 0 ? 1 : 0
      this.message = `It's ${this.players[this.playerTurn].name}'s turn`
    },
    defineWinner(player) {
      if (!this.players[player]) return

      this.players[player].score++
      this.gameState = "ended"
      this.message = `${this.players[player].name} wins`
    },
    defineDraw() {
      this.gameState = "ended"
      this.message = "It's a draw"
    },
  },
  mounted() {
    this.startGame()
  },
  template: `
    <div class="game">
      <Score :players="players" />
      <Board :defineWinner="defineWinner" :defineDraw="defineDraw" :players="players" :playerTurn="playerTurn" :switchPlayers="switchPlayers" :gameState="gameState" />
      <Message :text="message" />
      <PlayAgain v-if="gameState === 'ended'" @click="startGame" />
    </div>
  `,
  components: {
    Score,
    Board,
    Message,
    PlayAgain,
  },
}
