import GiveawayGuide from "./giveaway/GiveawayGuild"
import ServerSettingsGuide from "./server/ServerSettingGuide"
import WerewolfGuide from "./werewolf/WerewolfGuide"


const GuidePage = () => {
  return (
    <div>
      <WerewolfGuide/>
      <ServerSettingsGuide/>
      <GiveawayGuide/>
    </div>
  )
}

export default GuidePage
