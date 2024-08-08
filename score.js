export default {
  props: ["players"],
  template: `
    <div class="score">
      <div class="player" v-for="(player, index) in players" :key="index">
        <b>{{ player.name }}({{player.symbol}}):</b> <span class="victories">{{ player.score }}</span>
      </div>
    </div>
  `,
}
