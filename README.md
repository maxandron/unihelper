# Unihelper

A small extension that adds an APR estimation to the pools in Uniswap.

## APR Calculation

The estimation is based on the last 7 days, by using the data already inside the
table and just running the calculation.

The calculation formula is roughly:
`apr = (((weeklyVolume * fees) / tvl) / 7) * 365`

This is a rough aproximation of the **minimum** APR based only on the last
seven days.

The actual APR will be different because:

* It will be affected by the price range you choose
* It will be affected by the changes in volume
* It will be affected by the changes in TVL

## Caveats

The data to calculate the APR is taken from the table itself.
That means that if Uniswap shows incorrect data, the APR will be calculated
incorrectly as well.

## Bugs / Feature requests

Please submit issues or requests on this GitHub page.

## Coffee

If you feel like buying me a cup of coffee you can send it to rons.eth
Thanks!