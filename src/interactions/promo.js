import { transcript } from '../utils'
import * as githubGrant from './promos/githubGrant'
import * as hackPack from './promos/hackPack'
import * as stickerBox from './promos/stickerBox'
import * as notionPremium from './promos/notionPremium'
import * as stickermule from './promos/stickermule'

const promos = [stickerBox, notionPremium, stickermule, hackPack, githubGrant]

const interactionPromo = async (bot, message) => {
  const args = message.text.toLowerCase()

  if (args == 'help') {
    await bot.replyPrivateDelayed(message, transcript('promo.help'))
    return
  }

  const selectedPromo = promos.find(promo => {
    const promoMatchers = promo.names.map(t => t.toLowerCase())

    return promoMatchers.find(matcher => args.indexOf(matcher) === 0)
  })

  if (selectedPromo) {
    try {
      await selectedPromo.run(bot, message)
    } catch (err) {
      console.error(err)
      await bot.replyPrivateDelayed(
        message,
        transcript('errors.general', { err })
      )
    }
  } else {
    await bot.replyPrivateDelayed(message, transcript('promo.list', { promos }))
  }
}

export default interactionPromo
