import { WINNING_CONDITIONS } from "./constants.js"
import Tile from "./tile.js"

export default {
  data() {
    return {
      tiles: Array(9).fill(""),
      winnerType: "",
    }
  },
  props: [
    "defineWinner",
    "defineDraw",
    "players",
    "playerTurn",
    "switchPlayers",
    "gameState",
  ],
  watch: {
    gameState(currentGameState) {
      if (currentGameState === "started") {
        this.resetBoard()
      }
    },
  },
  methods: {
    checkWinner() {
      const playerSymbol = this.players[this.playerTurn].symbol

      return WINNING_CONDITIONS.some((winningCondition) => {
        const isWinner = winningCondition.tiles.every(
          (tile) => this.tiles[tile] === playerSymbol
        )

        if (isWinner) {
          this.winnerType = winningCondition.name
        }

        return isWinner
      })
    },
    checkDraw() {
      return this.tiles.every((tile) => tile)
    },
    setTile(index) {
      if (this.gameState === "ended") return
      if (this.tiles[index]) return

      const currentPlayerId = this.playerTurn
      const currentPlayer = this.players[currentPlayerId]
      this.tiles[index] = currentPlayer.symbol

      if (this.checkWinner()) {
        this.defineWinner(currentPlayerId)
        return
      }

      if (this.checkDraw()) {
        this.defineDraw()
        return
      }

      this.switchPlayers()
    },
    resetBoard() {
      this.tiles = Array(9).fill("")
      this.winnerType = ""
    },
  },

  template: `
    <div class="board" :data-winner-type="winnerType">
      <Tile v-for="(tile, index) in tiles" :key="index" :index="index" :marker="(tile)" @click="setTile(index)" />
    </div>
  `,
  components: {
    Tile,
  },
}
