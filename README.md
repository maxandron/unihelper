# Unihelper

Uniswap makes it very hard to figure out which pools are the most profitable.
UNIHelper improves the experience of browsing <https://info.uniswap.org/>
by adding a new "Min. APR" column  (APR stands for annual profit rate).
Now you will be able to see at a glance which pools are worth your time.

Just install the extension and the column will appear.

## APR Calculation

The estimation is based on the last 7 days, by using the data already inside the
table and just running the calculation.

The calculation formula is roughly:
`apr = (((weeklyVolume * fees) / tvl) / 7) * 365`

This is a rough approximation of the **minimum** APR based only on the last
seven days.

The actual APR will be different because:

* It will be affected by the price range you choose
* It will be affected by the changes in volume
* It will be affected by the changes in TVL
* By the amount of money you stake relative to the TVL

## Caveats

The data to calculate the APR is taken from the table itself.
That means that if Uniswap shows incorrect data, the APR will be calculated
incorrectly as well.

## Bugs / Feature requests

Please submit issues or requests on this GitHub page.

## Coffee

If you feel like buying me a cup of coffee you can send it to rons.eth
Thanks!
