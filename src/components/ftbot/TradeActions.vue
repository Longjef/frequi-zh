<template>
  <div class="d-flex flex-column">
    <b-button
      v-if="botApiVersion <= 1.1"
      class="btn-xs text-start"
      size="sm"
      title="Forceexit"
      @click="$emit('forceExit', trade)"
    >
      <ForceSellIcon :size="16" title="Forceexit" class="me-1" />强制退出
    </b-button>
    <b-button
      v-if="botApiVersion > 1.1"
      class="btn-xs text-start"
      size="sm"
      title="Forceexit limit"
      @click="$emit('forceExit', trade, 'limit')"
    >
      <ForceSellIcon :size="16" title="Forceexit limit" class="me-1" />强制限价平仓
    </b-button>
    <b-button
      v-if="botApiVersion > 1.1"
      class="btn-xs text-start mt-1"
      size="sm"
      title="Forceexit market"
      @click="$emit('forceExit', trade, 'market')"
    >
      <ForceSellIcon :size="16" title="Forceexit market" class="me-1" />强制部分平仓
    </b-button>
    <b-button
      v-if="botApiVersion > 2.16"
      class="btn-xs text-start mt-1"
      size="sm"
      title="Forceexit partial"
      @click="$emit('forceExitPartial', trade)"
    >
      <ForceSellPartialIcon :size="16" title="Forceexit partial" class="me-1" />强制部分平仓
    </b-button>
    <b-button
      v-if="botApiVersion >= 2.24 && trade.open_order_id"
      class="btn-xs text-start mt-1"
      size="sm"
      title="Cancel open orders"
      @click="$emit('cancelOpenOrder', trade)"
    >
      <CancelIcon :size="16" title="Cancel open order" class="me-1" />取消未成交的委托单
    </b-button>

    <b-button
      class="btn-xs text-start mt-1"
      size="sm"
      title="Delete trade"
      @click="$emit('deleteTrade', trade)"
    >
      <DeleteIcon :size="16" title="Delete trade" class="me-1" />
      删除
    </b-button>
  </div>
</template>

<script setup lang="ts">
import { Trade } from '@/types';
import DeleteIcon from 'vue-material-design-icons/Delete.vue';
import ForceSellPartialIcon from 'vue-material-design-icons/CloseBoxMultiple.vue';
import ForceSellIcon from 'vue-material-design-icons/CloseBox.vue';
import CancelIcon from 'vue-material-design-icons/Cancel.vue';

defineProps({
  botApiVersion: {
    type: Number,
    default: 1.0,
  },
  trade: {
    type: Object as () => Trade,
    required: true,
  },
});
defineEmits(['forceExit', 'forceExitPartial', 'cancelOpenOrder', 'deleteTrade']);
</script>

<style scoped lang="scss"></style>
