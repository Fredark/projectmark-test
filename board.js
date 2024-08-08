import Tile from "./tile.js"

const WINNING_CONDITIONS = [
  {
    name: "horizontal-1",
    tiles: [0, 1, 2],
  },
  {
    name: "horizontal-2",
    tiles: [3, 4, 5],
  },
  {
    name: "horizontal-3",
    tiles: [6, 7, 8],
  },
  {
    name: "vertical-1",
    tiles: [0, 3, 6],
  },
  {
    name: "vertical-2",
    tiles: [1, 4, 7],
  },
  {
    name: "vertical-3",
    tiles: [2, 5, 8],
  },
  {
    name: "diagonal-1",
    tiles: [0, 4, 8],
  },
  {
    name: "diagonal-2",
    tiles: [2, 4, 6],
  },
]

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
