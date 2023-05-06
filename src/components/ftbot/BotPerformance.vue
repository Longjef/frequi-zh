<template>
  <div>
    <div class="mb-2">
      <h3>表现</h3>
    </div>
    <b-table
      class="table-sm"
      :items="botStore.activeBot.performanceStats"
      :fields="tableFields"
    ></b-table>
  </div>
</template>

<script lang="ts">
import { formatPrice } from '@/shared/formatters';
import { defineComponent, computed } from 'vue';
import { useBotStore } from '@/stores/ftbotwrapper';
import { TableField } from 'bootstrap-vue-next';

export default defineComponent({
  name: 'BotPerformance',
  setup() {
    const botStore = useBotStore();
    const tableFields = computed<TableField[]>(() => {
      return [
        { key: 'pair', label: '交易对' },
        { key: 'profit', label: '收益率 %' },
        {
          key: 'profit_abs',
          label: `赚取 ${botStore.activeBot.botState?.stake_currency}`,
          formatter: (v: unknown) => formatPrice(v as number, 5),
        },
        { key: 'count', label: '交易次数' },
      ];
    });
    return {
      tableFields,
      botStore,
    };
  },
});
</script>
