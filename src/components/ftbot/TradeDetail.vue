<template>
  <div class="container text-start">
    <div class="row">
      <div class="col-lg-5">
        <h5 class="detail-header">概况</h5>
        <ValuePair description="编号">{{ trade.trade_id }}</ValuePair>
        <ValuePair description="市场">{{ trade.pair }}</ValuePair>
        <ValuePair description="委托时间">{{ timestampms(trade.open_timestamp) }}</ValuePair>
        <ValuePair v-if="trade.close_timestamp" description="成交时间">{{
          timestampms(trade.close_timestamp)
        }}</ValuePair>
        <ValuePair v-if="trade.enter_tag" description="买入标记">{{ trade.enter_tag }}</ValuePair>
        <ValuePair description="成交额"
          >{{ formatPriceCurrency(trade.stake_amount, stakeCurrency) }}
          {{ trade.leverage && trade.leverage !== 1 ? `(${trade.leverage}x)` : '' }}</ValuePair
        >
        <ValuePair description="委托量">{{ trade.amount }}</ValuePair>
        <ValuePair description="委托价">{{ formatPrice(trade.open_rate) }}</ValuePair>
        <ValuePair v-if="!trade.is_open && trade.close_rate" description="成交价">{{
          formatPrice(trade.close_rate)
        }}</ValuePair>

        <ValuePair
          v-if="trade.is_open && trade.realized_profit && !trade.total_profit_abs"
          description="Realized Profit"
        >
          <trade-profit class="ms-2" :trade="trade" mode="realized" />
        </ValuePair>
        <ValuePair v-if="trade.is_open && trade.total_profit_abs" description="总收益率">
          <trade-profit class="ms-2" :trade="trade" mode="total" />
        </ValuePair>
        <ValuePair
          v-if="trade.profit_ratio && trade.profit_abs"
          :description="`${trade.is_open ? '当前收益率' : '收益率'}`"
        >
          <trade-profit class="ms-2" :trade="trade" />
        </ValuePair>
        <details>
          <summary>更多</summary>
          <ValuePair v-if="trade.min_rate" description="最低价">{{
            formatPrice(trade.min_rate)
          }}</ValuePair>
          <ValuePair v-if="trade.max_rate" description="最高价">{{
            formatPrice(trade.max_rate)
          }}</ValuePair>
          <ValuePair description="开仓手续费">
            {{ trade.fee_open_cost }} {{ trade.quote_currency }}
            <span v-if="trade.quote_currency !== trade.fee_open_currency">
              (in {{ trade.fee_open_currency }})
            </span>
            ({{ formatPercent(trade.fee_open) }})
          </ValuePair>
          <ValuePair v-if="trade.fee_close_cost && trade.fee_close" description="平仓手续费">
            {{ trade.fee_close_cost }} {{ trade.fee_close_currency }} ({{
              formatPercent(trade.fee_close)
            }})
          </ValuePair>
        </details>
      </div>
      <div class="mt-2 mt-lg-0 col-lg-7">
        <h5 class="detail-header">止损</h5>
        <ValuePair description="及时止损">
          {{ formatPercent(trade.stop_loss_pct / 100) }} |
          {{ formatPrice(trade.stop_loss_abs) }}
        </ValuePair>
        <ValuePair
          v-if="trade.initial_stop_loss_pct && trade.initial_stop_loss_abs"
          description="初始止损"
        >
          {{ formatPercent(trade.initial_stop_loss_pct / 100) }} |
          {{ formatPrice(trade.initial_stop_loss_abs) }}
        </ValuePair>
        <ValuePair
          v-if="trade.is_open && trade.stoploss_current_dist_ratio && trade.stoploss_current_dist"
          description="止损距离"
        >
          {{ formatPercent(trade.stoploss_current_dist_ratio) }} |
          {{ formatPrice(trade.stoploss_current_dist) }}
        </ValuePair>
        <ValuePair v-if="trade.stoploss_last_update_timestamp" description="最后更新">
          {{ timestampms(trade.stoploss_last_update_timestamp) }}
        </ValuePair>
        <div v-if="trade.trading_mode !== undefined && trade.trading_mode !== 'spot'">
          <h5 class="detail-header">Futures/Margin</h5>
          <ValuePair description="Direction">
            {{ trade.is_short ? 'short' : 'long' }} - {{ trade.leverage }}x
          </ValuePair>
          <ValuePair v-if="trade.funding_fees !== undefined" description="Funding fees">
            {{ formatPrice(trade.funding_fees) }}
          </ValuePair>
          <ValuePair v-if="trade.interest_rate !== undefined" description="Interest rate">
            {{ formatPrice(trade.interest_rate) }}
          </ValuePair>
          <ValuePair v-if="trade.liquidation_price !== undefined" description="Liquidation Price">
            {{ formatPrice(trade.liquidation_price) }}
          </ValuePair>
        </div>
        <details v-if="trade.orders">
          <summary>订单 {{ trade.orders.length > 1 ? `[${trade.orders.length}]` : '' }}</summary>
          <div v-for="(order, key) in trade.orders" :key="key">
            <span
              :title="`${order.ft_order_side} ${order.order_type} order for ${formatPriceCurrency(
                order.amount,
                trade.base_currency ?? '',
              )} at ${formatPriceCurrency(
                order.safe_price,
                trade.quote_currency ?? '',
              )}, filled ${formatPrice(order.filled)}`"
            >
              (#{{ key + 1 }})
              <DateTimeTZ
                v-if="order.order_timestamp"
                :date="order.order_timestamp"
                show-timezone
              />
              <b class="ms-1">{{ order.ft_order_side === 'buy' ? '买入' : '卖出' }}：</b>
              <b>{{ formatPrice(order.safe_price) }}</b> |
              <span v-if="order.remaining && order.remaining !== 0" title="remaining"
                >{{ formatPrice(order.remaining, 8) }} /
              </span>
              <span title="Filled">{{ formatPrice(order.filled ?? 0, 8) }}</span>
            </span>
          </div>
        </details>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatPercent, formatPriceCurrency, formatPrice, timestampms } from '@/shared/formatters';
import ValuePair from '@/components/general/ValuePair.vue';
import TradeProfit from '@/components/ftbot/TradeProfit.vue';
import DateTimeTZ from '@/components/general/DateTimeTZ.vue';
import { Trade } from '@/types';

defineProps({
  trade: { required: true, type: Object as () => Trade },
  stakeCurrency: { required: true, type: String },
});
</script>
<style scoped>
.detail-header {
  border-bottom: 1px solid;
  padding-bottom: 5px;
  width: 100%;
  display: block;
}
</style>
