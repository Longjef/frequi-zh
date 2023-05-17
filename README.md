```
docker compose run --rm freqtrade download-data --exchange binance --pairs .*/USDT --timerange 20200101- --timeframes 1m 5m

docker compose run --rm freqtrade backtesting --config user_data/backtest.json --strategy SampleStrategy --timerange 20220101- -i 5m

docker compose run --rm freqtrade new-strategy --strategy my_strategy --template advanced

docker compose run --rm freqtrade create-userdir --userdir user_data

docker compose run --rm freqtrade new-config --config user_data/config.json
```