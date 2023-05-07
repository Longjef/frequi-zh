forceexit
<template>
  <div>
    <button
      class="btn btn-secondary btn-sm ms-1"
      :disabled="!botStore.activeBot.isTrading || isRunning"
      title="开始交易"
      @click="botStore.activeBot.startBot()"
    >
      <PlayIcon />
    </button>
    <button
      class="btn btn-secondary btn-sm ms-1"
      :disabled="!botStore.activeBot.isTrading || !isRunning"
      title="停止交易 - 同时停止处理未平仓交易"
      @click="handleStopBot()"
    >
      <StopIcon />
    </button>
    <button
      class="btn btn-secondary btn-sm ms-1"
      :disabled="!botStore.activeBot.isTrading || !isRunning"
      title="停止买入 - 停止购买，但仍处理未平仓交易"
      @click="handleStopBuy()"
    >
      <PauseIcon />
    </button>
    <button
      class="btn btn-secondary btn-sm ms-1"
      :disabled="!botStore.activeBot.isTrading"
      title="重新加载配置 - 重新加载配置，包括策略，将所有在运行时更改的设置重置为初始值"
      @click="handleReloadConfig()"
    >
      <ReloadIcon />
    </button>
    <button
      class="btn btn-secondary btn-sm ms-1"
      :disabled="!botStore.activeBot.isTrading"
      title="强制卖出所有"
      @click="handleForceExit()"
    >
      <ForceExitIcon />
    </button>
    <button
      v-if="botStore.activeBot.botState && botStore.activeBot.botState.force_entry_enable"
      class="btn btn-secondary btn-sm ms-1"
      :disabled="!botStore.activeBot.isTrading || !isRunning"
      title="Force enter - Immediately enter a trade at an optional price. Exits are then handled according to strategy rules."
      @click="forceEnter = true"
    >
      <ForceEntryIcon />
    </button>
    <button
      v-if="botStore.activeBot.isWebserverMode && false"
      :disabled="botStore.activeBot.isTrading"
      class="btn btn-secondary btn-sm ms-1"
      title="Start Trading mode"
      @click="botStore.activeBot.startTrade()"
    >
      <PlayIcon />
    </button>
    <ForceEntryForm v-model="forceEnter" :pair="botStore.activeBot.selectedPair" />
    <MessageBox ref="msgBox" />
  </div>
</template>

<script lang="ts">
import { ForceSellPayload } from '@/types';
import PlayIcon from 'vue-material-design-icons/Play.vue';
import StopIcon from 'vue-material-design-icons/Stop.vue';
import PauseIcon from 'vue-material-design-icons/Pause.vue';
import ReloadIcon from 'vue-material-design-icons/Reload.vue';
import ForceExitIcon from 'vue-material-design-icons/CloseBoxMultiple.vue';
import ForceEntryIcon from 'vue-material-design-icons/PlusBoxMultipleOutline.vue';
import ForceEntryForm from './ForceEntryForm.vue';
import MessageBox, { MsgBoxObject } from '@/components/general/MessageBox.vue';
import { defineComponent, computed, ref } from 'vue';
import { useBotStore } from '@/stores/ftbotwrapper';

export default defineComponent({
  name: 'BotControls',
  components: {
    ForceEntryForm,
    PlayIcon,
    StopIcon,
    PauseIcon,
    ReloadIcon,
    ForceExitIcon,
    ForceEntryIcon,
    MessageBox,
  },
  setup() {
    const botStore = useBotStore();
    const forceEnter = ref<boolean>(false);
    const msgBox = ref<typeof MessageBox>();

    const isRunning = computed((): boolean => {
      return botStore.activeBot.botState?.state === 'running';
    });

    const handleStopBot = () => {
      const msg: MsgBoxObject = {
        title: 'Stop Bot',
        message: 'Stop the bot loop from running?',
        accept: () => {
          botStore.activeBot.stopBot();
        },
      };
      msgBox.value?.show(msg);
    };

    const handleStopBuy = () => {
      const msg: MsgBoxObject = {
        title: 'Stop Buying',
        message: 'Freqtrade will continue to handle open trades.',
        accept: () => {
          botStore.activeBot.stopBuy();
        },
      };
      msgBox.value?.show(msg);
    };

    const handleReloadConfig = () => {
      const msg: MsgBoxObject = {
        title: '重载',
        message: '重新加载配置（包括策略）?',
        accept: () => {
          console.log('reload...');
          botStore.activeBot.reloadConfig();
        },
      };
      msgBox.value?.show(msg);
    };

    const handleForceExit = () => {
      const msg: MsgBoxObject = {
        title: 'ForceExit all',
        message: 'Really forceexit ALL trades?',
        accept: () => {
          const payload: ForceSellPayload = {
            tradeid: 'all',
            // TODO: support ordertype (?)
          };
          botStore.activeBot.forceexit(payload);
        },
      };
      msgBox.value?.show(msg);
    };
    return {
      handleStopBot,
      handleStopBuy,
      handleReloadConfig,
      handleForceExit,
      forceEnter,
      botStore,
      isRunning,
      msgBox,
    };
  },
});
</script>
