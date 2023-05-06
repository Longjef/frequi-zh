<template>
  <div v-if="botStore.activeBot.botState" style="text-align: left">
    <p>
      版本：<strong>{{ botStore.activeBot.version }}</strong>
    </p>
    <p>
      状态：<strong>{{ botStore.activeBot.botState.dry_run ? 'Dry-Run' : 'Live' }}</strong>
      <strong>{{ botStore.activeBot.botState.state }}</strong>
    </p>
    <p>
      交易所：<strong>{{ botStore.activeBot.botState.exchange }}</strong>
    </p>
    <p>
      同时交易：<strong>{{ botStore.activeBot.botState.max_open_trades }}</strong>
    </p>
    <p>
      投注金额：<strong>{{ botStore.activeBot.botState.stake_amount }}</strong>
    </p>
    <p>
      投注货币：<strong>{{ botStore.activeBot.botState.stake_currency }}</strong>
    </p>
    <p>
      交易模式：<strong>{{ botStore.activeBot.botState.trading_mode || 'spot' }}</strong>
    </p>
    <p>
      交易策略：<strong>{{ botStore.activeBot.botState.strategy }}</strong>
    </p>
    <p>
      交易止损：<strong>{{
        botStore.activeBot.botState.stoploss_on_exchange ? 'enabled' : 'disabled'
      }}</strong>
    </p>
    <p>
      强制交易：<strong>{{ botStore.activeBot.botState.force_entry_enable }}</strong>
    </p>
    <hr />
    <p>
      交易次数：<strong>{{ botStore.activeBot.profit.trade_count }}</strong>
    </p>
    <p>
      平均盈利：<strong
        >{{ formatPercent(botStore.activeBot.profit.profit_all_ratio_mean) }} (&sum;
        {{ formatPercent(botStore.activeBot.profit.profit_all_ratio_sum) }})</strong
      >
    </p>
    <p>
      平均用时：<strong>{{ botStore.activeBot.profit.avg_duration }}</strong>
    </p>
    <p>
      最佳市场：<strong>{{ botStore.activeBot.profit.best_pair }}</strong>
    </p>
    <hr />
    <p v-if="botStore.activeBot.profit.first_trade_timestamp">
      <span v-if="botStore.activeBot.profit.bot_start_timestamp" class="d-block">
        策略启动:
        <strong>
          <DateTimeTZ :date="botStore.activeBot.profit.bot_start_timestamp" show-timezone />
        </strong>
      </span>
      <span class="d-block">
        首次交易:
        <strong>
          <DateTimeTZ :date="botStore.activeBot.profit.first_trade_timestamp" show-timezone />
        </strong>
      </span>
      <span class="d-block">
        最后交易:
        <strong>
          <DateTimeTZ :date="botStore.activeBot.profit.latest_trade_timestamp" show-timezone />
        </strong>
      </span>
    </p>
    <p>
      <span v-if="botStore.activeBot.profit.profit_factor" class="d-block">
        利润率:
        {{ botStore.activeBot.profit.profit_factor.toFixed(2) }}
      </span>
      <span v-if="botStore.activeBot.profit.trading_volume" class="d-block">
        交易量:
        {{
          formatPriceCurrency(
            botStore.activeBot.profit.trading_volume,
            botStore.activeBot.botState.stake_currency,
            botStore.activeBot.botState.stake_currency_decimals ?? 3,
          )
        }}
      </span>
    </p>
  </div>
</template>

<script lang="ts">
import { formatPercent, formatPriceCurrency } from '@/shared/formatters';
import DateTimeTZ from '@/components/general/DateTimeTZ.vue';

import { defineComponent } from 'vue';
import { useBotStore } from '@/stores/ftbotwrapper';

export default defineComponent({
  name: 'BotStatus',
  components: { DateTimeTZ },
  setup() {
    const botStore = useBotStore();
    return {
      formatPercent,
      formatPriceCurrency,
      botStore,
    };
  },
});
</script>
